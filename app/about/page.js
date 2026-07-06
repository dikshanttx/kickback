'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-slate-300 backdrop-blur">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">About</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built for professionals who want sharper resumes.</h1>
        <p className="mt-4 text-lg leading-8">
          Kickback AI Resume is a frontend-only experience designed to help job seekers review, improve, and compare their resumes locally. Every analysis runs in the browser with no backend, no database, and no data sharing.
        </p>
      </motion.div>
    </section>
  );
}
