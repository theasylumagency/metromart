'use client';
import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import Section from './Section';

export default function Decisions() {
  const { t } = useI18n();
  const [checked, setChecked] = useState({});
  const total = t.decisions.groups.reduce((n, g) => n + g.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const toggle = (k) => setChecked((c) => ({ ...c, [k]: !c[k] }));
  return (
    <Section id="decisions" index="07" title={t.decisions.title} lead={t.decisions.lead} className="bg-surface">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex-1 h-2.5 rounded-full bg-ink/8 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-[#FFC46B] transition-all duration-500"
            style={{ width: `${total ? (done / total) * 100 : 0}%` }}
          />
        </div>
        <span className="text-sm text-muted font-semibold whitespace-nowrap">
          {done}/{total} {t.decisions.progress}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {t.decisions.groups.map((g, gi) => (
          <div key={g.t} className="rounded-3xl bg-card card-line shadow-soft card-hover-accent p-7">
            <h3 className="font-bold text-lg text-accent">{g.t}</h3>
            <ul className="mt-4 space-y-1">
              {g.items.map((it, ii) => {
                const k = `${gi}-${ii}`;
                const on = !!checked[k];
                return (
                  <li key={k}>
                    <button
                      onClick={() => toggle(k)}
                      className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface transition-colors"
                    >
                      <span
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                          on ? 'bg-accent border-accent' : 'border-ink/25 bg-card'
                        }`}
                      >
                        {on && (
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="3">
                            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className={`text-sm transition-colors ${on ? 'text-muted line-through' : 'text-ink'}`}>{it}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
