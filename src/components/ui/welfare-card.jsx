import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

export default function WelfareCard({ profileData }) {
  const cardRef = useRef(null);
  const { name, language, workingStatus, employment } = profileData;
  const isEn = language === 'en';

  const isGigWorker = employment === 'gig_worker' || workingStatus === 'gig_worker';
  const isStudent = employment === 'student';
  const isUnemployed = employment === 'unemployed';

  let statusText = "General Welfare";
  if (isGigWorker) statusText = "Gig Economy Shield";
  if (isStudent) statusText = "Student Support";
  if (isUnemployed) statusText = "Youth Empowerment";

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3, useCORS: true, backgroundColor: null });
      const image = canvas.toDataURL("image/png");

      const blob = await (await fetch(image)).blob();
      const file = new File([blob], "Welfare_Access_Card.png", { type: blob.type });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Makkal Connect Welfare Eligibility",
          text: "Check out my welfare eligibility from Makkal Connect!",
          files: [file]
        });
      } else {
        // Fallback to download
        const link = document.createElement('a');
        link.download = 'Welfare_Access_Card.png';
        link.href = image;
        link.click();
      }
    } catch (error) {
      console.error("Error generating or sharing card:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-10">
      {/* THE CARD ITSELF */}
      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-md p-[2px] rounded-[24px] bg-gradient-to-br from-[#800020] via-[#800020]/70 to-[#ffcc00] shadow-2xl relative overflow-hidden"
      >
        <div className="bg-white rounded-[22px] h-full w-full p-6 relative overflow-hidden flex flex-col">
          
          {/* Background Decorative Pattern */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#800020]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ffcc00]/20 rounded-full blur-3xl"></div>

          {/* Header row */}
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Official Access ID</p>
              <h3 className="text-[#800020] font-black text-xl tracking-tight leading-tight mt-0.5 uppercase">
                Makkal Connect
              </h3>
            </div>
            {/* Logo / Crest Placeholder */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#800020] to-[#4a0012] flex items-center justify-center shadow-inner">
              <span className="text-[#ffcc00] font-black text-lg">M</span>
            </div>
          </div>

          <div className="mt-8 flex gap-4 z-10 items-center">
            {/* Avatar block */}
            <div className="w-16 h-16 rounded-2xl bg-[#f8f9fa] border-2 border-[#e9ecef] flex items-center justify-center shrink-0">
               <span className="text-2xl">👤</span>
            </div>
            {/* Details */}
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-black text-zinc-800 uppercase tracking-wide truncate max-w-[200px]">
                {name || "Citizen"}
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                 <span className="bg-gradient-to-r from-[#ffcc00] to-[#ffdd44] text-[#1a1a1a] text-[10px] font-black px-2.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                   {statusText}
                 </span>
                 <svg className="w-4 h-4 text-green-500 shrink-0 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                 </svg>
              </div>
            </div>
          </div>

          {/* Footer of card */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-zinc-100 flex justify-between items-end z-10">
            <div>
              <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Verified Status</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs font-black text-[#800020] uppercase mt-0.5">Eligibility Confirmed</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Auth Code</p>
              <p className="text-[10px] font-black text-zinc-600 mt-0.5 font-mono">
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Share Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleShare}
        className="mt-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-black uppercase tracking-widest text-sm px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 active:scale-95"
      >
        Share Eligibility on WhatsApp <span className="text-lg">🟢</span>
      </motion.button>
    </div>
  );
}
