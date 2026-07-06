'use client';

import { motion } from 'framer-motion';
const tiers = [
  { name: 'Starter', price: '$0', description: 'Try the core ATS checker locally.', perks: ['PDF upload', 'Keyword analysis', 'Basic suggestions'] },
  { name: 'Pro', price: '$19', description: 'For serious applicants who want deeper insights.', perks: ['DOCX support', 'Grammar scoring', 'Resume rewrite hints'] },
  { name: 'Team', price: '$49', description: 'An all-in-one review workflow for ambitious teams.', perks: ['Multi-resume view', 'Advanced reports', 'Priority insights'] }
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Pricing</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Premium experience with a simple pricing story.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
          <motion.div key={tier.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">{tier.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{tier.description}</p>
            <p className="mt-6 text-4xl font-semibold text-cyan-300">{tier.price}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {tier.perks.map((perk) => <li key={perk}>• {perk}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
