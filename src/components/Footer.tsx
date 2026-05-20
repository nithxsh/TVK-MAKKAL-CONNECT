import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewState } = useStore();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const springTransition = { type: "spring", stiffness: 120, damping: 16 };

  return (
    <footer className="bg-black text-zinc-400 py-20 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* SECTION 1: UPPER UTILITY LINKS GRID */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Left Block: Vision Baseline */}
          <div className="space-y-4">
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tighter leading-none">
              Empowering <br /> Change.
            </h2>
          </div>

          {/* Right Block: 3-Column Minimal Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-20">
            {/* Column 1: NAVIGATION */}
            <div className="space-y-6">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.3em]">Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li>
                  <button onClick={() => setViewState('onboarding')} className="hover:text-white transition-colors duration-300">Eligibility Checker</button>
                </li>
                <li>
                  <button onClick={() => setViewState('manifesto')} className="hover:text-white transition-colors duration-300">Manifesto Portal</button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-300">About Platform</button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-300">Initiate Verification</button>
                </li>
              </ul>
            </div>

            {/* Column 2: DIRECT UPLINK */}
            <div className="space-y-6">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.3em]">Direct Uplink</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li>
                  <a href="mailto:support@makkalconnect.org" className="hover:text-white transition-colors duration-300">Email Support</a>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-300">System Analytics</button>
                </li>
              </ul>
            </div>

            {/* Column 3: LEAD ARCHITECT */}
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.3em]">Lead Architect</h4>
              <div className="space-y-1">
                <p className="text-[#00E5FF] text-[10px] font-black uppercase tracking-widest">Founder</p>
                <p className="text-white text-xl font-black tracking-tight">Nithishwaran.J.C</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: COMPLIANCE LOWER BASEBAR */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8 text-xs font-black uppercase tracking-widest">
            <span className="text-white">MAKKAL CONNECT</span>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </button>
            <button className="hover:text-white transition-colors duration-300">Terms & Conditions</button>
          </div>

          <div className="text-[10px] font-bold tracking-widest text-center md:text-right space-y-1">
            <p>© 2026 Makkal Connect. All rights reserved.</p>
            <p className="text-zinc-500 uppercase">Crafted by <span className="text-white">Nithishwaran.J.C.</span></p>
          </div>
        </div>
      </div>

      {/* SECTION 4: INTERACTIVE PRIVACY POLICY MODAL SUB-SYSTEM */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Card Container Surface */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={springTransition}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Control Header */}
              <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md px-8 py-6 border-b border-zinc-900 flex justify-between items-center">
                <h3 className="text-white text-2xl font-black tracking-tight">Privacy Policy</h3>
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scroll Content */}
              <div className="max-h-[70vh] overflow-y-auto px-8 py-10 custom-scrollbar space-y-12">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Effective Date: January 1, 2026</p>
                  <p className="text-zinc-400 font-bold leading-relaxed">
                    Welcome to Incognito Collective. Your privacy is paramount. This policy outlines how we handle data within our decentralized digital architecture studio.
                  </p>
                </div>

                {/* Content Chunks */}
                <div className="space-y-10">
                  <section className="space-y-4">
                    <h4 className="text-[#00E5FF] text-sm font-black uppercase tracking-[0.3em]">1. ZERO-TELEMETRY PROTOCOL</h4>
                    <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                      We do not track, log, or store your private browsing sessions. All submissions to our 'Initiate Project' engine are encrypted end-to-end and saved directly into secure, private firestore databases.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h4 className="text-[#00E5FF] text-sm font-black uppercase tracking-[0.3em]">2. DATA COLLECTION & TRANSMISSION</h4>
                    <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                      We only collect the parameters voluntarily provided during project initiation (e.g., your name, company, timeline, budget, and contact address). This information is utilized solely to establish secure project communication channels.
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h4 className="text-[#00E5FF] text-sm font-black uppercase tracking-[0.3em]">3. PUBLIC ACCESS RESTRAINTS</h4>
                    <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                      Your project architectural models, operational source arrays, and organizational identities remain shielded from indexing search algorithms, third-party brokerage pipelines, and unauthorized visibility metrics.
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
