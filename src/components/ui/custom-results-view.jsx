import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WelfareCard from './welfare-card';

export default function CustomResultsView({ profileData }) {
  // Destructuring onboarding parameters from user state
  const { name, employment, workingStatus, income, language } = profileData;
  const [distance, setDistance] = useState(60); // Default 60km slider scale

  const isEn = language === 'en';

  // Resolving gig worker check dynamically based on the exact wizard string or generic status
  const isGigWorker = employment === 'gig_worker' || workingStatus === 'gig_worker';
  const isStudent = employment === 'student';
  const isUnemployed = employment === 'unemployed';
  const displayStatus = employment || workingStatus;

  // Math variables for the dynamic Gig Calculator
  const currentRateAvg = 11.5; 
  const tvkMandateRate = 20;   
  const currentEarnings = Math.round(distance * currentRateAvg);
  const tvkEarnings = Math.round(distance * tvkMandateRate);
  const dailyGain = tvkEarnings - currentEarnings;

  // Animation variants configuration for anti-gravity feel
  const cardAnimation = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 14 }
    }
  };

  return (
    <div className="bg-white py-10 px-4 max-w-5xl mx-auto animate-fadeIn">
      
      {/* 👤 PERSONALIZED WELCOME BANNER */}
      <div className="text-center mb-10 border-b border-zinc-100 pb-6">
        <h2 className="text-2xl font-black text-[#800020] uppercase tracking-wide">
          {isEn ? `WELCOME, ${name || 'USER'}!` : `வணக்கம், ${name || 'நண்பரே'}!`}
        </h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-1">
          {isEn 
            ? "Localized updates have been uniquely filtered to match your profile parameters."
            : "உங்களின் சுயவிவர அளவுகோல்களுக்குப் பொருந்தக்கூடிய பிரத்தியேக நலத்திட்டங்கள் துல்லியமாகப் பிரித்தெடுக்கப்பட்டுள்ளன."}
        </p>
      </div>

      <WelfareCard profileData={profileData} />

      {/* ========================================================================= */}
      {/* CONDITIONAL BLOCK 1: GIG WORKER PROFILE LOGIC (True match rendering paths) */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* CONDITIONAL BLOCK 1: GIG WORKER PROFILE LOGIC (True match rendering paths) */}
      {/* ========================================================================= */}
      {isGigWorker && (
        <div className="space-y-12">
          
          {/* 📊 THE MANDATED KM CALCULATOR (Renders ONLY for gig workers) */}
          <motion.div 
            variants={cardAnimation} initial="hidden" animate="visible"
            className="bg-[#f8f9fa] border-2 border-[#e9ecef] rounded-3xl p-6 max-w-2xl mx-auto shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-4 bg-[#ffcc00] inline-block rounded-sm"></span>
              <h4 className="text-xs font-black text-[#800020] uppercase tracking-wider">
                {isEn ? "Gig Workers Mileage Earnings Booster Calculator" : "ஆப் ஊழியர்களுக்கான கிலோமீட்டர் ஊதியக் கணக்கீட்டுப் பலகை"}
              </h4>
            </div>
            <p className="text-[11px] text-zinc-600 mb-4 font-bold">
              {isEn ? "Adjust the range slider to view your dynamic income differences:" : "உங்களின் தினசரி பயணத் தூரத்தை மாற்றி, கூடுதல் வருவாய் மாற்றத்தைக் கணக்கிடுங்கள்:"}
            </p>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono font-bold text-zinc-500 uppercase">
                <span>20 km</span>
                <span className="text-[#800020] font-black">{distance} KM</span>
                <span>200 km</span>
              </div>
              
              <input 
                type="range" min="20" max="200" step="5" value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-[#ffcc00] bg-zinc-200 h-2 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono font-bold text-center">
                <div className="bg-white border border-[#e9ecef] p-3 rounded-xl">
                  <span className="text-zinc-400 text-[9px] block mb-0.5">{isEn ? "CURRENT MARKET RATE (Avg)" : "தற்போதைய சந்தை ஊதிய வீதம் (சராசரி)"}</span>
                  <span className="text-zinc-500 line-through text-base">₹{currentEarnings}</span>
                </div>
                <div className="bg-[#ffcc00]/10 border border-[#ffcc00]/40 p-3 rounded-xl">
                  <span className="text-[#800020] text-[9px] block mb-0.5">{isEn ? "PROPOSED TVK MANDATE (Flat ₹20/KM)" : "பரிந்துரைக்கப்படும் சட்டப்பூர்வ ஊதியம் (₹20/கி.மீ)"}</span>
                  <span className="text-[#800020] font-black text-base">₹{tvkEarnings}</span>
                </div>
              </div>

              <div className="bg-[#800020] text-[#ffcc00] text-center p-3 rounded-xl text-xs font-mono font-bold uppercase tracking-widest animate-float">
                {isEn ? `📈 Daily Income Profit: +₹${dailyGain} / Per Day Extra Earning` : `📈 தினசரி கூடுதல் லாபம்: +₹${dailyGain} / நாள் ஒன்றுக்கு`}
              </div>
            </div>
          </motion.div>

          {/* 📜 DEEP DIVE SCHEME POINTS */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-black text-[#800020] uppercase mt-2">
                📦 {isEn ? "Complete Gig Economy Protection Charter" : "ஆப் ஊழியர்கள் பாதுகாப்புச் சாசனம்"}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Point 1 */}
              <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h5 className="text-xs font-black text-[#800020] uppercase tracking-wide">
                    {isEn ? "₹20 Minimum Statutory Base Pay" : "₹20 குறைந்தபட்ச சட்டப்பூர்வ ஊதியம்"}
                  </h5>
                  <p className="text-zinc-600 text-xs font-bold mt-2 leading-relaxed">
                    {isEn ? "Legally establishes a mandatory base rate of ₹20 per kilometer for all delivery partners and transit drivers, completely insulating daily livelihoods from volatile fuel price spikes." : "வழங்குநர்கள் மற்றும் ஓட்டுநர்களின் வாழ்வாதாரத்தை எரிபொருள் விலை உயர்விலிருந்து பாதுகாக்கும் பொருட்டு, ஒரு கிலோமீட்டருக்குக் குறைந்தபட்சம் ₹20 நிலையான ஊதியம் சட்டபூர்வமாக உறுதி செய்யப்படும்."}
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h5 className="text-xs font-black text-[#800020] uppercase tracking-wide">
                    {isEn ? "Unorganised Workers Welfare Board Integration" : "தமிழ்நாடு நலவாரியப் பாதுகாப்புத் திட்டம்"}
                  </h5>
                  <p className="text-zinc-600 text-xs font-bold mt-2 leading-relaxed">
                    {isEn ? "Enables automatic registration into the State Welfare Board network, guaranteeing comprehensive accident insurance, medical claim structures, and old-age safety pensions." : "அனைத்து ஆப் ஊழியர்களையும் நலவாரியக் கட்டமைப்பின் கீழ் அதிகாரப்பூர்வமாகப் பதிவு செய்து, மருத்துவக் காப்பீடு, விபத்து நிவாரணம் மற்றும் முதியோருக்கான ஓய்வூதியத் திட்டங்கள் தங்கு தடையின்றி வழங்க வழிவகை செய்யப்படும்."}
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h5 className="text-xs font-black text-[#800020] uppercase tracking-wide">
                    {isEn ? "Anti-Algorithmic Target Exploitation Ban" : "அல்காரிதம் சுரண்டல் மற்றும் இலக்கு அழுத்த ஒழிப்பு"}
                  </h5>
                  <p className="text-zinc-600 text-xs font-bold mt-2 leading-relaxed">
                    {isEn ? "Strictly prohibits predatory algorithms that enforce high-pressure delivery windows, ensuring workplace safety and reducing mental and physical stress on the road." : "குறுகிய நேர விநியோக இலக்குகளை நிர்ணயித்து ஊழியர்களைக் கட்டாயப்படுத்தும் அல்காரிதம் முறைகள் முற்றிலுமாகத் தடை செய்யப்பட்டு, மன அழுத்தமற்ற பாதுகாப்பான பணிச்சூழல் சட்டம் மூலம் ஒழுங்குபடுத்தப்படும்."}
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <div>
                  <h5 className="text-xs font-black text-[#800020] uppercase tracking-wide">
                    {isEn ? "ID Suspension Protection Framework" : "தன்னிச்சையான கணக்கு முடக்கத்திற்கு எதிரான சட்டப் பாதுகாப்பு"}
                  </h5>
                  <p className="text-zinc-600 text-xs font-bold mt-2 leading-relaxed">
                    {isEn ? "Mandates a multi-tier legal arbitration committee review before corporate platforms can unilaterally suspend or block a worker's digital terminal access ID." : "நிறுவனங்கள் தன்னிச்சையாக ஊழியர்களின் அடையாள அட்டையையோ அல்லது கணக்கையோ முடக்கக் கூடாது. முறையான விசாரணைக் குழுவின் ஆய்வுக்குப் பிறகே இறுதி முடிவுகள் எடுக்கப்பட வேண்டும் என்ற விதிமுறை அமல்படுத்தப்படும்."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}



      {/* ========================================================================= */}
      {/* CONDITIONAL BLOCK: UNEMPLOYED YOUTH TRACK RESULTS */}
      {/* ========================================================================= */}
      {isUnemployed && (
        <div className="space-y-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white border-2 border-[#e9ecef] p-6 rounded-3xl shadow-sm">
              <h5 className="text-sm font-black text-[#800020] uppercase tracking-wide">
                {isEn ? "Monthly Unemployment Allowance (₹4,000/mo)" : "மாதாந்திர வேலைவாய்ப்பற்றோர் ஊக்கத்தொகை (₹4,000)"}
              </h5>
              <p className="text-zinc-600 text-xs font-bold mt-3 leading-relaxed">
                {isEn ? "Provides a direct financial stipend of ₹4,000 per month to eligible unemployed graduates to support livelihood costs while undergoing training or job placements." : "தகுதிவாய்ந்த பட்டதாரி இளைஞர்களுக்கு வேலை தேடும் காலத் தேவைகளுக்காகவும், வாழ்வாதாரத்திற்காகவும் மாதம் ₹4,000 நேரடி உதவித்தொகையாக வழங்கப்படும்."}
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white border-2 border-[#e9ecef] p-6 rounded-3xl shadow-sm">
              <h5 className="text-sm font-black text-[#800020] uppercase tracking-wide">
                {isEn ? "Skill Placement & Employment Assistance" : "திறன் மேம்பாட்டுப் பயிற்சி மற்றும் வேலைவாய்ப்பு உறுதி"}
              </h5>
              <p className="text-zinc-600 text-xs font-bold mt-3 leading-relaxed">
                {isEn ? "Offers specialized industrial skill training with an additional monthly stipend of ₹10,000 during the active internship period, ensuring direct placement pipelines." : "தொழில்நுட்ப மற்றும் தொழில்முறைப் பயிற்சிகளை இலவசமாக வழங்குவதோடு, பயிற்சி்க் காலத்தில் மாதம் ₹10,000 பயிற்சி ஊதியமாக வழங்கி, நேரடி வேலைவாய்ப்புக்கான வழிகள் உருவாக்கப்படும்."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONDITIONAL BLOCK 2: NON-GIG WORKER GENERAL RENDERING PATHS              */}
      {/* ========================================================================= */}
      {!isGigWorker && displayStatus && (
        <div className="text-center py-12 max-w-lg mx-auto space-y-4">
          <div className="text-3xl mb-4">🌾</div>
          <h4 className="text-sm font-black text-[#800020] uppercase tracking-wider">
            {isEn 
              ? "UNIVERSAL & SECTORAL WELFARE MATRICES ENABLED"
              : "அனைத்துத் துறை பொது நலத்திட்டங்கள் செயல்பாட்டில் உள்ளன"}
          </h4>
          <p className="text-zinc-600 text-xs font-bold leading-relaxed">
            {isEn
              ? "Your profile status as an Unemployed Youth / Job Seeker has been successfully verified and registered. The system dynamically processes direct budget allocations and government welfare benefits tailored specifically to your demographic criteria, rendering a streamlined results layout. Since you did not select the gig worker profile, the distance-based mileage rate calculator and numerical tracking dashboards have been automatically bypassed to ensure your console remains clean, optimized, and concise."
              : "வேலைவாய்ப்பற்ற இளைஞர் / வேலை தேடுபவர் என்ற உங்களின் தற்போதைய நிலை வெற்றிகரமாகப் பதிவு செய்யப்பட்டுள்ளது. உங்களுக்கான நேரடி அரசு நிதி ஒதுக்கீடுகள் மற்றும் மக்கள் நலத்திட்டங்கள் துல்லியமாக ஆய்வு செய்யப்பட்டு, இந்தத் தனிப்பயனாக்கப்பட்ட பக்கத்தில் காண்பிக்கப்படுகின்றன. நீங்கள் 'ஆப் ஊழியர்' (Gig Worker) பிரிவைத் தேர்ந்தெடுக்காததால், தூரக் கணக்கீட்டுப் பலகை மற்றும் அதற்கான வரைபடத் தரவுகள் உங்கள் திரையிலிருந்து தானியங்கி முறையில் நீக்கப்பட்டு, தளம் எளிமைப்படுத்தப்பட்டுள்ளது."}
          </p>
        </div>
      )}

    </div>
  );
}
