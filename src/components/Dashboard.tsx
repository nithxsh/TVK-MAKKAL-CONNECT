import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, Language } from '../store/useStore';
import { SchemeCard } from './SchemeCard';
import { Share2, Volume2, FileText, ChevronRight } from 'lucide-react';
import tvkLogo from '../assets/tvk logo.jpg';

export const Dashboard: React.FC = () => {
  const { userProfile, resetProfile, authUser, setViewState } = useStore();
  const isEn = userProfile.language === 'en';
  const [dailyKms, setDailyKms] = useState(100);
  const displayName = authUser?.displayName || userProfile.name;

  // Filtering Logic
  const getEligibleSchemes = () => {
    const schemes: any[] = [];
    const age = userProfile.age;
    const annualIncome = userProfile.monthlyIncome * 12;
    const incomeQualified = annualIncome <= 500000;

    // RULE A: Global Age Override
    if (age >= 60) {
      return [
        {
          id: 'SEN_01',
          title: { en: 'Universal Senior Citizen Dignity Pension', ta: 'முதியோர் கண்ணிய ஓய்வூதியத் திட்டம்' },
          benefit: '₹3,000 / month',
          description: { en: 'Direct monthly financial payout to citizens above 60.', ta: '60 வயதிற்கு மேற்பட்ட குடிமக்களுக்கு நேரடி மாதாந்திர நிதியுதவி.' },
          checklist: ['Aadhaar Card', 'Ration Card', 'Bank Passbook'],
        },
        {
          id: 'SEN_02',
          title: { en: 'Destitute & Widow Livelihood Protection Net', ta: 'ஆதரவற்றோர் மற்றும் கைம்பெண்கள் வாழ்வாதாரக் காப்பு' },
          benefit: 'Special Grants + Training',
          description: { en: 'Specialized monthly cash assistance and vocational training grants.', ta: 'சிறப்பு மாதாந்திர பண உதவி மற்றும் தொழிற்பயிற்சி மானியங்கள்.' },
          checklist: ['Death Certificate of Spouse (if applicable)', 'Income Proof'],
        }
      ];
    }

    // RULE A: Disability Injection
    if (userProfile.isDifferentlyAbled) {
      schemes.push(
        {
          id: 'DIS_01',
          title: { en: 'Universal Caregiver Allowance & Enhanced Pension', ta: 'மாற்றுத்திறனாளிகள் ஊக்கத்தொகை மற்றும் பராமரிப்பு நிதியுதவி' },
          benefit: '₹5,000 / month',
          description: { en: 'Monthly security pension raised to ₹5,000 paired with caregiver subventions.', ta: 'மாற்றுத்திறனாளிகளுக்கான மாதாந்திர ஓய்வூதியம் ₹5,000 ஆக உயர்த்தப்பட்டு பராமரிப்பு நிதியுதவியும் வழங்கப்படும்.' },
          checklist: ['Disability ID Card', 'Medical Certificate'],
        },
        {
          id: 'DIS_02',
          title: { en: 'Accessible Tech Integration', ta: 'நவீன தொழில்நுட்ப உபகரணங்கள்' },
          benefit: 'Hardware + Mobility Tokens',
          description: { en: 'Access tokens for smart assistive mobility hardware and screen readers.', ta: 'ஸ்மார்ட் உதவி உபகரணங்கள் மற்றும் திரை வாசகர்களுக்கான அணுகல் டோக்கன்கள்.' },
          checklist: ['Disability ID Card'],
        }
      );
    }

    // RULE B: Job Sector Matrix
    if (userProfile.employment === 'student') {
      if (age <= 21) {
        schemes.push({
          id: 'STU_01',
          title: { en: 'Education Loan Interest Waiver', ta: 'கல்விக்கடன் வட்டித் தள்ளுபடித் திட்டம்' },
          benefit: 'Full Interest Absorption',
          description: { en: 'Protection from early financial debt for undergraduate students.', ta: 'பட்டம் பயிலும் மாணவர்களுக்கு ஆரம்பக்கால கடன் சுமையிலிருந்து பாதுகாப்பு.' },
          checklist: ['Student ID', 'Loan Sanction Letter'],
        });
        schemes.push({
          id: 'STU_02',
          title: { en: 'Advanced Tech Kit & Travel Assistance', ta: 'இலவச கணினி மற்றும் கட்டணமில்லாப் பேருந்துப் பயணம்' },
          benefit: 'Laptop + Travel Pass',
          description: { en: 'Distribution of high-end laptops and free transport for students.', ta: 'மாணவர்களுக்கு உயர்தர மடிக்கணினிகள் மற்றும் இலவச போக்குவரத்து வசதி.' },
          checklist: ['Student ID'],
        });
      } else if (age <= 25) {
        schemes.push({
          id: 'EMP_02',
          title: { en: 'Skill Placement & Employment Assistance', ta: 'திறன் மேம்பாட்டுப் பயிற்சி மற்றும் வேலைவாய்ப்பு உறுதி' },
          benefit: '₹10,000 / month Stipend',
          description: { en: 'Specialized industrial internships with active monthly stipends.', ta: 'மாதாந்திர உதவித்தொகையுடன் கூடிய சிறப்புத் தொழிற்துறை பயிற்சிகள்.' },
          checklist: ['Degree Certificate'],
        });
      }
    }

    if (userProfile.employment === 'unemployed_youth' && incomeQualified) {
      const desc = age <= 25 
        ? { en: 'Job-Hunting and Application Cost Stipend.', ta: 'வேலை தேடும் மற்றும் விண்ணப்பச் செலவுகளுக்கான உதவித்தொகை.' }
        : { en: 'Critical temporary Household Livelihood Support Cushion.', ta: 'குடும்ப வாழ்வாதாரத்திற்கான தற்காலிக பாதுகாப்பு நிதி.' };
      
      schemes.push({
        id: 'EMP_01',
        title: { en: 'Monthly Unemployment Allowance', ta: 'மாதாந்திர வேலைவாய்ப்பற்றோர் ஊக்கத்தொகை' },
        benefit: '₹4,000 / month',
        description: desc,
        checklist: ['Employment Exchange Card', 'Address Proof'],
      });
      schemes.push({
        id: 'EMP_02',
        title: { en: 'Skill Placement & Employment Assistance', ta: 'திறன் மேம்பாட்டுப் பயிற்சி மற்றும் வேலைவாய்ப்பு உறுதி' },
        benefit: 'Priority Placement',
        description: { en: 'Direct priority placement into state-linked industrial pipelines.', ta: 'அரசு சார்ந்த தொழில் நிறுவனங்களில் முன்னுரிமை வேலைவாய்ப்பு.' },
        checklist: ['Qualification Proof'],
      });
    }

    if (userProfile.employment === 'gig_worker') {
      schemes.push({
        id: 'GIG_01',
        title: { en: '₹20 Minimum Statutory Base Pay', ta: '₹20 குறைந்தபட்ச அடிப்படை ஊதியச் சட்டம்' },
        benefit: 'Flat ₹20/km Rate',
        description: { en: 'Legally mandated base rate to insulate livelihoods from fuel spikes.', ta: 'எரிபொருள் விலை உயர்விலிருந்து வாழ்வாதாரத்தைப் பாதுகாக்க சட்டபூர்வ அடிப்படை ஊதியம்.' },
        checklist: ['Delivery ID Card', 'Vehicle Documents'],
      });
      if (age <= 25) {
        schemes.push({
          id: 'GIG_03',
          title: { en: 'Anti-Algorithmic Target Exploitation Ban', ta: 'அல்காரிதம் சுரண்டல் தடை' },
          benefit: 'Target-Free Earnings',
          description: { en: 'Removal of predatory algorithmic pressure for young riders.', ta: 'இளம் ஊழியர்களுக்கான கட்டாய இலக்கு அழுத்தங்களிலிருந்து விடுதலை.' },
          checklist: ['Platform Registration Proof'],
        });
      } else {
        schemes.push({
          id: 'GIG_02',
          title: { en: 'Welfare Board Integration', ta: 'நல வாரிய ஒருங்கிணைப்பு' },
          benefit: 'Medical + Accident Cover',
          description: { en: 'Comprehensive insurance shields for gig worker families.', ta: 'ஆப் ஊழியர் குடும்பங்களுக்கான முழுமையான காப்பீட்டுப் பாதுகாப்பு.' },
          checklist: ['Welfare Board Card'],
        });
      }
    }

    if (userProfile.employment === 'active_farmer') {
      if (age <= 35) {
        schemes.push({
          id: 'AGR_02',
          title: { en: 'Free Agricultural Power & Subsidy Matrix', ta: 'இலவச விவசாய மின்சாரம் மற்றும் மானியத் திட்டம்' },
          benefit: '24/7 Power + Machinery Grant',
          description: { en: 'Focus on modern technology grants and advanced irrigation.', ta: 'நவீன தொழில்நுட்ப மானியங்கள் மற்றும் மேம்பட்ட நீர் பாசன வசதி.' },
          checklist: ['Land Documents', 'Farmer ID'],
        });
      } else {
        schemes.push({
          id: 'AGR_01',
          title: { en: 'Crop Insurance & MSP Guarantee', ta: 'பயிர்க் காப்பீடு மற்றும் குறைந்தபட்ச ஆதரவு விலை' },
          benefit: 'Legally Binding MSP',
          description: { en: 'Climate insulation and legally binding Minimum Support Price.', ta: 'பருவநிலை மாற்றப் பாதுகாப்பு மற்றும் சட்டபூர்வ குறைந்தபட்ச ஆதரவு விலை.' },
          checklist: ['Land Documents'],
        });
      }
    }

    // RULE C: Universal Household
    if (incomeQualified) {
      if (userProfile.maritalStatus === 'married') {
        schemes.push({
          id: 'HH_01',
          title: { en: 'Madhippumigu Magalir Thittam', ta: 'மதிப்புமிகு மகளிர் திட்டம்' },
          benefit: '₹2,500 / month',
          description: { en: 'Monthly family head grant for female empowerment.', ta: 'பெண்களுக்கு அதிகாரமளிக்க குடும்பத் தலைவிகளுக்கான மாதாந்திர உதவித்தொகை.' },
          checklist: ['Ration Card'],
        });
        schemes.push({
          id: 'HH_03',
          title: { en: 'Yearly 6 Free LPG Cylinders', ta: 'ஆண்டுக்கு 6 இலவச எரிவாயு சிலிண்டர்' },
          benefit: '6 Free Refills / Year',
          description: { en: 'Energy security for qualifying households.', ta: 'தகுதியுள்ள குடும்பங்களுக்கான எரிசக்தி பாதுகாப்பு.' },
          checklist: ['Gas Connection ID'],
        });
      } else {
        schemes.push({
          id: 'HH_02',
          title: { en: 'Upcoming Marriage Support (Annan Seer)', ta: 'வருங்கால திருமண நிதியுதவி (அண்ணன் சீர்)' },
          benefit: '1 Sovereign Gold + Silk Saree',
          description: { en: 'Direct support for upcoming marriage expenses.', ta: 'வருங்கால திருமணச் செலவுகளுக்கான நேரடி நிதியுதவி.' },
          checklist: ['Aadhaar Card', 'Age Proof'],
        });
      }
    }

    // Universal Green
    schemes.push({
      id: 'ENV_01',
      title: { en: 'Solar Rooftop Subvention', ta: 'சூரிய மின்தகடு மானியத் திட்டம்' },
      benefit: '70% Installation Subsidy',
      description: { en: 'Promoting green energy integration for households.', ta: 'வீடுகளுக்கு பசுமை ஆற்றல் கட்டமைப்பை ஊக்குவித்தல்.' },
      checklist: ['Electricity Bill'],
    });

    return schemes;
  };

  const eligibleSchemes = getEligibleSchemes();
  const annualIncome = userProfile.monthlyIncome * 12;
  const isLimitCrossed = annualIncome > 500000;

  return (
    <div className="bg-zinc-50 min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src={tvkLogo} 
              alt="TVK Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-lg border border-zinc-100"
            />
            <h1 className="text-tvk-maroon font-black uppercase tracking-tight text-base sm:text-lg">Makkal Connect</h1>
          </div>
          <div className="text-zinc-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 sm:gap-4">
            <button className="text-tvk-maroon hover:underline hidden xs:block">Support</button>
            <span className="w-1 h-1 bg-zinc-200 rounded-full hidden xs:block" />
            <span className="truncate max-w-[80px] sm:max-w-none">Built by INCOGNITO</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT PANEL: Profile Snapshot */}
          <div className="lg:col-span-4 space-y-8">
            <div className="card-floating animate-none p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-tvk-maroon/60">Citizen Profile</p>
                  <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">{displayName}</h2>
                </div>
                <div className="w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center text-xl">👤</div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-50">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase">Age</p>
                  <p className="text-sm font-black text-zinc-700">{userProfile.age} Yrs</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase">Status</p>
                  <p className="text-sm font-black text-zinc-700 truncate capitalize">{userProfile.employment.replace('_', ' ')}</p>
                </div>
              </div>

              {/* Income Screening Widget */}
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-4 relative overflow-hidden group">
                <div className="space-y-1 relative z-10">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase">Annual Household Income</p>
                  <p className={`text-xl font-black ${isLimitCrossed ? 'text-red-500' : 'text-tvk-maroon'}`}>
                    ₹{annualIncome.toLocaleString()}
                  </p>
                </div>
                
                {isLimitCrossed ? (
                  <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100">
                    ⚠️ Income Limit Crossed
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-green-100">
                    ✅ Eligibility Verified
                  </div>
                )}

                <div className="pt-2 text-[9px] font-mono font-bold text-tvk-maroon/40 uppercase tracking-wider relative z-10">
                  📊 Analytics Logic & Core R&D // Incognito Labs
                </div>
              </div>

              <button 
                onClick={resetProfile}
                className="w-full py-4 text-zinc-400 hover:text-tvk-maroon text-[10px] font-black uppercase tracking-[0.2em] border-t border-zinc-50 transition"
              >
                ← Restart Evaluation
              </button>
            </div>

            {/* Gig Worker Calculator */}
            {userProfile.employment === 'gig_worker' && (
              <div className="card-floating animate-none p-8 bg-tvk-maroon text-white border-none space-y-6">
                <div className="space-y-1">
                  <p className="text-tvk-yellow text-[10px] font-black uppercase tracking-widest">Mileage Earnings Booster</p>
                  <h3 className="text-xl font-black uppercase leading-none">Profit Gain <br/>Engine</h3>
                </div>

                <div className="space-y-4">
                  <input 
                    type="range" min="20" max="200" step="10" value={dailyKms}
                    onChange={(e) => setDailyKms(Number(e.target.value))}
                    className="w-full accent-tvk-yellow h-1 bg-white/10 rounded-full"
                  />
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                    <span>20 KM</span>
                    <span>{dailyKms} KM / Day</span>
                    <span>200 KM</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <p className="text-[9px] font-bold uppercase opacity-50 mb-1">Estimated Daily Profit Gain</p>
                  <p className="text-3xl font-black text-tvk-yellow">+₹{(dailyKms * (20 - 11.5)).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Schemes Grid */}
          <div className="lg:col-span-8 space-y-10">
            {/* Welfare Pass Banner */}
            <div className="bg-white border-2 border-tvk-yellow rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl shadow-tvk-yellow/5">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-tvk-maroon text-tvk-yellow rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">🪪</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-zinc-900 uppercase tracking-tight leading-tight">Your Digital Welfare Pass</h3>
                  <p className="text-zinc-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">
                    {eligibleSchemes.length} Guaranteed Entitlements Found
                  </p>
                </div>
              </div>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 sm:px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
                <Share2 size={16} />
                Share on WhatsApp
              </button>
            </div>

            {/* Welcome & Audio */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tight">
                  {isEn ? `Welcome, ${displayName.split(' ')[0]}!` : `வணக்கம், ${displayName.split(' ')[0]}!`}
                </h2>
                <button className="w-10 h-10 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center transition hover:bg-tvk-maroon hover:text-tvk-yellow">
                  <Volume2 size={18} />
                </button>
              </div>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibleSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} isEn={isEn} />
              ))}
            </div>

            {/* Absolute End Button */}
            <div className="pt-12 flex justify-center">
              <button 
                onClick={() => setViewState('manifesto')}
                className="px-12 py-5 rounded-full border-2 border-tvk-maroon text-tvk-maroon font-black uppercase tracking-[0.2em] text-[10px] transition hover:bg-tvk-maroon hover:text-white group"
              >
                {isEn ? '📋 All Manifesto Modules' : '📋 அனைத்து கொள்கை விளம்பரம்'}
                <ChevronRight size={14} className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
