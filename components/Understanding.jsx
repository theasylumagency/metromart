'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

const layerStyle = {
  r1: { ring: 'border-accent/30', dot: 'bg-accent', chip: 'border-accent/20 bg-accentSoft text-ink', hover: 'card-hover-accent' },
  gr: { ring: 'border-blue/30', dot: 'bg-blue', chip: 'border-blue/20 bg-blueSoft text-ink', hover: 'card-hover-blue' },
  r2: { ring: 'border-line', dot: 'bg-muted', chip: 'border-line bg-surface text-muted', hover: 'card-hover-mint' },
};

export default function Understanding() {
  const { t } = useI18n();
  const layers = ['r1', 'gr', 'r2'];
  return (
    <Section id="understand" index="01" title={t.under.title} lead={t.under.lead}>
      <div className="grid md:grid-cols-3 gap-5">
        {layers.map((key, li) => {
          const s = layerStyle[key];
          const blocks = t.under.blocks.filter((b) => b.l === key);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: li * 0.15, duration: 0.5 }}
              className={`rounded-3xl bg-card border ${s.ring} shadow-soft ${s.hover} p-7`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                <h3 className="font-bold text-lg text-ink">{t.under.layers[key]}</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted">{t.under.layers[key + 'd']}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {blocks.map((b, i) => (
                  <motion.span
                    key={b.n}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: li * 0.15 + i * 0.06 }}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${s.chip}`}
                  >
                    {b.n}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-10 text-center text-muted italic">{t.under.note}</p>
    </Section>
  );
}
