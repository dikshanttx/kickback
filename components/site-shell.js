'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/resume-checker', label: 'Resume Checker' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.2),_transparent_30%)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-white">
            <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 p-2 shadow-glow">
              <Sparkles size={18} />
            </div>
            ResumX
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={active ? 'text-white' : 'hover:text-white'}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button className="rounded-full border border-white/15 p-2 text-slate-200 md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-slate-950/95 md:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-300">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-white" onClick={() => setOpen(false)}>{link.label}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main>{children}</main>
    </div>
  );
}
