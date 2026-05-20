import React, { useState } from 'react';
import { MASTER_MANIFESTO_CATALOG } from '../data/MasterManifestoCatalog';
import { LANGUAGE_PACK } from './LanguagePack';

export default function MasterDashboard() {
  const [lang, setLang] = useState('thanglish'); // Default language set to Thanglish
  const [activeTab, setActiveTab] = useState('women');
  const [income, setIncome] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  // Shortcut pointer referencing the active selected dictionary pack
  const text = LANGUAGE_PACK[lang];

  const categories = [
    { id: 'women', label: text.tabs.women },
    { id: 'youth', label: text.tabs.youth },
    { id: 'governance', label: text.tabs.governance },
    { id: 'police', label: text.tabs.police }
  ];

  const isEligible = Number(income) <= 41600 && Number(income) > 0;

  return (
    <div className="bg-white min-h-screen text-[#1a1a1a] transition-all">
      
      {/* 🌐 MULTI-LANGUAGE SELECTION CHIPS ROW (Top Floating Accent Anchor) */}
      <div className="bg-[#800020] py-2.5 px-4 flex justify-end gap-2 border-b border-[#ffcc00]/30 shadow-sm">
        <span className="text-[10px] text-white/60 font-black uppercase tracking-wider self-center mr-2 font-mono">
          Language Selector:
        </span>
        {['english', 'tamil', 'thanglish'].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition duration-150 cursor-pointer
              ${lang === l 
                ? 'bg-[#ffcc00] text-[#1a1a1a] shadow-sm' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {l === 'thanglish' ? 'Thanglish' : l === 'tamil' ? 'தமிழ்' : 'English'}
          </button>
        ))}
      </div>

      {/* 🏛️ CORE BRANDING APP HEADER */}
      <header className="bg-white border-b-4 border-[#ffcc00] py-6 px-4 text-center shadow-sm">
        <h1 className="text-3xl font-black tracking-tight text-[#800020] uppercase">
          {text.title}
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-1">
          {text.subTitle}
        </p>
      </header>

      {/* 📊 INTERACTIVE INCOME FILTER ACCENT CARD */}
      <div className="max-w-xl mx-auto px-4 mt-8">
        <div className="bg-[#f8f9fa] border-2 border-[#e9ecef] rounded-3xl p-5 shadow-sm">
          <h4 className="text-xs font-black text-[#800020] uppercase mb-1 flex items-center gap-2">
            <span className="w-2 h-4 bg-[#ffcc00] inline-block rounded-sm"></span>
            {text.eligibilityTitle}
          </h4>
          <p className="text-[11px] text-zinc-600 mb-3 font-medium">{text.eligibilitySub}</p>
          
          <input 
            type="number" 
            placeholder={text.placeholder}
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full bg-white border-2 border-[#e9ecef] focus:border-[#ffcc00] px-4 py-2.5 rounded-xl focus:outline-none text-md font-mono text-[#1a1a1a] font-bold transition-all"
          />

          {income && (
            <div className="mt-3 text-[11px] font-medium animate-fadeIn">
              {isEligible ? (
                <div className="bg-[#ffcc00]/10 border-l-4 border-[#ffcc00] p-2.5 rounded-r-xl text-zinc-800">
                  {text.eligibleStatus}
                </div>
              ) : (
                <div className="bg-zinc-100 border-l-4 border-zinc-400 p-2.5 rounded-r-xl text-zinc-500">
                  {text.notEligibleStatus}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 🧭 NAVIGATION TABS CHIPS VIEW */}
      <nav className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition duration-200 border cursor-pointer
                ${activeTab === cat.id 
                  ? 'bg-[#ffcc00] text-[#1a1a1a] border-[#ffcc00]' 
                  : 'bg-[#f8f9fa] text-zinc-600 border-[#e9ecef] hover:border-[#800020]/20'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 📜 SCHEMES INTERACTIVE LOOP SHOWING FILTERED INDEXES */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTER_MANIFESTO_CATALOG[activeTab].map((scheme) => (
            <div 
              key={scheme.num}
              className="bg-white border-2 border-[#e9ecef] hover:border-[#800020]/20 rounded-2xl p-5 flex flex-col justify-between shadow-sm transition duration-300 group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono font-black text-[#800020] bg-[#800020]/5 px-2 py-0.5 rounded border border-[#800020]/10">
                    {activeTab.toUpperCase()}_ACT_{scheme.num}
                  </span>
                  <span className="text-2xl font-black font-mono text-zinc-200 group-hover:text-[#ffcc00] transition duration-300">
                    {scheme.num}
                  </span>
                </div>

                <h3 className="text-sm font-black text-[#800020] uppercase tracking-wide leading-tight">
                  {scheme.name}
                </h3>
                <p className="text-zinc-600 text-xs font-medium leading-relaxed mt-2.5 mb-4 line-clamp-3">
                  {scheme.desc}
                </p>
              </div>

              <button 
                onClick={() => setActiveModal({ ...scheme, catLabel: categories.find(c => c.id === activeTab).label })}
                className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#1a1a1a] text-[11px] font-black uppercase tracking-wider py-2 rounded-xl transition shadow-sm mt-2 cursor-pointer"
              >
                {text.viewBtn}
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 🗺️ DETAILED LIGHTBOX DIALOG MODAL */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#0a0005]/70 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn animate-dialog-show">
          <div className="bg-white border-4 border-[#ffcc00] max-w-lg w-full p-6 rounded-3xl shadow-2xl relative animate-dialog-show">
            
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-[#800020] text-xl font-black font-mono transition cursor-pointer"
            >
              ✕
            </button>

            <span className="text-[10px] font-mono font-black text-[#800020] bg-[#ffcc00]/20 px-3 py-1 rounded-full uppercase tracking-wider">
              {activeModal.catLabel} • {activeModal.num}
            </span>
            
            <h3 className="text-xl font-black text-[#800020] uppercase mt-3 tracking-wide leading-tight">
              {activeModal.name}
            </h3>

            <div className="mt-4 space-y-3">
              <div className="bg-[#f8f9fa] p-3.5 rounded-xl border border-[#e9ecef]">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-0.5">{text.modalBenefit}</h4>
                <p className="text-xs text-[#800020] font-black">{activeModal.benefit}</p>
              </div>

              <div className="bg-[#f8f9fa] p-3.5 rounded-xl border border-[#e9ecef]">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-zinc-500 mb-0.5">{text.modalDesc}</h4>
                <p className="text-xs text-zinc-700 font-medium leading-relaxed">{activeModal.desc}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#e9ecef] flex justify-end">
              <a 
                href={activeModal.url}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center bg-[#800020] text-[#ffcc00] text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-[#a61234] transition shadow-md"
              >
                {text.modalLinkText}
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
