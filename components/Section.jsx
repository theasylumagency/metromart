'use client';
import { motion } from 'framer-motion';

export default function Section({ id, index, title, lead, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-wrap px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="rounded-full bg-accentSoft text-accent font-bold text-xs tracking-widest px-3 py-1.5">{index}</span>
            <span className="h-px w-12 bg-accent/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-ink max-w-3xl leading-[1.05]">{title}</h2>
          {lead && <p className="mt-6 text-muted text-lg md:text-xl leading-relaxed max-w-3xl">{lead}</p>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="mt-14"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
