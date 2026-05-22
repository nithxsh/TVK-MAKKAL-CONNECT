import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type ModalType = 'privacy' | 'disclaimer' | null;

export const Footer: React.FC = () => {
  const { setViewState } = useStore();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const springTransition = { type: "spring", stiffness: 120, damping: 16 };

  return (
    <footer className="bg-black text-zinc-400 py-12 px-6 sm:px-12 relative overflow-hidden print-hide">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tighter">
            Makkal Connect
          </h2>
          <p className="text-xs font-bold tracking-widest uppercase">Empowering Change.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-black uppercase tracking-widest">
          <button onClick={() => setViewState('onboarding')} className="hover:text-white transition-colors duration-300">Eligibility</button>
          <button onClick={() => setViewState('manifesto')} className="hover:text-white transition-colors duration-300">Manifesto</button>
          <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors duration-300">Privacy Policy</button>
          <button onClick={() => setActiveModal('disclaimer')} className="hover:text-white transition-colors duration-300">Disclaimer</button>
        </div>

        <div className="text-[10px] font-bold tracking-widest text-center md:text-right">
          <p>© 2026 Makkal Connect. All rights reserved.</p>
        </div>
      </div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={springTransition}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="shrink-0 z-10 bg-zinc-950/80 backdrop-blur-md px-8 py-6 border-b border-zinc-900 flex justify-between items-center">
                <h3 className="text-white text-2xl font-black tracking-tight">
                  {activeModal === 'privacy' ? 'Privacy Policy' : 'Disclaimer'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar space-y-8">
                {activeModal === 'privacy' ? (
                  <>
                    <p className="text-zinc-400 font-bold leading-relaxed">
                      At Makkal Connect, we prioritize your privacy. The information you provide is used solely to determine your eligibility for various government schemes.
                    </p>
                    <div className="space-y-4">
                      <h4 className="text-tvk-yellow text-sm font-black uppercase tracking-[0.2em]">Data Security</h4>
                      <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                        Your personal details, such as name, age, and employment status, are encrypted and securely stored. We do not sell or share your data with unauthorized third parties.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-tvk-yellow text-sm font-black uppercase tracking-[0.2em]">Data Usage</h4>
                      <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                        Data is processed directly on your device to generate a personalized scheme checklist. Minimal anonymized data may be retained for system improvement.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-zinc-400 font-bold leading-relaxed">
                      Makkal Connect is an independent platform built to assist citizens in discovering government welfare schemes.
                    </p>
                    <div className="space-y-4">
                      <h4 className="text-tvk-yellow text-sm font-black uppercase tracking-[0.2em]">Not an Official Portal</h4>
                      <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                        This application is NOT affiliated with, endorsed by, or directly associated with the Government of Tamil Nadu or any official government agency. All scheme details are sourced from public domain information.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-tvk-yellow text-sm font-black uppercase tracking-[0.2em]">Accuracy of Information</h4>
                      <p className="text-zinc-300 text-sm font-semibold leading-relaxed">
                        While we strive for accuracy, scheme criteria and benefits are subject to change by respective government departments. Always verify eligibility at an official e-Sevai center or via official government portals before applying.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
