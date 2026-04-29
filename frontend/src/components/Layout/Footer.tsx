import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-blue-200">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl" aria-hidden="true">🗳️</span>
              <span className="font-bold text-white">Election Navigator</span>
            </div>
            <p className="text-sm leading-relaxed text-blue-300">
              AI-powered assistant making elections accessible — especially for first-time voters.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              {([
                ['Voting Guide', ROUTES.WIZARD],
                ['Election Timeline', ROUTES.TIMELINE],
                ['Ask AI', ROUTES.CHAT],
              ] as const).map(([label, path]) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="transition-colors hover:text-white focus-visible:outline"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Official resources */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Official Resources
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              {[
                ['Election Commission of India', 'https://eci.gov.in'],
                ['Voter Registration', 'https://voters.eci.gov.in'],
                ['Voter Helpline', 'tel:1950'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white focus-visible:outline"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-blue-400">
          © {new Date().getFullYear()} Election Navigator — AI-powered civic tech. Built for the people.
        </div>
      </div>
    </footer>
  );
}
