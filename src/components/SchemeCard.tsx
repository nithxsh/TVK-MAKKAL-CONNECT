import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, ArrowUpRight } from 'lucide-react';

interface Scheme {
  id: string;
  title: { en: string; ta: string };
  description: { en: string; ta: string };
  benefit: string;
  checklist: string[];
}

interface SchemeCardProps {
  scheme: Scheme;
  isEn: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, isEn }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-zinc-100 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] group">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-black text-tvk-maroon/40 uppercase tracking-widest">{scheme.id}</span>
          <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 group-hover:bg-tvk-maroon/5 group-hover:text-tvk-maroon transition-colors">
            <FileText size={18} />
          </div>
        </div>

        <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight leading-tight">
          {isEn ? scheme.title.en : scheme.title.ta}
        </h3>

        <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
          {isEn ? scheme.description.en : scheme.description.ta}
        </p>

        <div className="bg-zinc-50 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Benefit</p>
            <p className="text-sm font-black text-tvk-maroon">{scheme.benefit}</p>
          </div>
          <span className="text-xl">💰</span>
        </div>

        {/* Expandable Checklist */}
        <div className="pt-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-tvk-maroon transition"
          >
            {isEn ? 'Required Documents' : 'தேவையான சான்றிதழ்கள்'}
            <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <ul className="pt-4 space-y-2">
                  {scheme.checklist.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-tvk-yellow" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-8">
        <button className="w-full py-4 bg-tvk-maroon text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition hover:bg-tvk-maroon/90 active:scale-[0.98]">
          Apply Now
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
