'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">The page you were looking for does not exist.</p>
      <Link href="/" className="mt-6 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-white">Go home</Link>
    </div>
  );
}
