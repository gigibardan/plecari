"use client";

interface CruiseDirectWidgetProps {
  title?: string;
  description?: string;
  publisherId?: string;
}

export default function CruiseDirectWidget({
  title = "Găsește croaziera perfectă",
  description = "Compară mii de itinerarii, prinde ofertele last-minute și rezervă online direct la partenerii noștri internaționali.",
  publisherId = "101821346"
}: CruiseDirectWidgetProps) {
  
  // Linkul tău evergreen către CruiseDirect
  const mainLink = `https://www.anrdoezrs.net/click-${publisherId}-7299361`;
  const trackingPixel = `https://www.ftjcfx.com/image-${publisherId}-15534471`;

  // Funcția care preia click-ul și redirecționează utilizatorul
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(mainLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden my-10 shadow-xl bg-[#2B2018] group">
      {/* ── IMAGINEA DE FUNDAL UNSPLASH ── */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1200&auto=format&fit=crop')",
        }}
      />
      
      {/* ── GRADIENT OVERLAY (pentru lizibilitatea textului) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2B2018] via-[#2B2018]/40 to-transparent opacity-90" />

      {/* ── CONȚINUT WIDGET ── */}
      <div className="relative z-10 p-6 sm:p-10 flex flex-col gap-6">
        <div className="text-white max-w-2xl">
          <h3 className="text-3xl font-bold mb-3 text-[#FBF6EE] drop-shadow-md">
            {title}
          </h3>
          <p className="text-[#FBF6EE]/90 text-lg">
            {description}
          </p>
        </div>

        {/* ── FORMULAR "FAKE" (Simulare motor de căutare) ── */}
        <form
          onSubmit={handleSearch}
          className="mt-2 flex flex-col sm:flex-row bg-white rounded-xl p-2 gap-2 shadow-2xl"
        >
          {/* Câmp Destinație */}
          <div className="flex-1 flex items-center px-4 py-3 sm:py-2 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 transition-colors focus-within:border-[#1F5E56] focus-within:ring-1 focus-within:ring-[#1F5E56]">
            <svg className="w-5 h-5 text-[#1F5E56] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select className="w-full bg-transparent text-[#2B2018] outline-none cursor-pointer truncate">
              <option value="">Orice destinație</option>
              <option value="mediterana">Marea Mediterană</option>
              <option value="caraibe">Insulele Caraibe</option>
              <option value="nordul-europei">Nordul Europei</option>
              <option value="alaska">Alaska</option>
            </select>
          </div>

          {/* Câmp Lună/Perioadă */}
          <div className="flex-1 flex items-center px-4 py-3 sm:py-2 bg-gray-50/50 rounded-lg border border-transparent hover:border-gray-200 transition-colors focus-within:border-[#1F5E56] focus-within:ring-1 focus-within:ring-[#1F5E56]">
            <svg className="w-5 h-5 text-[#1F5E56] mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <select className="w-full bg-transparent text-[#2B2018] outline-none cursor-pointer truncate">
              <option value="">Orice perioadă</option>
              <option value="vara">Vara 2026</option>
              <option value="toamna">Toamna 2026</option>
              <option value="iarna">Iarna 2026 / 2027</option>
            </select>
          </div>

          {/* Buton Submit */}
          <button
            type="submit"
            className="bg-[#C15540] hover:bg-[#a64735] text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center whitespace-nowrap shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Caută oferte
          </button>
        </form>

        {/* ── MESAJ DE ÎNCREDERE (Subtil) ── */}
        <div className="mt-1 text-sm text-[#FBF6EE]/70 flex items-center font-medium">
          <svg className="w-4 h-4 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.963 11.963 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Redirecționare securizată spre platforma CruiseDirect
        </div>
      </div>

      {/* Pixel de tracking CJ Affiliate (obligatoriu dar invizibil) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={trackingPixel}
        width="1"
        height="1"
        alt=""
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}