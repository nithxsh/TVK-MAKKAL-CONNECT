import React, { useEffect, useState } from 'react';
import tvkFlag from '@/assets/tvk flag.jpg';

export function FlagReveal({ onDone }) {
  const [phase, setPhase] = useState('idle'); // idle → pulse → split → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('pulse'), 100);
    const t2 = setTimeout(() => setPhase('split'), 1600);
    const t3 = setTimeout(() => { setPhase('done'); onDone?.(); }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[9999] flex overflow-hidden" aria-hidden="true">
      {/* LEFT PANEL */}
      <div
        className={`w-1/2 h-full bg-[#0a0005] flex items-center justify-end transition-none ${phase === 'split' ? 'reveal-panel-left' : ''}`}
      >
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0008] to-[#0a0005]" />
          <img src={tvkFlag} alt="" className="absolute left-1/2 -translate-x-1/2 w-32 opacity-20 blur-sm select-none pointer-events-none" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`w-1/2 h-full bg-[#0a0005] flex items-center justify-start transition-none ${phase === 'split' ? 'reveal-panel-right' : ''}`}
      >
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a0008] to-[#0a0005]" />
        </div>
      </div>

      {/* CENTER MATRIX LINE */}
      <div className={`absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full flex flex-col items-center justify-center gap-6 transition-opacity duration-500 ${phase === 'split' ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`w-[2px] h-full bg-gradient-to-b from-transparent via-[#ffcc00] to-transparent ${phase === 'pulse' ? 'matrix-line' : ''}`} />
      </div>

      {/* CENTER LOGO */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none transition-opacity duration-300 ${phase === 'split' ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={tvkFlag}
          alt="TVK"
          className={`w-20 h-14 object-cover rounded-lg shadow-2xl border border-[#ffcc00]/30 transition-all duration-700 ${phase === 'pulse' ? 'scale-110 shadow-[0_0_40px_rgba(255,204,0,0.5)]' : 'scale-100'}`}
        />
        <p className={`text-[#ffcc00] font-black text-lg uppercase tracking-[0.3em] transition-all duration-700 ${phase === 'pulse' ? 'opacity-100' : 'opacity-0'}`}>
          Makkal Connect
        </p>
        <p className={`text-zinc-500 text-xs uppercase tracking-widest transition-all duration-700 delay-200 ${phase === 'pulse' ? 'opacity-100' : 'opacity-0'}`}>
          மக்கள் கனெக்ட்
        </p>
      </div>
    </div>
  );
}
