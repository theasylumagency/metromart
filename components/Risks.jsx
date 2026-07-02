'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

export default function Risks() {
  const { t } = useI18n();
  return (
    <Section id="risks" index="05" title={t.risks.title} lead={t.risks.lead}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.risks.cards.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl bg-card card-line shadow-soft card-hover-accent p-7"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex rounded-xl bg-accentSoft p-2 shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none" strokeWidth="1.8">
                  <path d="M12 3 2.5 20h19L12 3Zm0 7v4m0 3.5h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h4 className="font-semibold text-ink leading-snug">{c.t}</h4>
            </div>
            <div className="mt-4 pt-4 border-t border-line">
              <span className="text-mint text-xs font-bold tracking-wide uppercase">{t.risks.mLabel}</span>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{c.m}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
