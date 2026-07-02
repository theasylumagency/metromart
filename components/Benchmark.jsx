'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

const icons = [
  <path key="0" d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm4 17.5h.01" strokeLinecap="round" />,
  <path key="1" d="M5 19 19 5M7.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" strokeLinecap="round" />,
  <path key="2" d="M4 6h16M4 12h10M4 18h6M18 10v8m-3-3 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="3" d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" strokeLinecap="round" />,
  <path key="4" d="M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 18a1.5 1.5 0 1 0 0-3m10 3a1.5 1.5 0 1 0 0-3" strokeLinecap="round" strokeLinejoin="round" />,
  <path key="5" d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />,
];

export default function Benchmark() {
  const { t } = useI18n();
  return (
    <Section id="market" index="02" title={t.market.title} lead={t.market.lead} className="bg-surface">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div className="grid sm:grid-cols-2 gap-4">
          {t.market.exp.map((e, i) => (
            <motion.div
              key={e.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-card card-line shadow-soft card-hover-accent p-6"
            >
              <span className="inline-flex rounded-xl bg-accentSoft p-2.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none" strokeWidth="1.8">
                  {icons[i]}
                </svg>
              </span>
              <h4 className="mt-3.5 font-semibold text-ink">{e.t}</h4>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{e.d}</p>
            </motion.div>
          ))}
        </div>
        <div className="rounded-3xl bg-card border border-accent/25 shadow-neon-accent p-6 lg:sticky lg:top-24">
          <svg viewBox="0 0 340 340" className="w-full">
            <line x1="30" y1="170" x2="310" y2="170" className="stroke-ink/15" strokeWidth="1" />
            <line x1="170" y1="30" x2="170" y2="310" className="stroke-ink/15" strokeWidth="1" />
            <text x="34" y="188" className="fill-muted" fontSize="11">{t.market.quad.xL}</text>
            <text x="306" y="188" className="fill-muted" fontSize="11" textAnchor="end">{t.market.quad.xR}</text>
            <text x="170" y="24" className="fill-muted" fontSize="11" textAnchor="middle">{t.market.quad.yT}</text>
            <text x="170" y="326" className="fill-muted" fontSize="11" textAnchor="middle">{t.market.quad.yB}</text>
            {[[112, 232], [88, 258], [130, 262], [104, 288], [146, 240], [120, 212]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="7" className="fill-muted/30" />
            ))}
            <text x="118" y="315" className="fill-muted" fontSize="11" textAnchor="middle">{t.market.quad.others}</text>
            <motion.circle
              cx="112" cy="86" r="11" className="fill-accent"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.4 }}
            />
            <circle cx="112" cy="86" r="18" fill="none" className="stroke-accent" strokeOpacity="0.4">
              <animate attributeName="r" values="14;24;14" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x="112" y="62" className="fill-accent" fontSize="12" fontWeight="700" textAnchor="middle">{t.market.quad.target}</text>
          </svg>
          <p className="mt-4 text-center text-sm text-ink font-medium border-t border-line pt-4">
            “{t.market.principle}”
          </p>
        </div>
      </div>
    </Section>
  );
}
