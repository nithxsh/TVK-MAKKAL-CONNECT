import React, { useState } from 'react';

const RATE_PER_KM = 20; // TVK manifesto mandate ₹20/km

export function GigCalculator() {
  const [km, setKm] = useState(60);
  const expected = km * RATE_PER_KM;
  const current = Math.round(km * 11.5); // ~₹11.5/km current market avg

  const pct = Math.round(((km - 20) / (200 - 20)) * 100);

  const CHECKLIST = [
    { icon: '🪪', label: 'Active Platform ID Card', sub: 'Swiggy / Zomato / Blinkit / Ola / Uber' },
    { icon: '📱', label: 'App Profile Snapshot', sub: 'Screenshot showing active partner status' },
    { icon: '🚗', label: 'Valid Driving License', sub: 'MCWG / LMV as applicable' },
  ];

  return (
    <section id="gig" className="scroll-mt-20 bg-gradient-to-br from-[#0a0005] via-[#1a0008] to-[#0a0005] text-white py-14 px-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-2 bg-[#ffcc00]/15 border border-[#ffcc00]/30 text-[#ffcc00] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            🛵 Gig Workers Protection Hub
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight pt-2">
            ஆப் வொர்க்கர் பாதுகாப்பு
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Built for Swiggy, Zomato, Blinkit riders & Ola/Uber drivers. Verify eligibility and calculate your baseline daily safety earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* VERIFICATION CHECKLIST */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-black text-[#ffcc00] uppercase tracking-wider">3-Point Eligibility Checklist</h3>
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.sub}</p>
                </div>
                <span className="ml-auto text-[#ffcc00] text-lg">✓</span>
              </div>
            ))}
            <a
              href="https://tnuwwb.tn.gov.in"
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-[#ffcc00] hover:bg-[#e6b800] text-[#1a1a1a] text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition active:scale-95 mt-2"
            >
              Apply via TN Unorganised Workers Board →
            </a>
          </div>

          {/* KM RATE CALCULATOR */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-black text-[#ffcc00] uppercase tracking-wider">Km Rate Calculator</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Daily Distance</label>
                <span className="text-[#ffcc00] font-black text-xl">{km} km</span>
              </div>
              <input
                type="range" min={20} max={200} step={5} value={km}
                style={{ '--slider-pct': `${pct}%` }}
                onChange={e => setKm(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-bold">
                <span>20 km</span><span>200 km</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#800020]/30 border border-[#800020]/50 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-1">Current Rate</p>
                <p className="text-zinc-300 font-black text-lg">₹{current.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-500 mt-0.5">~₹11.5/km avg</p>
              </div>
              <div className="bg-[#ffcc00]/10 border border-[#ffcc00]/40 rounded-2xl p-4 text-center">
                <p className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider mb-1">TVK Mandate</p>
                <p className="text-[#ffcc00] font-black text-lg">₹{expected.toLocaleString()}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">@ ₹20/km</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-semibold">Daily Difference</span>
              <span className="text-green-400 font-black text-lg">+₹{(expected - current).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
