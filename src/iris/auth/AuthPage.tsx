'use client';

/**
 * Iris account page — PREVIEW / GIMMICK IMPLEMENTATION.
 *
 * This is a simulated sign-up / sign-in flow. It looks and behaves like a
 * real SaaS auth screen (validation, loading states, success feedback) but
 * the "account" is stored locally by `src/iris/auth/session.ts`.
 *
 * ROADMAP (Iris Cloud milestone):
 *  - Wire the Google button to NextAuth.js `signIn('google')`
 *  - Replace `session.signIn()` with a real credential/OAuth round-trip
 *  - Keep the visual design — it is the intended final look
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Loader2, Lock } from 'lucide-react';
import { IMAGES } from '../marketing/brand';
import { IrisMark } from '../marketing/IrisLogo';
import { signIn } from './session';

/* Google "G" mark (brand-correct four-color logo). */
function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.86c2.26-2.09 3.56-5.17 3.56-8.89z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.13A11.99 11.99 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.55.38-2.27V6.6H1.29a11.99 11.99 0 0 0 0 10.8l3.98-3.13z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.6l3.98 3.13C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

type Mode = 'signup' | 'signin';
type Phase = 'form' | 'submitting' | 'success';

export function AuthPage({
  onDone,
  onBack,
}: {
  /** Called after the (simulated) account is created — enters the studio. */
  onDone: () => void;
  /** Back to the landing page. */
  onBack: () => void;
}) {
  const [mode, setMode] = useState<Mode>('signup');
  const [phase, setPhase] = useState<Phase>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [googleNote, setGoogleNote] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const valid = useMemo(() => {
    const e: typeof errors = {};
    if (mode === 'signup' && name.trim().length < 2) e.name = 'Tell us your name — even a nickname works.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'That email doesn’t look quite right.';
    if (password.length < 6) e.password = 'At least 6 characters, please.';
    return e;
  }, [mode, name, email, password]);

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (phase !== 'form') return;
    setErrors(valid);
    if (Object.keys(valid).length > 0) return;

    setPhase('submitting');
    signIn(name || email.split('@')[0], email).then((session) => {
      setPhase('success');
      window.setTimeout(onDone, 1100);
      void session;
    });
  };

  const inputCls = (bad?: string) =>
    `h-11 w-full rounded-xl border bg-white px-3.5 text-[14px] text-[#1B1712] outline-none transition-all placeholder:text-[#57504A]/50 focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#8B5CF6]/15 ${
      bad ? 'border-[#D97757]' : 'border-[#E7DFD2]'
    }`;

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#1B1712] antialiased">
      {/* ------------------------- left: image panel ------------------------- */}
      <aside className="relative hidden w-[46%] max-w-[640px] shrink-0 overflow-hidden lg:block" aria-hidden="true">
        <img
          src={IMAGES.lilacMacro}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B1712]/55 via-[#1B1712]/35 to-[#1B1712]/80" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white xl:p-14">
          <div className="flex items-center gap-2.5">
            <IrisMark size={26} />
            <span className="font-display text-[1.35rem] font-semibold tracking-tight">Iris</span>
          </div>

          <div>
            <blockquote className="font-display max-w-md text-[1.9rem] font-medium italic leading-snug tracking-tight">
              “Every masterpiece begins as a single petal.”
            </blockquote>
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/60">
              The Iris manifesto
            </p>
          </div>

          <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
            <Lock className="size-4 shrink-0 text-white/80" aria-hidden="true" />
            <p className="text-[12px] leading-relaxed text-white/85">
              Preview build — accounts are simulated on this device. Real Google sign-in
              arrives with Iris Cloud.
            </p>
          </div>
        </div>
      </aside>

      {/* ------------------------- right: form panel ------------------------- */}
      <main className="relative flex min-w-0 flex-1 flex-col px-5 py-8 sm:px-10 lg:px-16" aria-label="Account">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#57504A] transition-colors hover:text-[#1B1712]"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to website
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E7DFD2] bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8B5CF6] lg:hidden">
            <IrisMark size={12} /> Iris
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-10">
          <AnimatePresence mode="wait">
            {phase === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-16 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="flex size-16 items-center justify-center rounded-full bg-[#8B5CF6] text-white shadow-[0_20px_40px_-14px_rgba(139,92,246,0.8)]"
                >
                  <Check className="size-7" aria-hidden="true" />
                </motion.span>
                <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight">
                  Welcome to Iris{name.trim() ? `, ${name.trim().split(/\s+/)[0]}` : ''}.
                </h1>
                <p className="mt-3 text-[14px] text-[#57504A]">Opening your studio…</p>
                <Loader2 className="mt-6 size-5 animate-spin text-[#8B5CF6]" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <IrisMark size={34} className="lg:hidden" />
                <h1 className="font-display mt-4 text-[2.1rem] font-semibold leading-tight tracking-tight lg:mt-0">
                  {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="mt-2 text-[14.5px] text-[#57504A]">
                  {mode === 'signup'
                    ? 'Your new studio is one step away. Free — forever.'
                    : 'Sign in and pick up right where you left off.'}
                </p>

                {/* Google (coming soon) */}
                <div className="relative mt-8">
                  <button
                    type="button"
                    onClick={() => setGoogleNote((v) => !v)}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E7DFD2] bg-white text-[14px] font-medium text-[#1B1712] transition-all hover:border-[#1B1712]/30 hover:shadow-sm"
                  >
                    <GoogleMark className="size-[18px]" />
                    Continue with Google
                    <span className="rounded-full bg-[#F1EBFC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#6D28D9]">
                      Soon
                    </span>
                  </button>
                  <AnimatePresence>
                    {googleNote && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-2 rounded-lg bg-[#F1EBFC] px-3.5 py-2.5 text-[12px] leading-relaxed text-[#6D28D9]"
                      >
                        Google sign-in lands with Iris Cloud. This preview accepts any
                        details you like — they stay on this device.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="my-6 flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-[#E7DFD2]" />
                  <span className="text-[11.5px] uppercase tracking-[0.14em] text-[#57504A]/70">
                    or use email
                  </span>
                  <span className="h-px flex-1 bg-[#E7DFD2]" />
                </div>

                <form noValidate onSubmit={submit} className="flex flex-col gap-4">
                  {mode === 'signup' && (
                    <div>
                      <label htmlFor="auth-name" className="mb-1.5 block text-[13px] font-medium">
                        Full name
                      </label>
                      <input
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className={inputCls(errors.name)}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <p className="mt-1.5 text-[12px] text-[#D97757]">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="auth-email" className="mb-1.5 block text-[13px] font-medium">
                      Email
                    </label>
                    <input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@studio.com"
                      className={inputCls(errors.email)}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && <p className="mt-1.5 text-[12px] text-[#D97757]">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="auth-password" className="mb-1.5 block text-[13px] font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="auth-password"
                        type={showPw ? 'text' : 'password'}
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className={`${inputCls(errors.password)} pr-11`}
                        aria-invalid={Boolean(errors.password)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? 'Hide password' : 'Show password'}
                        className="absolute right-1 top-1 flex size-9 items-center justify-center rounded-lg text-[#57504A] transition-colors hover:text-[#1B1712]"
                      >
                        {showPw ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1.5 text-[12px] text-[#D97757]">{errors.password}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={phase === 'submitting'}
                    className="group mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] text-[14.5px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(139,92,246,0.75)] transition-all hover:bg-[#7C4DF3] disabled:opacity-80"
                  >
                    {phase === 'submitting' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        {mode === 'signup' ? 'Creating your studio…' : 'Signing you in…'}
                      </>
                    ) : (
                      <>
                        {mode === 'signup' ? 'Create account' : 'Sign in'}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-[13px] text-[#57504A]">
                  {mode === 'signup' ? 'Already have an account?' : 'New to Iris?'}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'signup' ? 'signin' : 'signup');
                      setErrors({});
                    }}
                    className="font-semibold text-[#6D28D9] transition-colors hover:text-[#8B5CF6]"
                  >
                    {mode === 'signup' ? 'Sign in' : 'Create one — free'}
                  </button>
                </p>

                <p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#57504A]/75">
                  Preview build — your details are simulated locally and never sent
                  anywhere. Iris itself is local-first: designs always stay on your
                  machine.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
