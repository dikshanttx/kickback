'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle2, FileText, Sparkles, ShieldCheck } from 'lucide-react';

const features = [
  'Instant ATS scoring',
  'Keyword gap analysis',
  'Grammar and readability checks',
  'Local PDF and DOCX parsing'
];

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
            <Sparkles size={16} /> Frontend-only AI resume analysis
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Improve your resume with a simple, professional ATS checker built for the browser.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Upload a PDF, DOCX, or paste text. Get a polished ATS score, keyword gaps, grammar insights, and action-oriented rewrites without sending anything to a server.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-medium text-white shadow-glow">
              Create Account <ArrowRight size={18} />
            </Link>
            <Link href="/resume-checker" className="rounded-full border border-white/15 px-6 py-3 font-medium text-slate-200">Open Resume Checker</Link>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> {feature}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-2xl border border-white/10 bg-slate-800/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">ATS Score</p>
                <p className="text-3xl font-semibold text-white">92/100</p>
              </div>
              <div className="rounded-2xl bg-emerald-500/15 p-3 text-emerald-300">
                <ShieldCheck size={24} />
              </div>
            </div>
            <div className="space-y-4">
              {[{label: 'Keywords', value: 96}, {label: 'Formatting', value: 88}, {label: 'Grammar', value: 90}].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <FileText size={18} className="text-cyan-400" />
              <p className="mt-3 text-2xl font-semibold text-white">24</p>
              <p className="text-sm text-slate-400">Keywords</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <BarChart3 size={18} className="text-violet-400" />
              <p className="mt-3 text-2xl font-semibold text-white">8</p>
              <p className="text-sm text-slate-400">Suggestions</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <ShieldCheck size={18} className="text-emerald-400" />
              <p className="mt-3 text-2xl font-semibold text-white">3.8</p>
              <p className="text-sm text-slate-400">Readability</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
