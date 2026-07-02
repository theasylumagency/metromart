'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';

export default function ThemeToast() {
  const { t } = useI18n();
  const { theme, setTheme, showToast, dismissToast } = useTheme();
  const other = theme === 'dark' ? 'light' : 'dark';
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed bottom-5 inset-x-4 z-50 flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-card border border-line shadow-lift px-5 py-4 max-w-md">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none shrink-0 hidden sm:block" strokeWidth="1.8">
              {theme === 'dark' ? (
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-15v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" strokeLinecap="round" />
              )}
            </svg>
            <p className="text-sm text-ink leading-snug">
              {theme === 'dark' ? t.theme.toastDark : t.theme.toastLight}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={dismissToast}
                className="rounded-full bg-ink text-onInk text-xs font-semibold px-4 py-2 hover:opacity-90 transition"
              >
                {t.theme.keep}
              </button>
              <button
                onClick={() => { setTheme(other); dismissToast(); }}
                className="rounded-full border border-line text-ink text-xs font-semibold px-4 py-2 hover:bg-surface transition"
              >
                {t.theme.switch}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
