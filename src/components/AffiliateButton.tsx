// src/components/AffiliateButton.tsx
// Buton de afiliere: link simplu (nu setează cookies până la click),
// rel="sponsored nofollow" pentru corectitudine SEO, se deschide în tab nou.
type Props = {
  href: string;
  children: React.ReactNode;
};

export function AffiliateButton({href, children}: Props) {
  return (
    <a
      className="affiliate-button"
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener"
    >
      {children}
      <span aria-hidden> →</span>
    </a>
  );
}