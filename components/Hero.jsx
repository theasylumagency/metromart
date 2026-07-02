'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

function Words({ text, delay = 0, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FloatCard() {
  const { t } = useI18n();
  const c = t.build.card;
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="aurora w-72 h-72 bg-accent/50 -top-10 -left-10 animate-blob" />
      <div className="aurora w-64 h-64 bg-blue/40 bottom-0 right-0 animate-blob-slow" />
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative animate-floaty-slow"
      >
        <div className="rounded-3xl bg-card shadow-glow-accent border border-accent/25 p-5">
          <div className="relative rounded-2xl bg-surface p-6 flex justify-center">
            <span className="absolute top-3 left-3 rounded-md bg-accent text-white text-xs font-bold px-2 py-0.5 shadow-neon-accent">
              {c.badge}
            </span>
            <svg viewBox="0 0 120 120" className="w-32 h-32">
              <rect x="20" y="14" width="80" height="92" rx="8" className="fill-card stroke-ink/15" />
              <rect x="26" y="20" width="68" height="12" rx="3" className="fill-ink/5" />
              <circle cx="86" cy="26" r="3.5" className="fill-accent" />
              <circle cx="60" cy="68" r="26" className="fill-surface stroke-ink/20" strokeWidth="3" />
              <circle cx="60" cy="68" r="17" fill="none" className="stroke-blue/40" strokeWidth="2" strokeDasharray="5 4" />
            </svg>
          </div>
          <h4 className="mt-4 font-semibold text-ink text-sm">{c.name}</h4>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-ink">{c.price}</span>
            <span className="text-xs text-muted line-through">{c.oldPrice}</span>
          </div>
          <div className="mt-3 rounded-xl bg-ink text-onInk text-center text-sm font-semibold py-2.5 shadow-soft">{c.cta}</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute -left-8 top-14 animate-floaty"
      >
        <span className="rounded-full bg-card shadow-neon-blue border border-blue/25 px-4 py-2 text-xs font-semibold text-blue flex items-center gap-1.5">
          {c.installment}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -right-6 bottom-24 animate-floaty-slow"
      >
        <span className="rounded-full bg-card shadow-neon-mint border border-mint/25 px-4 py-2 text-xs font-semibold text-mint flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          {c.stock}
        </span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="aurora w-[34rem] h-[34rem] bg-[#FFD6AD] -top-40 -left-32 animate-blob" />
      <div className="aurora w-[30rem] h-[30rem] bg-[#CFE0FF] top-10 right-[-8rem] animate-blob-slow" />
      <div className="aurora w-[24rem] h-[24rem] bg-[#FFE9CF] bottom-[-6rem] left-1/3 animate-blob" />
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-wrap px-5 md:px-8 pt-32 pb-24 w-full">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-card border border-line shadow-soft px-4 py-2 text-sm text-ink font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t.hero.badge}
            </motion.span>
            <h1 className="mt-9 text-5xl md:text-7xl xl:text-[5.2rem] font-extrabold tracking-tight leading-[1.02] text-ink">
              <Words text={t.hero.t1} delay={0.15} />
              <br />
              <Words text={t.hero.t2} delay={0.4} className="text-gradient" />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 text-lg md:text-xl text-muted leading-relaxed max-w-xl"
            >
              {t.hero.sub}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#understand"
                className="rounded-full bg-ink text-onInk font-semibold px-8 py-4 shadow-lift hover:-translate-y-0.5 transition-transform"
              >
                {t.hero.cta1}
              </a>
              <a
                href="/proposal"
                className="rounded-full bg-card border border-line shadow-soft px-8 py-4 font-medium text-ink hover:-translate-y-0.5 transition-transform"
              >
                {t.hero.cta2} →
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              {t.hero.chips.map((c) => (
                <span key={c} className="rounded-full bg-surface border border-line px-4 py-1.5 text-sm text-muted font-medium">
                  {c}
                </span>
              ))}
            </motion.div>
          </div>
          <div className="hidden lg:block">
            <FloatCard />
          </div>
        </div>
      </div>
      <motion.a
        href="#understand"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        aria-label="scroll"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-6 h-6 stroke-current fill-none"
          strokeWidth="2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <path d="M12 4v14m-6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.a>
    </section>
  );
}
