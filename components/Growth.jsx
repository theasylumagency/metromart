'use client';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Section from './Section';
import AiDemo from './AiDemo';

const nodes = [
  { x: 60, y: 225 },
  { x: 270, y: 195 },
  { x: 480, y: 160 },
  { x: 690, y: 115 },
  { x: 920, y: 55 },
];

export default function Growth() {
  const { t } = useI18n();
  return (
    <Section id="growth" index="06" title={t.growth.title} lead={t.growth.lead}>
      <div className="rounded-3xl bg-card border border-accent/20 shadow-neon-accent p-6 overflow-x-auto">
        <svg viewBox="0 0 1000 300" className="w-full min-w-[700px]">
          <motion.path
            d="M 40 235 C 200 220, 340 195, 480 160 S 800 90, 960 40"
            fill="none"
            className="stroke-accent"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <path
            d="M 40 235 C 200 220, 340 195, 480 160 S 800 90, 960 40 L 960 300 L 40 300 Z"
            fill="url(#fade)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </linearGradient>
          </defs>
          {nodes.map((n, i) => (
            <g key={i}>
              <motion.circle
                cx={n.x} cy={n.y} r="10"
                className={`${i === 0 ? 'fill-accent' : 'fill-card'} stroke-accent`}
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.25, type: 'spring' }}
              />
              <text x={n.x} y={n.y - 20} className="fill-ink" fontSize="15" fontWeight="700" textAnchor="middle">
                {i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {t.growth.stages.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`rounded-2xl p-5 card-hover-accent ${i === 0 ? 'bg-accentSoft border border-accent/30 shadow-neon-accent' : 'bg-card card-line shadow-soft'}`}
          >
            <span className="text-accent font-extrabold">{i + 1}</span>
            <h4 className="mt-1.5 font-semibold text-sm text-ink">{s.t}</h4>
            <p className="mt-2 text-xs text-muted leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-mint/30 bg-mintSoft shadow-neon-mint p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="shrink-0 rounded-lg bg-mint text-white text-xs font-bold px-3 py-1.5 shadow-soft">24/7</span>
        <div>
          <h4 className="font-semibold text-sm text-mint">{t.growth.retainer.t}</h4>
          <p className="mt-1 text-xs text-ink/70 leading-relaxed">{t.growth.retainer.d}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-ink text-onInk shadow-glow-accent p-8 relative overflow-hidden">
        <div className="aurora w-64 h-64 bg-accent/60 -top-20 -right-16" />
        <h3 className="font-bold text-accent relative">{t.growth.recTitle}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed max-w-3xl relative text-onInk/90">{t.growth.rec}</p>
      </div>

      <div className="mt-14">
        <AiDemo />
      </div>
    </Section>
  );
}
