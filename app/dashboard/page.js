'use client';

import { motion } from 'framer-motion';
import { BarChart3, FileCheck2, Search, Sparkles, TrendingUp } from 'lucide-react';

const cards = [
  { label: 'ATS Score', value: '92%', tone: 'text-cyan-400' },
  { label: 'Resume Strength', value: '8.7/10', tone: 'text-violet-400' },
  { label: 'Keyword Match', value: '84%', tone: 'text-emerald-400' },
  { label: 'Grammar Score', value: '90%', tone: 'text-amber-400' }
];

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Dashboard</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your resume health at a glance</h1>
        </div>
        <div className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Local-only insights • no backend required</div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-400">{card.label}</p>
              <div className="rounded-2xl bg-white/10 p-2"><TrendingUp size={16} className={card.tone} /></div>
            </div>
            <p className={`text-3xl font-semibold ${card.tone}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-2 text-cyan-300"><BarChart3 size={18} /> Resume Strength Overview</div>
          <div className="grid gap-4 sm:grid-cols-3">
            {['Keywords', 'Formatting', 'Readability'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                <p className="text-sm text-slate-400">{item}</p>
                <p className="mt-2 text-2xl font-semibold text-white">92%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-2 text-violet-300"><Search size={18} /> Suggested Enhancements</div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">Replace passive phrasing with measurable accomplishments.</li>
            <li className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">Add keywords like accessibility and testing to align with the role.</li>
            <li className="rounded-2xl border border-white/10 bg-slate-800/70 p-3">Highlight leadership and cross-functional outcomes with numbers.</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <div className="mb-4 flex items-center gap-2 text-emerald-300"><FileCheck2 size={18} /> Improvement Timeline</div>
        <div className="space-y-3">
          {['Resume uploaded', 'ATS analysis completed', 'Keywords compared', 'Report prepared'].map((step, index) => (
            <div key={step} className="flex items-center gap-3 text-sm text-slate-300">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>{step}</span>
              <span className="ml-auto text-slate-500">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
