import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Globe } from 'lucide-react';
import tvkLogo from '../assets/tvk logo.jpg';

export const Hero: React.FC = () => {
  const { userProfile, setUserProfile, setViewState } = useStore();
  const isEn = userProfile.language === 'en';

  const toggleLanguage = () => {
    setUserProfile({ language: isEn ? 'ta' : 'en' });
  };

  return (
    <div className="relative min-h-screen bg-tvk-maroon flex flex-col overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-tvk-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8">
        <div className="flex items-center gap-3">
          <img 
            src={tvkLogo} 
            alt="TVK Logo" 
            className="w-10 h-10 object-cover rounded-xl shadow-lg shadow-black/20 border border-white/10"
          />
          <span className="text-white font-black uppercase tracking-widest text-lg hidden sm:block">
            Makkal Connect
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
            Engineering by <span className="text-white">INCOGNITO BUILDS</span>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest transition hover:bg-white/20"
          >
            <Globe size={14} />
            {isEn ? 'தமிழ்' : 'English'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 py-12 lg:py-0 gap-12 lg:gap-24 relative z-10">
        <div className="flex-1 flex justify-center lg:justify-start w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 60, damping: 12 }}
            className="relative group"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-tvk-yellow/30 to-tvk-maroon/30 rounded-[3rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-gradient-to-b from-tvk-maroon to-black border border-white/10 rounded-[2.5rem] p-3 sm:p-4 shadow-2xl overflow-hidden aspect-[4/5] w-[260px] sm:w-[320px] md:w-[360px]">
              <img 
                src="/vijay_anna.png" 
                alt="Leader" 
                className="w-full h-full object-cover rounded-[1.8rem] sm:rounded-[2rem] filter contrast-125 saturate-110"
              />
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <p className="text-tvk-yellow font-black tracking-widest uppercase text-[10px] sm:text-sm">Thalapathy Vijay</p>
                <p className="text-white/60 text-[8px] sm:text-[10px] tracking-wider uppercase mt-0.5 sm:mt-1">Founder-President, TVK</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.95] sm:leading-[0.9]"
          >
            {isEn ? (
              <>Welfare Guidance <br/><span className="text-tvk-yellow drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">Portal</span></>
            ) : (
              <>மக்கள் <br/><span className="text-tvk-yellow drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">நலவழிகாட்டித் தளம்</span></>
            )}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-2 sm:pt-0"
          >
            <button 
              onClick={() => setViewState('onboarding')}
              className="btn-primary text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-6 animate-pulse-slow w-full sm:w-auto"
            >
              {isEn ? 'Get Your Schemes →' : 'உங்கள் திட்டங்களை அறிய →'}
            </button>
          </motion.div>
        </div>
      </main>

      {/* Floating Elements */}
      <div className="absolute bottom-12 left-12 flex flex-col gap-2">
        <div className="w-1 h-12 bg-tvk-yellow/30 rounded-full" />
        <div className="w-1 h-4 bg-tvk-yellow rounded-full" />
      </div>
    </div>
  );
};
