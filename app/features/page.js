'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, FileText, SearchCheck, Sparkles, Wand2 } from 'lucide-react';

const features = [
  { icon: BrainCircuit, title: 'ATS Intelligence', description: 'Rule-based scoring tuned for recruiter expectations.' },
  { icon: SearchCheck, title: 'Keyword Matching', description: 'Find critical gaps against any job description.' },
  { icon: FileText, title: 'Grammar & Readability', description: 'Catch flare phrases, repetition, and weak bullets.' },
  { icon: Wand2, title: 'Rewrite Suggestions', description: 'Transform generic lines into achievement-led statements.' }
];

export default function FeaturesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Features</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Everything you need to polish a modern resume.</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <feature.icon size={22} className="text-cyan-400" />
            <h2 className="mt-4 text-xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
