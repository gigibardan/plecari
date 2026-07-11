// src/components/CruiseDirectWidget.tsx
// Widget CruiseDirect (CJ Affiliate) — consent-gated tracking pixel,
// deep-link real pe destinație, suport RO/EN.
"use client";

import {useState, type FormEvent} from "react";
import {useConsent} from "@/lib/consent";

/* ── Deep-link mapping ── */
const DESTINATIONS = [
  {value: "", ro: "Orice destinație", en: "Any destination", path: ""},
  {
    value: "mediterana",
    ro: "Marea Mediterană",
    en: "Mediterranean",
    path: "/cruises/mediterranean-cruises",
  },
  {
    value: "caraibe",
    ro: "Insulele Caraibe",
    en: "Caribbean",
    path: "/cruises/caribbean-cruises",
  },
  {
    value: "nordul-europei",
    ro: "Nordul Europei",
    en: "Northern Europe",
    path: "/cruises/europe-cruises",
  },
  {
    value: "alaska",
    ro: "Alaska",
    en: "Alaska",
    path: "/cruises/alaska-cruises",
  },
];

const PERIODS = [
  {value: "", ro: "Orice perioadă", en: "Any time"},
  {value: "vara", ro: "Vara 2026", en: "Summer 2026"},
  {value: "toamna", ro: "Toamna 2026", en: "Fall 2026"},
  {value: "iarna", ro: "Iarna 2026 / 2027", en: "Winter 2026 / 2027"},
];

/* ── Props ── */
interface CruiseDirectWidgetProps {
  title?: string;
  description?: string;
  publisherId?: string;
  programId?: string;
  locale?: "ro" | "en";
  linkId?: string; // NOU: Adăugat pentru TypeScript
  size?: string;   // NOU: Adăugat pentru TypeScript
}

export default function CruiseDirectWidget({
  title,
  description,
  publisherId = "101821346",
  programId = "7299361",
  locale = "ro",
  linkId = "15534471", // NOU: Setăm default-ul pe care îl aveai înainte hardcodat
  size, // NOU: Inclus ca să nu dea eroare de TypeScript în paginile unde e apelat
}: CruiseDirectWidgetProps) {
  const {consent} = useConsent();
  const [destination, setDestination] = useState("");

  const l = locale === "en" ? "en" : "ro";

  const defaultTitle =
    l === "en"
      ? "Find the perfect cruise"
      : "Găsește croaziera perfectă";

  const defaultDesc =
    l === "en"
      ? "Compare thousands of itineraries, grab last-minute deals and book online with our international partners."
      : "Compară mii de itinerarii, prinde ofertele last-minute și rezervă online direct la partenerii noștri internaționali.";

  /* ── Construiește link-ul CJ cu deep-link pe destinație ── */
  function buildLink(): string {
    const base = `https://www.anrdoezrs.net/click-${publisherId}-${programId}`;
    const dest = DESTINATIONS.find((d) => d.value === destination);
    if (dest?.path) {
      const target = `https://www.cruisedirect.com${dest.path}`;
      return `${base}?url=${encodeURIComponent(target)}`;
    }
    return base; // fallback: homepage CruiseDirect
  }

  // NOU: Pixelul folosește acum linkId-ul dinamic
  const trackingPixel = `https://www.ftjcfx.com/image-${publisherId}-${linkId}`;

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    window.open(buildLink(), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden my-10 shadow-xl bg-[#2B2018] group">
      {/* ── Fundal ── */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1200&auto=format&fit=crop')",
        }}
      />

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B2018] via-[#2B2018]/40 to-transparent opacity-90" />

      {/* ── Conținut ── */}
      <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-6">
        <div className="text-white max-w-2xl">
          <h3 className="text-3xl font-bold mb-3 text-[#FBF6EE] drop-shadow-md">
            {title ?? defaultTitle}
          </h3>
          <p className="text-[#FBF6EE]/90 text-lg">
            {description ?? defaultDesc}
          </p>
        </div>

        {/* ── Formular cu deep-link real ── */}
        <form
          onSubmit={handleSearch}
          className="mt-2 flex flex-col sm:flex-row bg-white rounded-xl p-2 gap-2 shadow-2xl"
        >
          {/* Destinație */}
          <div className="flex-1 flex items-center px-4 py-3 sm:py-2 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 transition-colors focus-within:border-[#1F5E56] focus-within:ring-1 focus-within:ring-[#1F5E56]">
            <svg
              className="w-5 h-5 text-[#1F5E56] mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <select
              className="w-full bg-transparent text-[#2B2018] outline-none cursor-pointer truncate"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {DESTINATIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d[l]}
                </option>
              ))}
            </select>
          </div>

          {/* Perioadă (informativă — CruiseDirect nu acceptă param de dată) */}
          <div className="flex-1 flex items-center px-4 py-3 sm:py-2 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 transition-colors focus-within:border-[#1F5E56] focus-within:ring-1 focus-within:ring-[#1F5E56]">
            <svg
              className="w-5 h-5 text-[#1F5E56] mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <select className="w-full bg-transparent text-[#2B2018] outline-none cursor-pointer truncate">
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p[l]}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#C15540] hover:bg-[#a64735] text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center whitespace-nowrap shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {l === "en" ? "Search deals" : "Caută oferte"}
          </button>
        </form>

        {/* ── Trust badge ── */}
        <div className="mt-1 text-sm text-[#FBF6EE]/70 flex items-center font-medium">
          <svg
            className="w-4 h-4 mr-1.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          {l === "en"
            ? "Secure redirect to the CruiseDirect platform"
            : "Redirecționare securizată spre platforma CruiseDirect"}
        </div>
      </div>

      {/* ── Pixel CJ — DOAR cu consent ── */}
      {consent === "all" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={trackingPixel}
          width="1"
          height="1"
          alt=""
          className="absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </div>
  );
}