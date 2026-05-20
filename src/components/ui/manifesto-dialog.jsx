import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

const FULL_MANIFESTO_DATA = [
  {
    category: "👩🦰 Magalir Nalam (Women's Welfare)",
    points: [
      { text: "Madhippumigu Magalir Thittam moolama monthly ₹2,500 direct bank transfer to all women heads of families.", highlight: "₹2,500 / Month" },
      { text: "Annapoorani Scheme valiya 6 free LPG cylinders every single year low-income families-uku allocation.", highlight: "6 Free Cylinders" },
      { text: "Annan Seer Thittam moolama basic poor family brides-uku wedding aid ah one sovereign gold and premium traditional silk saree.", highlight: "1 Sovereign Gold" },
      { text: "Government hospitals-la porakura newborn baby integration welcome kit with a specialized gold ring for infants.", highlight: "Newborn Gold Ring" },
      { text: "Absolute free travel privileges across all state-owned government public transit buses completely extended." }
    ]
  },
  {
    category: "🧑💻 Ilaiyor & Velaivaippu (Youth & Jobs)",
    points: [
      { text: "Namadhu Ooril Namakae Velaivaippu rule padi private sector-la local TN native youth-uku strict 75% hiring quota mandate.", highlight: "75% Local Jobs" },
      { text: "Unemployment survival allowance for registered job-seekers: Graduates-uku ₹4,000/month, Diploma/ITI holders-uku ₹2,500/month.", highlight: "Up to ₹4,000/Month" },
      { text: "Vettri Skill Training Assurance project lower base structure-la 5 Lakh state-funded corporate internships with stipend support.", highlight: "5 Lakh Internships" },
      { text: "Mudhalvar Makkal Sevai Nanbar system valiya doorstep delivery frameworks handling processing-uku 5 Lakh jobs starting at ₹18,000/month.", highlight: "5 Lakh Govt Jobs" },
      { text: "TNPSC, TRB, TNEB state recruitment processes-ah notification-lerundhu final placement varai strictly 365 days kulla mudika legal ceiling." }
    ]
  },
  {
    category: "🌾 Vivasayigal & Tholilalargal (Farmers & Workers)",
    points: [
      { text: "Landless agricultural laborers support tracking framework moolama dry seasons-la baseline dynamic aid transfer of ₹10,000 per year.", highlight: "₹10,000 / Year" },
      { text: "Anganwadi workers, social welfare coordinators, and ground health staff salary elevated to a mandatory minimum baseline of ₹18,000/month.", highlight: "₹18,000 Base Salary" },
      { text: "Traditional handloom and powerloom weavers protection structural security setup with dedicated e-commerce direct market lines." }
    ]
  },
  {
    category: "🎓 Kalvi & Maruthuvam (Education & Healthcare)",
    points: [
      { text: "Absolute abolition of NEET within the state lines by pushing education from the concurrent catalog directly back into the State List." },
      { text: "Establishment of 100 Kamarajar Special Residential Schools tracking absolute corporate level quality free public boarding blocks." },
      { text: "Universal Healthcare Cover program scaling state medical insurance caps up to a maximum threshold allocation of ₹25 Lakhs per family.", highlight: "₹25 Lakh Insurance" },
      { text: "Entire schooling and college degrees entirely Tamil Medium-la mudikura students-uku state government employment recruitment-la high priority quota." }
    ]
  },
  {
    category: "🏛️ Nirvagam & Poruladharam (Governance & Economy)",
    points: [
      { text: "Domestic home single/three-phase electrical consumer lines-uku 200 units absolute free waiver allocation cycle.", highlight: "200 Units Free EB" },
      { text: "State administrative decentralization process base-la single operational segment macro-secretariat branch building in Madurai." },
      { text: "Tamil Nadu state macro-economic asset capability pipeline expansion targeting a massive $1.5 Trillion milestone by 2036.", highlight: "$1.5T Target Economy" },
      { text: "Small business recovery fund corpus mapping ₹15,000 Crores credit baseline support to bail out struggling MSMEs.", highlight: "₹15,000 Cr MSME Fund" },
      { text: "Strict drug-free enforcement protocol setup tracking campus level youth protection security squads state-wide." }
    ]
  }
];

export function ManifestoDialog({ open, onOpenChange }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-[9999] bg-[#0a0005]/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        {/* Modal Content Box */}
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[10000] w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl border-2 border-[#e9ecef] shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 animate-dialog-show">
          
          {/* Close button */}
          <DialogPrimitive.Close className="absolute top-5 right-5 w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-[#800020] hover:border-[#800020]/25 transition bg-white/90 z-20 focus:outline-none">
            <XIcon className="w-4 h-4" />
          </DialogPrimitive.Close>

          {/* Heading */}
          <div className="text-center mb-8 pr-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#800020] uppercase tracking-tight">
              📋 Full Manifesto Resolution Core
            </h2>
            <h3 className="text-xs text-zinc-500 font-black uppercase tracking-widest mt-1">
              முழு தேர்தல் அறிக்கை • TVK Core Manifesto
            </h3>
            <div className="w-16 h-1 bg-[#ffcc00] mx-auto mt-3 rounded-full" />
          </div>

          {/* 2-Column Manifesto Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FULL_MANIFESTO_DATA.map((section, idx) => (
              <div 
                key={idx} 
                className="bg-[#f8f9fa] border border-[#e9ecef] rounded-2xl p-5 hover:border-[#800020]/20 transition shadow-sm"
              >
                <h4 className="text-sm font-black text-[#800020] uppercase tracking-wide border-b border-zinc-200 pb-2 mb-3">
                  {section.category}
                </h4>

                <ul className="space-y-3.5">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-2 items-start group">
                      <span className="text-[#ffcc00] text-xs mt-0.5 select-none transition-transform group-hover:scale-125">★</span>
                      <div className="text-xs text-zinc-700 font-semibold leading-relaxed">
                        {point.text}
                        
                        {point.highlight && (
                          <span className="inline-block bg-[#ffcc00] text-[#1a1a1a] text-[9px] font-black px-2 py-0.5 rounded ml-1.5 uppercase tracking-wide shadow-sm">
                            {point.highlight}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclaimer Footer */}
          <div className="mt-8 bg-[#800020]/5 border border-[#800020]/10 rounded-2xl p-4 text-center text-[10px] text-zinc-500 font-semibold">
            *Indha points yellame official manifesto data models basic structures scale panni calculate panna guide map parameters mattum dhaan.
          </div>

        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
