// src/components/Footer.tsx
import {Link} from '@/i18n/navigation';
import {VERTICALS} from '@/config/verticals';

export function Footer({locale}: {locale: string}) {
  const l = locale === 'en' ? 'en' : 'ro';

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <span className="brand-name">Plecări</span>
          <p>
            {l === 'en'
              ? 'Your travel guide — cruises, flights, stays and more.'
              : 'Ghidul tău de călătorie — croaziere, zboruri, cazări și altele.'}
          </p>
        </div>

        <div className="footer-col">
          <h3>{l === 'en' ? 'Explore' : 'Explorează'}</h3>
          <ul>
            {VERTICALS.map((v) => (
              <li key={v.slug}>
                <Link href={`/${v.slug}`}>{l === 'en' ? v.label.en : v.label.ro}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3>Info</h3>
          <ul>
            <li>
              <Link href="/legal/confidentialitate">
                {l === 'en' ? 'Privacy' : 'Confidențialitate'}
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/legal/disclosure">
                {l === 'en' ? 'Affiliate disclosure' : 'Afiliere'}
              </Link>
            </li>
            <li>
              <Link href="/legal/termeni">{l === 'en' ? 'Terms' : 'Termeni'}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>
          © {new Date().getFullYear()} Plecări.{' '}
          {l === 'en'
            ? 'Some links are affiliate links.'
            : 'Unele linkuri sunt de afiliere.'}
        </p>
      </div>
    </footer>
  );
}