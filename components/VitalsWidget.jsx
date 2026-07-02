'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const COLORS = { good: '#0DA678', ok: '#E9A23B', bad: '#E5484D', na: '#9AA1AD' };

const METRICS = [
  { key: 'lcp', label: 'LCP', good: 2500, bad: 4000, fmt: (v) => (v / 1000).toFixed(2) + 's' },
  { key: 'cls', label: 'CLS', good: 0.1, bad: 0.25, fmt: (v) => v.toFixed(3) },
  { key: 'inp', label: 'INP', good: 200, bad: 500, fmt: (v) => Math.round(v) + 'ms' },
  { key: 'ttfb', label: 'TTFB', good: 800, bad: 1800, fmt: (v) => Math.round(v) + 'ms' },
];

function grade(m, v) {
  if (v == null) return 'na';
  if (v <= m.good) return 'good';
  if (v <= m.bad) return 'ok';
  return 'bad';
}

export default function VitalsWidget() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [vals, setVals] = useState({});
  const started = useRef(false);

  useEffect(() => {
    try {
      const qs = new URLSearchParams(window.location.search);
      if (qs.get('vitals') === '1') {
        localStorage.setItem('mm-vitals', '1');
        setEnabled(true);
      } else if (localStorage.getItem('mm-vitals') === '1') {
        setEnabled(true);
      }
    } catch (e) {}
    const toggle = () => {
      setEnabled((on) => {
        try { localStorage.setItem('mm-vitals', on ? '0' : '1'); } catch (e) {}
        return !on;
      });
    };
    window.addEventListener('mm-vitals-toggle', toggle);
    return () => window.removeEventListener('mm-vitals-toggle', toggle);
  }, []);

  useEffect(() => {
    if (!enabled || started.current || typeof PerformanceObserver === 'undefined') return;
    started.current = true;

    try {
      new PerformanceObserver((list) => {
        const e = list.getEntries().pop();
        if (e) setVals((v) => ({ ...v, lcp: e.startTime }));
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}

    try {
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) cls += e.value;
        }
        setVals((v) => ({ ...v, cls }));
      }).observe({ type: 'layout-shift', buffered: true });
    } catch (e) {}

    try {
      let inp = 0;
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.interactionId && e.duration > inp) inp = e.duration;
        }
        if (inp > 0) setVals((v) => ({ ...v, inp }));
      }).observe({ type: 'event', durationThreshold: 40, buffered: true });
    } catch (e) {}

    try {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) setVals((v) => ({ ...v, ttfb: nav.responseStart }));
    } catch (e) {}
  }, [enabled]);

  const close = () => {
    setEnabled(false);
    setOpen(false);
    try { localStorage.setItem('mm-vitals', '0'); } catch (e) {}
  };

  const worst = METRICS.reduce((acc, m) => {
    const g = grade(m, vals[m.key]);
    const rank = { bad: 3, ok: 2, good: 1, na: 0 };
    return rank[g] > rank[acc] ? g : acc;
  }, 'na');

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-4 left-4 z-50"
        >
          {open ? (
            <div className="w-60 rounded-2xl bg-card border border-line shadow-lift p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-ink tracking-wide">Core Web Vitals</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setOpen(false)} aria-label="collapse" className="text-muted hover:text-ink px-1.5 text-sm leading-none">–</button>
                  <button onClick={close} aria-label="close" className="text-muted hover:text-ink px-1.5 text-sm leading-none">✕</button>
                </div>
              </div>
              <ul className="mt-3 space-y-2">
                {METRICS.map((m) => {
                  const v = vals[m.key];
                  const g = grade(m, v);
                  return (
                    <li key={m.key} className="flex items-center gap-2.5 text-sm">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[g] }} />
                      <span className="text-muted font-medium w-12">{m.label}</span>
                      <span className="text-ink font-semibold ml-auto tabular-nums">
                        {v == null ? '…' : m.fmt(v)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-[10px] text-muted/80 leading-snug">
                Measured live on this page · PerformanceObserver
              </p>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full bg-card border border-line shadow-lift px-4 py-2 text-xs font-semibold text-ink hover:-translate-y-0.5 transition-transform"
            >
              <span className="w-2 h-2 rounded-full" style={{ background: COLORS[worst] }} />
              Vitals
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
