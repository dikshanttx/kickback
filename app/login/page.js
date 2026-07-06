'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';

const socialButtons = [
  { label: 'Continue with Google', accent: 'border-white/10 bg-white/5 text-white' },
  { label: 'Continue with Apple', accent: 'border-white/10 bg-white/5 text-white' }
];

function getStoredUsers() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('resumx-users') || '[]');
  } catch {
    return [];
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messageTone, setMessageTone] = useState('text-emerald-300');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('resumx-user');
      if (storedUser) {
        router.replace('/resume-checker');
      }
    } catch (error) {
      console.error('Unable to read session storage.', error);
    }
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedUsername = username.trim();
    const users = getStoredUsers();

    if (mode === 'signup') {
      const trimmedName = name.trim();
      const displayName = trimmedName || trimmedUsername || trimmedEmail.split('@')[0];

      if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
        setMessage('Please enter your username, email, and password.');
        setMessageTone('text-amber-300');
        setIsSubmitting(false);
        return;
      }

      const exists = users.some((user) => user.email.toLowerCase() === trimmedEmail || user.username?.toLowerCase() === trimmedUsername.toLowerCase());
      if (exists) {
        setMessage('An account with that email or username already exists. Please sign in instead.');
        setMessageTone('text-amber-300');
        setIsSubmitting(false);
        return;
      }

      const nextUsers = [...users, { name: displayName, username: trimmedUsername, email: trimmedEmail, password: trimmedPassword }];
      try {
        localStorage.setItem('resumx-users', JSON.stringify(nextUsers));
        localStorage.setItem('resumx-user', JSON.stringify({ name: displayName, email: trimmedEmail, username: trimmedUsername }));
      } catch (error) {
        console.error('Unable to save the new account.', error);
        setMessage('We could not save your account right now. Please try again.');
        setMessageTone('text-amber-300');
        setIsSubmitting(false);
        return;
      }

      setMessage(`Account created for ${displayName}.`);
      setMessageTone('text-emerald-300');
      setIsSubmitting(false);
      router.replace('/resume-checker');
      return;
    }

    if (!trimmedEmail || !trimmedPassword) {
      setMessage('Please enter your email or username and password.');
      setMessageTone('text-amber-300');
      setIsSubmitting(false);
      return;
    }

    const user = users.find((entry) => {
      const matchesEmail = entry.email?.toLowerCase() === trimmedEmail;
      const matchesUsername = entry.username?.toLowerCase() === trimmedEmail;
      return (matchesEmail || matchesUsername) && entry.password === trimmedPassword;
    });

    if (!user) {
      setMessage('No matching account found. Try creating an account first.');
      setMessageTone('text-amber-300');
      setIsSubmitting(false);
      return;
    }

    try {
      localStorage.setItem('resumx-user', JSON.stringify({ name: user.name, email: user.email, username: user.username }));
    } catch (error) {
      console.error('Unable to save the active session.', error);
    }

    setMessage(`Welcome back, ${user.name}!`);
    setMessageTone('text-emerald-300');
    setIsSubmitting(false);
    router.replace('/resume-checker');
  };

  const handleSocialAuth = (provider) => {
    const displayName = name.trim() || username.trim() || 'Guest User';
    try {
      localStorage.setItem('resumx-user', JSON.stringify({ name: displayName, email: `${provider.toLowerCase()}-user@example.com`, username: `${provider.toLowerCase()}-user` }));
    } catch (error) {
      console.error('Unable to save the active session.', error);
    }
    setMessage(`Signed in with ${provider}.`);
    setMessageTone('text-emerald-300');
    router.replace('/resume-checker');
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
            <ShieldCheck size={16} /> Secure access
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Start with a simple account.</h1>
          <p className="mt-4 text-lg text-slate-300">Create an account or sign in to unlock AI-powered resume review, ATS scoring, and enhanced export options.</p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">How it works</p>
            <ul className="mt-3 space-y-2">
              <li>• Sign in with your email</li>
              <li>• Upload or paste your resume</li>
              <li>• Improve it for a job role and export it</li>
            </ul>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-300">
            <Mail size={16} className="text-cyan-400" />
            <span>{mode === 'login' ? 'Sign in to continue' : 'Create your free account'}</span>
          </div>

          <div className="space-y-3">
            {socialButtons.map((button) => (
              <button key={button.label} type="button" onClick={() => handleSocialAuth(button.label.includes('Google') ? 'Google' : 'Apple')} className={`flex w-full items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium transition hover:bg-white/10 ${button.accent}`}>
                {button.label}
              </button>
            ))}
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
            <div className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' ? (
              <>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name (optional)" className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-3 text-sm text-slate-200 outline-none" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-3 text-sm text-slate-200 outline-none" />
              </>
            ) : null}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={mode === 'login' ? 'Email or username' : 'Email address'} className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-3 text-sm text-slate-200 outline-none" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-slate-800/80 p-3 text-sm text-slate-200 outline-none" />
            <button disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? 'Please wait...' : 'Continue'} <ArrowRight size={16} />
            </button>
          </form>
          {message ? <p className={`mt-4 text-sm ${messageTone}`}>{message}</p> : null}
          <p className="mt-6 text-sm text-slate-400">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="font-medium text-cyan-300 transition hover:text-cyan-200">
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
          <Link href="/" className="mt-4 inline-flex text-sm text-slate-400 hover:text-white">Back to home</Link>
        </motion.div>
      </div>
    </section>
  );
}
