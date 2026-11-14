// src/components/Footer.tsx
import {Link} from '@/i18n/navigation';
import {VERTICALS} from '@/config/verticals';

export function Footer({locale}: {locale: string}) {
  const l = locale === 'en' ? 'en' : 'ro';

  const half = Math.ceil(VERTICALS.length / 2);
  const col1 = VERTICALS.slice(0, half);
  const col2 = VERTICALS.slice(half);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* Brand */}
        <div className="footer-brand">
          <span className="brand-name">Plecări</span>
          <p>
            {l === 'en'
              ? 'Your travel guide — cruises, flights, stays and more.'
              : 'Ghidul tău de călătorie — croaziere, zboruri, cazări și altele.'}
          </p>
          <a href="mailto:contact@plecari.com" className="footer-contact-link">
            contact@plecari.com
          </a>
        </div>

        {/* Destinations col 1 */}
        <div className="footer-col">
          <h3>{l === 'en' ? 'Explore' : 'Explorează'}</h3>
          <ul>
            {col1.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`} prefetch={false}>
                  {l === 'en' ? v.label.en : v.label.ro}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations col 2 */}
        <div className="footer-col">
          <h3>&nbsp;</h3>
          <ul>
            {col2.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`} prefetch={false}>
                  {l === 'en' ? v.label.en : v.label.ro}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info / Legal */}
        <div className="footer-col">
          <h3>Info</h3>
          <ul>
            <li>
              <Link href="/legal/despre" prefetch={false}>
                {l === 'en' ? 'About' : 'Despre'}
              </Link>
            </li>
            <li>
              <Link href="/legal/confidentialitate" prefetch={false}>
                {l === 'en' ? 'Privacy' : 'Confidențialitate'}
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" prefetch={false}>Cookies</Link>
            </li>
            <li>
              <Link href="/legal/disclosure" prefetch={false}>
                {l === 'en' ? 'Affiliate links' : 'Afiliere'}
              </Link>
            </li>
            <li>
              <Link href="/legal/termeni" prefetch={false}>
                {l === 'en' ? 'Terms' : 'Termeni'}
              </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="site-footer-bottom">
        <p>
          © {new Date().getFullYear()} Plecări.com
          {' · '}
          {l === 'en'
            ? 'Some links are affiliate links — you pay the same price.'
            : 'Unele linkuri sunt de afiliere — plătești același preț.'}
        </p>
      </div>
    </footer>
  );
}
