'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function NextStep() {
  const { t } = useI18n();
  return (
    <section id="next" className="relative py-24 md:py-32 overflow-hidden">
      <div className="aurora w-[28rem] h-[28rem] bg-[#FFD6AD] -bottom-32 -left-24 animate-blob" />
      <div className="aurora w-[24rem] h-[24rem] bg-[#CFE0FF] top-0 right-[-6rem] animate-blob-slow" />
      <div className="relative mx-auto max-w-wrap px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="rounded-full bg-accentSoft text-accent font-bold text-xs tracking-widest px-3 py-1.5">08</span>
            <span className="h-px w-12 bg-accent/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">{t.next.title}</h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {t.next.steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl bg-card border border-accent/20 shadow-soft card-hover-accent p-8"
            >
              <span className="text-gradient font-extrabold text-5xl">{i + 1}</span>
              <h3 className="mt-4 font-bold text-lg text-ink">{s.t}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="/proposal"
            className="rounded-full bg-ink text-onInk font-semibold px-9 py-4 shadow-neon-accent hover:shadow-glow-accent hover:-translate-y-0.5 transition-all"
          >
            {t.next.ctaProposal} →
          </a>
          <a
            href="mailto:hello@theasylum.agency"
            className="rounded-full bg-card border border-line shadow-soft px-9 py-4 font-medium text-ink hover:-translate-y-0.5 transition-transform"
          >
            hello@theasylum.agency
          </a>
        </div>

        <div className="mt-24 pt-8 border-t border-line flex flex-col md:flex-row gap-6 md:items-end justify-between">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 font-bold text-ink">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent" />
              {t.next.aboutTitle}
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">{t.next.about}</p>
          </div>
          <p className="text-xs text-muted/80 max-w-xs md:text-right">{t.next.footer}</p>
        </div>
      </div>
    </section>
  );
}
