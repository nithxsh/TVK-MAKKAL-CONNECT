import React, { useState } from 'react';

export function LoginPanel() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLink = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Firebase Auth passwordless — wire up with your firebase config
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <section className="bg-[#f8f9fa] border-t-2 border-[#e9ecef] py-14 px-6">
      <div className="max-w-md mx-auto text-center space-y-6">

        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 bg-[#800020]/10 border border-[#800020]/20 text-[#800020] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            🔐 Secure Login — Zero Cost
          </span>
          <h2 className="text-xl font-black text-[#1a1a1a] uppercase tracking-tight pt-1">Save Your Eligibility Profile</h2>
          <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
            Track your checked criteria securely. No SMS OTP charges — Firebase Auth free tier only.
          </p>
        </div>

        {/* GOOGLE ONE-TAP */}
        <button
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#e9ecef] hover:border-[#800020]/30 hover:bg-[#800020]/5 rounded-2xl py-3.5 px-5 transition group active:scale-95"
          onClick={() => alert('Wire up Firebase Auth Google provider here.')}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-black text-zinc-700 group-hover:text-[#800020] uppercase tracking-wide transition">
            Continue with Google
          </span>
        </button>

        <div className="flex items-center gap-3 text-zinc-300">
          <div className="flex-1 h-px bg-[#e9ecef]" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">or</span>
          <div className="flex-1 h-px bg-[#e9ecef]" />
        </div>

        {/* PASSWORDLESS EMAIL */}
        {sent ? (
          <div className="animate-bounceIn bg-[#ffcc00]/10 border-2 border-[#ffcc00] rounded-2xl p-5 space-y-2">
            <p className="text-2xl">📬</p>
            <p className="font-black text-[#800020] text-sm uppercase tracking-wide">Magic Link Sent!</p>
            <p className="text-xs text-zinc-600">Check <strong>{email}</strong> — click the link to sign in securely.</p>
          </div>
        ) : (
          <form onSubmit={handleEmailLink} className="space-y-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white border-2 border-[#e9ecef] focus:border-[#ffcc00] px-4 py-3.5 rounded-xl focus:outline-none text-sm font-semibold text-[#1a1a1a] transition placeholder:text-zinc-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-shimmer text-[#1a1a1a] text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition active:scale-95 disabled:opacity-60"
            >
              {loading ? 'Sending...' : '✉️ Send Magic Login Link'}
            </button>
          </form>
        )}

        <p className="text-[10px] text-zinc-400 font-medium">
          Powered by Firebase Auth free tier · No SMS costs · Zero data stored on our servers
        </p>
      </div>
    </section>
  );
}
