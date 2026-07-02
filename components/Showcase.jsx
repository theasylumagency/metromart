'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

function Bar({ w, h = 'h-2', c = 'bg-ink/8' }) {
  return <div className={`rounded ${h} ${c}`} style={{ width: w }} />;
}

function MiniCard() {
  return (
    <div className="rounded-lg bg-surface border border-line p-2 flex flex-col gap-1.5">
      <div className="rounded bg-ink/5 h-10" />
      <Bar w="80%" />
      <Bar w="45%" c="bg-accent/50" />
    </div>
  );
}

function HomeMock({ label, mobileLabel }) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-5 items-start">
      <div>
        <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-line bg-card overflow-hidden shadow-lift card-hover-accent">
          <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-line bg-surface">
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <span className="w-2 h-2 rounded-full bg-ink/15" />
            <div className="ml-2 flex-1 rounded bg-ink/5 h-4 max-w-[60%]" />
          </div>
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-accent" />
              <Bar w="56px" h="h-2.5" />
              <div className="flex-1 rounded-full bg-surface border border-line h-5" />
              <span className="w-5 h-5 rounded bg-ink/8" />
            </div>
            <div className="rounded-xl bg-gradient-to-r from-accentSoft via-accentSoft/50 to-blueSoft p-4 space-y-2">
              <Bar w="50%" h="h-3" c="bg-ink/15" />
              <Bar w="35%" />
              <div className="rounded-full bg-ink h-4 w-16" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg bg-surface border border-line h-9" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <MiniCard /><MiniCard /><MiniCard />
            </div>
          </div>
        </motion.div>
        <p className="mt-3 text-xs text-muted text-center">{label}</p>
      </div>
      <div>
        <motion.div whileHover={{ y: -4 }} className="rounded-[1.6rem] border border-line bg-card p-2 shadow-lift card-hover-blue max-w-[180px] mx-auto">
          <div className="rounded-[1.1rem] bg-page border border-line overflow-hidden">
            <div className="mx-auto mt-1.5 w-14 h-1 rounded-full bg-ink/12" />
            <div className="p-2.5 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-accent" />
                <Bar w="34px" />
                <div className="flex-1" />
                <span className="w-3.5 h-3.5 rounded bg-ink/8" />
              </div>
              <div className="rounded-full bg-surface border border-line h-4" />
              <div className="rounded-lg bg-gradient-to-r from-accentSoft to-blueSoft h-14" />
              <div className="grid grid-cols-2 gap-1.5">
                <MiniCard /><MiniCard />
              </div>
              <div className="rounded-full bg-ink h-3.5 w-full" />
            </div>
          </div>
        </motion.div>
        <p className="mt-3 text-xs text-muted text-center">{mobileLabel}</p>
      </div>
    </div>
  );
}

function ProductCard() {
  const { t } = useI18n();
  const c = t.build.card;
  const [added, setAdded] = useState(false);
  return (
    <div>
      <motion.div
        whileHover={{ y: -6 }}
        className="rounded-3xl bg-card border border-accent/25 shadow-neon-accent p-5 max-w-sm mx-auto"
      >
        <div className="relative rounded-2xl bg-surface p-6 flex justify-center">
          <span className="absolute top-3 left-3 rounded-md bg-accent text-white text-xs font-bold px-2 py-0.5">
            {c.badge}
          </span>
          <span className="absolute top-3 right-3 rounded-md bg-mintSoft text-mint text-xs font-semibold px-2 py-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-mint" />
            {c.stock}
          </span>
          <svg viewBox="0 0 120 120" className="w-36 h-36">
            <rect x="20" y="14" width="80" height="92" rx="8" className="fill-card stroke-ink/15" />
            <rect x="26" y="20" width="68" height="12" rx="3" className="fill-ink/5" />
            <circle cx="86" cy="26" r="3.5" className="fill-accent" />
            <circle cx="60" cy="68" r="26" className="fill-surface stroke-ink/20" strokeWidth="3" />
            <circle cx="60" cy="68" r="17" fill="none" className="stroke-blue/40" strokeWidth="2" strokeDasharray="5 4" />
          </svg>
        </div>
        <h4 className="mt-4 font-semibold text-ink">{c.name}</h4>
        <p className="text-sm text-muted">{c.specs}</p>
        <div className="mt-3 flex items-baseline gap-2.5">
          <span className="text-2xl font-extrabold text-ink">{c.price}</span>
          <span className="text-sm text-muted line-through">{c.oldPrice}</span>
          <span className="ml-auto rounded-md bg-blueSoft text-blue text-xs font-semibold px-2 py-1">
            {c.installment}
          </span>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setAdded(!added)}
          className={`mt-4 w-full rounded-xl py-3 font-semibold transition-colors ${
            added ? 'bg-mintSoft text-mint border border-mint/30 shadow-neon-mint' : 'bg-ink text-onInk hover:opacity-90 shadow-soft'
          }`}
        >
          {added ? c.added : c.cta}
        </motion.button>
      </motion.div>
      <p className="mt-3 text-xs text-muted text-center">{c.hint}</p>
    </div>
  );
}

export default function Showcase() {
  const { t } = useI18n();
  return (
    <Section id="build" index="03" title={t.build.title} lead={t.build.lead}>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
        <HomeMock label={t.build.homeLabel} mobileLabel={t.build.mobileLabel} />
        <ProductCard />
      </div>

      <div className="mt-16">
        <h3 className="font-bold text-lg text-ink mb-4">{t.build.pagesTitle}</h3>
        <div className="flex flex-wrap gap-2">
          {t.build.pages.map((p) => (
            <span key={p} className="rounded-xl border border-line bg-card shadow-soft card-hover-accent px-4 py-2 text-sm font-medium text-ink">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-5">
        <div className="rounded-3xl bg-card border border-accent/30 shadow-neon-accent p-7">
          <h3 className="font-bold text-accent">{t.build.scopeIn}</h3>
          <ul className="mt-4 space-y-2.5">
            {t.build.inList.map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-ink">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-accent fill-none shrink-0" strokeWidth="2.5">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-surface card-line p-7">
          <h3 className="font-bold text-muted">{t.build.scopeLater}</h3>
          <ul className="mt-4 space-y-2.5">
            {t.build.laterList.map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-muted">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mt-0.5 stroke-muted fill-none shrink-0" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" strokeLinecap="round" />
                </svg>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-blue/20 bg-blueSoft p-7">
        <h3 className="font-bold text-blue">{t.build.lineTitle}</h3>
        <p className="mt-2 text-sm text-ink/80 leading-relaxed max-w-3xl">{t.build.lineBody}</p>
      </div>
    </Section>
  );
}
