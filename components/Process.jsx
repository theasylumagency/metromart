'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

export default function Process() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const p = t.process.phases[active];
  return (
    <Section id="process" index="04" title={t.process.title} lead={t.process.lead} className="bg-surface">
      <div className="flex flex-wrap gap-2">
        {t.process.phases.map((ph, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-xl px-4 py-2.5 text-sm font-medium border transition-all text-left ${
              active === i
                ? 'bg-ink text-onInk border-ink shadow-neon-accent'
                : 'bg-card border-line text-muted shadow-soft hover:text-ink card-hover-accent hover:-translate-y-0.5'
            }`}
          >
            <span className="block text-[11px] font-bold text-accent">{ph.w}</span>
            {ph.t}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-3xl bg-card border border-accent/20 shadow-neon-accent p-8"
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-accent font-bold text-sm">{p.w}</span>
            <h3 className="text-xl font-bold text-ink">{p.t}</h3>
            <span className="text-muted">— {p.d}</span>
          </div>
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {p.items.map((it) => (
              <li key={it} className="flex gap-2.5 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                {it}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="mt-14">
        <h3 className="font-bold text-lg text-ink mb-4">{t.process.needTitle}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.process.needs.map((n) => (
            <div key={n.t} className="rounded-2xl border border-blue/20 bg-blueSoft shadow-neon-blue p-5">
              <span className="text-blue text-xs font-bold">{n.w}</span>
              <p className="mt-1 text-sm text-ink font-medium">{n.t}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h3 className="font-bold text-lg text-ink mb-4">{t.process.respTitle}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {['we', 'you', 'both'].map((k) => (
            <div key={k} className={`rounded-3xl p-7 ${k === 'both' ? 'bg-card border border-accent/30 shadow-neon-accent' : 'bg-card card-line shadow-soft card-hover-accent'}`}>
              <h4 className={`font-bold ${k === 'both' ? 'text-accent' : 'text-ink'}`}>{t.process.resp[k].t}</h4>
              <ul className="mt-3.5 space-y-2">
                {t.process.resp[k].items.map((it) => (
                  <li key={it} className="text-sm text-muted flex gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/20 mt-1.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
