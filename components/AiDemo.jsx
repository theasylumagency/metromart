'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const outLangs = [
  { code: 'en', label: 'English' },
  { code: 'ka', label: 'ქართული' },
  { code: 'ru', label: 'Русский' },
];

export default function AiDemo() {
  const { t } = useI18n();
  const a = t.growth.ai;
  const [product, setProduct] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    if (!product.trim() || loading) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: product.trim(), lang }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ fallback: true });
    }
    setLoading(false);
  };

  const fields = result
    ? [
        [a.outDesc, result.description],
        [a.outTitle, result.seoTitle],
        [a.outMeta, result.seoDescription],
        [a.outAlt, result.altText],
      ]
    : [];

  return (
    <div className="rounded-3xl border border-blue/30 bg-card shadow-neon-blue p-7 md:p-10 relative overflow-hidden">
      <div className="aurora w-72 h-72 bg-blue/25 -top-24 -right-20" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-blueSoft p-2.5">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-blue fill-none" strokeWidth="1.8">
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1M8.4 15.6l-2.1 2.1" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
          </span>
          <h3 className="text-2xl font-bold text-ink">{a.title}</h3>
        </div>
        <p className="mt-3 text-muted text-sm leading-relaxed max-w-2xl">{a.sub}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate()}
            placeholder={a.placeholder}
            className="flex-1 rounded-xl bg-page border border-line px-4 py-3.5 text-sm placeholder:text-muted/60 focus:outline-none focus:border-blue/60 focus:ring-2 focus:ring-blue/15"
          />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label={a.langLabel}
            className="rounded-xl bg-page border border-line px-4 py-3.5 text-sm focus:outline-none focus:border-blue/60"
          >
            {outLangs.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button
            onClick={generate}
            disabled={loading || !product.trim()}
            className="rounded-xl bg-blue text-white font-semibold px-8 py-3.5 text-sm disabled:opacity-40 shadow-neon-blue hover:shadow-glow-blue transition"
          >
            {loading ? a.loading : a.button}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 grid md:grid-cols-2 gap-4"
            >
              {fields.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-surface border border-line p-5">
                  <span className="text-blue text-xs font-bold tracking-wide uppercase">{label}</span>
                  <p className="mt-1.5 text-sm text-ink leading-relaxed">{value || '—'}</p>
                </div>
              ))}
              {result.fallback && (
                <p className="md:col-span-2 text-xs text-accent">{a.error}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 text-xs text-muted/80">{a.note}</p>
      </div>
    </div>
  );
}
