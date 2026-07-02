'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { locales } from '@/lib/translations';

export default function Nav() {
  const { locale, setLocale, t } = useI18n();
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const clicks = useRef([]);

  const onLogoClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((ts) => now - ts < 900), now];
    if (clicks.current.length >= 3) {
      clicks.current = [];
      window.dispatchEvent(new CustomEvent('mm-vitals-toggle'));
    }
  };

  const links = [
    ['understand', t.nav.understand],
    ['build', t.nav.build],
    ['process', t.nav.process],
    ['growth', t.nav.growth],
    ['decisions', t.nav.decisions],
    ['next', t.nav.next],
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-page/75 border-b border-line">
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent to-[#FFC46B] origin-left"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto max-w-wrap px-5 md:px-8 h-16 flex items-center justify-between gap-3">
        <a href="#top" onClick={onLogoClick} className="flex items-center gap-2 font-bold tracking-tight text-ink">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" />
          MetroMart
          <span className="text-muted font-medium hidden sm:inline">× The Asylum</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="hover:text-ink transition-colors">
              {label}
            </a>
          ))}
          <a
            href="/proposal"
            className="px-3.5 py-1 rounded-full bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-all border border-accent/20"
          >
            Proposal →
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={t.theme.toggle}
            title={t.theme.toggle}
            className="rounded-full border border-line bg-card shadow-soft p-2 text-ink hover:text-accent transition-colors"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-1 rounded-full border border-line bg-card shadow-soft p-1" title={t.langNote}>
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  locale === l.code ? 'bg-ink text-onInk shadow-soft' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
