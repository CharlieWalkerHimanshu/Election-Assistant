import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-800 shadow-lg">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white focus-visible:outline"
          aria-label="Election Navigator home"
        >
          <span className="text-2xl" aria-hidden="true">🗳️</span>
          <span className="text-lg font-bold tracking-tight">
            Election <span className="text-emerald-400">Navigator</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden gap-1 md:flex" role="list">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="rounded-lg p-2 text-blue-100 hover:bg-white/10 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <ul
          className="border-t border-white/10 bg-navy-900 px-4 pb-4 pt-2 md:hidden"
          role="list"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
