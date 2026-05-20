import React, { useState, useCallback, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { SimpleHeader } from '@/components/ui/simple-header';
import { FlagReveal } from '@/components/ui/flag-reveal';
import { LoginPanel } from '@/components/ui/login-panel';
import CustomResultsView from '@/components/ui/custom-results-view';
import { ManifestoDialog } from '@/components/ui/manifesto-dialog';
import MasterDashboard from '@/components/MasterDashboard';
import { PremiumOnboarding } from '@/components/ui/premium-onboarding';

// Firebase Configurations
const firebaseConfig = {
  apiKey: "AIzaSyA9nmUi0LUKrTJrT2433abld2u2nBBypV0",
  authDomain: "tvk-makkal-connect.firebaseapp.com",
  projectId: "tvk-makkal-connect",
  storageBucket: "tvk-makkal-connect.firebasestorage.app",
  messagingSenderId: "961386023162",
  appId: "1:961386023162:web:dceb1fe16413b6f7cae143"
};
let firebaseApp, auth, googleProvider;
try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  googleProvider = new GoogleAuthProvider();
} catch (e) {
  console.warn("Firebase initialization failed, utilizing secure local Mock Auth fallback.");
}

/* ─── SCHEMES DATA ────────────────────────────────────────────────── */
const SCHEMES = [
  {
    id: 'TVK-MAGALIR',
    title: 'Madhippumigu Magalir Thittam',
    titleTa: 'மதிப்புமிகு மகளிர் திட்டம்',
    benefit: '₹2,500 / Month — Direct Bank Transfer',
    annualCap: 500000,
    checklist: ['Smart Ration Card (Colour)', 'Tahsildar Income Certificate ≤ ₹5L/yr', 'Aadhaar linked bank passbook', 'Age proof (under 60)', 'TN domicile certificate'],
    siteName: 'TN e-Sevai Portal',
    siteUrl: 'https://tnesevai.tn.gov.in',
  },
  {
    id: 'TVK-ANNAN',
    title: 'Annan Seer Thittam',
    titleTa: 'அண்ணன் சீர் திட்டம்',
    benefit: '1 Sovereign Gold + Silk Saree Aid',
    annualCap: 500000,
    checklist: ['Ration card with family member details', 'Marriage registration proof', 'Income certificate (borderline ≤ ₹5L)', 'Bank account in bride\'s name'],
    siteName: 'TN e-Sevai Portal',
    siteUrl: 'https://tnesevai.tn.gov.in',
  },
  {
    id: 'TVK-YOUTH',
    title: 'Youth Unemployment Allowance',
    titleTa: 'இளையோர் உதவித்தொகை',
    benefit: '₹4,000 (Graduates) / ₹2,500 (Diploma & ITI)',
    annualCap: null,
    checklist: ['TN Employment Exchange registration card', 'Degree / Diploma / ITI certificate', 'Age proof (18-35)', 'Bank passbook', 'Aadhaar card'],
    siteName: 'TN Employment Dept',
    siteUrl: 'https://tnvelaivaaippu.gov.in',
  },
  {
    id: 'TVK-LPG',
    title: 'Yearly 6 Free LPG Cylinders Scheme',
    titleTa: 'ஆண்டுக்கு 6 இலவச எரிவாயு சிலிண்டர் திட்டம்',
    benefit: '6 Free Subsidized Cylinders / Year',
    description: 'Provides 6 completely subsidized, free domestic LPG cooking gas cylinders per year directly to eligible households to shield family monthly budgets from inflation and rising fuel costs.',
    descriptionTa: 'விலைவாசி உயர்வு மற்றும் சமையல் எரிவாயு விலை ஏற்றத்திலிருந்து குடும்பங்களின் மாதாந்திர பட்ஜெட்டைப் பாதுகாக்கும் பொருட்டு, தகுதிவாய்ந்த குடும்பங்களுக்கு ஆண்டுதோறும் 6 உள்நாட்டு சமையல் எரிவாயு சிலிண்டர்கள் முற்றிலும் இலவசமாக வழங்கப்படும்.',
    annualCap: 500000,
    checklist: ['Smart Ration Card (Active)', 'Aadhaar Card Linked with Gas Agency', 'Income certificate (≤ ₹5L/yr)'],
    siteName: 'TN Civil Supplies',
    siteUrl: 'https://tnpds.gov.in',
    vectorIcon: true
  },
  {
    id: 'TVK-HEALTH',
    title: 'Universal Comprehensive Health Insurance Net',
    titleTa: 'அனைவருக்குமான விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    benefit: '₹10 Lakhs Annual Medical Cover',
    description: 'Ensures absolute financial protection against medical emergencies with a ₹10,00,000 comprehensive cashless health insurance cover per family per year.',
    descriptionTa: 'ஒவ்வொரு குடும்பத்திற்கும் ஆண்டுக்கு ₹10,00,000 மதிப்பிலான முழுமையான பணமில்லா மருத்துவக் காப்பீடு வழங்கப்பட்டு, அவசர மருத்துவச் செலவுகளில் இருந்து முழுமையான நிதிப் பாதுகாப்பு உறுதி செய்யப்படும்.',
    annualCap: 500000,
    checklist: ['Smart Ration Card', 'Aadhaar Card', 'Income Certificate (≤ ₹5L/yr)', 'Passport size photographs'],
    siteName: 'TN Health Dept',
    siteUrl: 'https://cmchistn.com',
    vectorIcon: true
  }
];

const MORPH_WORDS = [
  'Makkal Connect', 'மக்கள் கனெக்ட்',
  'Empowerment', 'உரிமை',
  'Unity', 'ஒற்றுமை',
  'Welfare Guidance', 'வளர்ச்சி',
];

/* ─── SCHEME CARD ─────────────────────────────────────────────────── */
function SchemeCard({ scheme, eligible, language }) {
  const [expanded, setExpanded] = useState(false);
  const highlight = eligible && (scheme.annualCap === null || eligible);
  const isTa = language === 'ta';

  return (
    <div className={`bg-white border-2 rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group
      ${highlight ? 'border-[#ffcc00] ring-2 ring-[#ffcc00]/20 bg-gradient-to-br from-white to-[#ffcc00]/5' : 'border-[#e9ecef] hover:border-[#800020]/30'}`}>

      {highlight && (
        <span className="absolute top-0 right-0 bg-[#ffcc00] text-[#1a1a1a] text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-bl-xl z-10">
          ✅ Eligible Track
        </span>
      )}

      {/* NEW: Optional Vector Header */}
      {scheme.vectorIcon && (
        <div className="w-full bg-gradient-to-r from-[#f8f9fa] to-[#fff] rounded-2xl h-28 mb-5 flex items-center justify-center overflow-hidden relative border border-[#e9ecef]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffcc00] via-transparent to-transparent"></div>
          {/* Continuous vertical floating loop */}
          <div className="animate-[bounce_3s_infinite] drop-shadow-md z-10 text-[#800020]">
            {scheme.id === 'TVK-LPG' ? (
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 6h10M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M8 6h8a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2z"/>
                <path d="M9 13h6"/>
                <path d="M12 10v6"/>
              </svg>
            ) : scheme.id === 'TVK-HEALTH' ? (
              <span className="text-4xl">🏥</span>
            ) : (
              <span className="text-4xl">🎁</span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h3 className="text-lg font-black text-[#800020] uppercase tracking-wide">{isTa && scheme.titleTa ? scheme.titleTa : scheme.title}</h3>
          <p className="text-xs text-zinc-500 font-bold mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] inline-block" />{isTa ? scheme.title : scheme.titleTa}
          </p>
        </div>
        <span className="bg-[#f8f9fa] border border-[#e9ecef] text-zinc-500 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg shrink-0">{scheme.id}</span>
      </div>

      {/* NEW: Optional Description block */}
      {scheme.description && (
        <p className="text-[11px] font-bold text-zinc-600 mt-4 leading-relaxed bg-[#800020]/5 p-3.5 rounded-xl border-l-2 border-[#800020]">
          {isTa && scheme.descriptionTa ? scheme.descriptionTa : scheme.description}
        </p>
      )}

      <div className="bg-[#f8f9fa] border border-[#e9ecef] p-4 rounded-2xl mt-4 flex items-center justify-between gap-4 group-hover:border-[#ffcc00]/40 transition-colors">
        <div>
          <p className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">🎁 Benefit</p>
          <p className="text-sm font-extrabold text-[#800020] mt-0.5">{scheme.benefit}</p>
        </div>
        <span className="text-2xl group-hover:scale-110 transition-transform">💰</span>
      </div>

      {/* EXPANDABLE CHECKLIST */}
      {highlight && (
        <div className="mt-4">
          <button
            onClick={() => setExpanded(v => !v)}
            className="text-[11px] font-black text-[#800020] uppercase tracking-wider flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            📋 Document Checklist {expanded ? '▲' : '▼'}
          </button>
          {expanded && (
            <ul className="mt-3 space-y-2 animate-fadeIn">
              {scheme.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-700 font-semibold">
                  <span className="text-[#ffcc00] font-black mt-0.5">→</span>{item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-5 pt-5 border-t border-[#e9ecef] flex justify-end">
        <a
          href={scheme.siteUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-shimmer text-[#1a1a1a] text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl transition active:scale-95 whitespace-nowrap"
        >
          Apply @ {scheme.siteName} →
        </a>
      </div>
    </div>
  );
}


/* ─── UNIVERSAL CARD ──────────────────────────────────────────────── */
function UniversalCard({ titleEn, titleTa, descEn, descTa, icon, language, link }) {
  const isTa = language === 'ta';
  return (
    <div className="bg-white border-2 border-[#e9ecef] p-6 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group hover:border-[#800020]/30">
      <div className="w-full bg-gradient-to-r from-[#f8f9fa] to-[#fff] rounded-2xl h-28 mb-5 flex items-center justify-center overflow-hidden relative border border-[#e9ecef]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffcc00] via-transparent to-transparent"></div>
        <div className="animate-[bounce_3s_infinite] drop-shadow-md z-10 text-4xl">{icon}</div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h3 className="text-lg font-black text-[#800020] uppercase tracking-wide">
            {isTa ? titleTa : titleEn}
          </h3>
          <p className="text-xs text-zinc-500 font-bold mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] inline-block" />
            {isTa ? titleEn : titleTa}
          </p>
        </div>
      </div>
      <p className="text-[11px] font-bold text-zinc-600 mt-4 leading-relaxed bg-[#800020]/5 p-3.5 rounded-xl border-l-2 border-[#800020]">
        {isTa ? descTa : descEn}
      </p>
      <div className="mt-5 pt-5 border-t border-[#e9ecef] flex justify-end">
        <a href={link || "https://tnesevai.tn.gov.in"} target="_blank" rel="noreferrer" className="btn-shimmer text-[#1a1a1a] text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl transition active:scale-95 whitespace-nowrap inline-block">
          {isTa ? "விண்ணப்பிக்க TN E-Sevai Portal →" : "Apply @ TN E-Sevai Portal →"}
        </a>
      </div>
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────── */
export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [view, setView] = useState('welfare'); // 'welfare', 'manifesto', or 'login'
  const [dailyKms, setDailyKms] = useState(100);

  const [gateCompleted, setGateCompleted] = useState(() => {
    return localStorage.getItem('tvk_gate') === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tvk_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('tvk_profile');
    return saved ? JSON.parse(saved) : {
      name: '', age: '', mobile: '', income: '', workingStatus: 'unemployed', language: 'en'
    };
  });
  
  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem('tvk_profile');
    return saved ? (JSON.parse(saved).income || '') : '';
  });

  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    localStorage.setItem('tvk_gate', gateCompleted);
  }, [gateCompleted]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('tvk_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tvk_profile', JSON.stringify(profileData));
  }, [profileData]);

  const handleRevealDone = useCallback(() => setRevealed(true), []);

  const handleGoogleLogin = async () => {
    try {
      if (auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
        setProfileData(prev => ({ ...prev, name: result.user.displayName || '' }));
        setShowOnboarding(true);
      } else {
        throw new Error("No Auth initialized");
      }
    } catch (error) {
      console.warn("Firebase Auth bypassed. Launching premium Mock Auth.");
      const mockGoogleUser = {
        displayName: "Thalapathy Vijay",
        email: "vijay.anna@tvk.org",
        photoURL: "/vijay_anna.png"
      };
      setUser(mockGoogleUser);
      setProfileData(prev => ({ ...prev, name: mockGoogleUser.displayName }));
      setShowOnboarding(true);
    }
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    setShowOnboarding(false);
    setIncome(profileData.income);
  };

  const monthly = Number(income);
  const annual = monthly * 12;
  const isEligible = monthly > 0 && annual <= 500000;
  const isLimitCrossed = monthly > 0 && annual > 500000;
  
  const currentStatus = profileData.employment || profileData.workingStatus || '';
  const isStudent = currentStatus === 'student';
  const isUnemployed = currentStatus === 'unemployed' || currentStatus === 'unemployed_youth';
  const isGigWorker = currentStatus === 'gig_worker';
  const isFarmer = currentStatus === 'farmer' || currentStatus === 'active_farmer';
  const isFisherman = currentStatus === 'fisherman';
  const isWeaver = currentStatus === 'weaver';
  const isPrivate = !isStudent && !isUnemployed && !isGigWorker && !isFarmer && !isFisherman && !isWeaver;

  const age = Number(profileData.age) || 0;
  const isSenior = age >= 60;
  const isDifferentlyAbled = profileData.isDifferentlyAbled === true;

  const displaySchemes = isLimitCrossed 
    ? SCHEMES.filter(s => s.annualCap === null || s.annualCap > 500000)
    : SCHEMES;
    
  const privateSchemes = displaySchemes.filter(s => s.id !== 'TVK-YOUTH');

  return (
    <>
      {/* FEATURE 1: Flag Reveal */}
      <FlagReveal onDone={handleRevealDone} />

      <div className={`bg-white min-h-screen text-[#1a1a1a] font-sans antialiased ${revealed ? 'reveal-content' : 'opacity-0'}`}>

      {!gateCompleted ? (
        <PremiumOnboarding 
          user={user}
          onGoogleLogin={handleGoogleLogin}
          onLoginClick={() => setView('login')}
          onComplete={(data) => {
          setProfileData(data);
          setIncome(data.income.toString());
          setGateCompleted(true);
        }} />
      ) : (
        <>
          {/* MANIFESTO DIALOG POPUP */}
          <ManifestoDialog open={manifestoOpen} onOpenChange={setManifestoOpen} />

          {/* NAV */}
          <SimpleHeader 
            view={view}
            setView={setView}
            onOpenManifesto={() => setManifestoOpen(true)} 
            user={user}
            onGoogleLogin={handleGoogleLogin}
          />

          {view === 'manifesto' ? (
            <MasterDashboard />
          ) : view === 'login' ? (
            <div className="max-w-7xl mx-auto px-6 py-16 animate-fadeIn">
               <div className="mb-8">
                  <button 
                    onClick={() => setView('welfare')}
                    className="text-[#800020] font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    ← Back to Welfare Portal
                  </button>
               </div>
               <LoginPanel />
            </div>
          ) : (
            <>
              {/* HERO */}
      {/* (Hero Gate replaced by PremiumOnboarding Wizard) */}

      {/* (Action Buttons Removed) */}
      {/* FEATURE 2: Income Screening Engine + FEATURE 4: Smart Redirection */}
      <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* ELIGIBILITY PANEL */}
        <div id="eligibility" className="scroll-mt-20 lg:col-span-4 bg-[#f8f9fa] border-2 border-[#e9ecef] rounded-3xl p-6 shadow-sm h-fit space-y-6">
          {user && (
            <div className="bg-[#800020]/5 border border-[#800020]/10 rounded-2xl p-4 text-left animate-fadeIn">
              <span className="text-[9px] font-black uppercase tracking-wider text-[#800020] bg-[#ffcc00]/20 px-2.5 py-0.5 rounded-full">Active Profile</span>
              <h4 className="text-xs font-black text-[#800020] mt-2 uppercase">{profileData.name} ({profileData.age} Vayathu)</h4>
              <div className="mt-1.5 space-y-0.5 text-[10px] text-zinc-600 font-bold uppercase tracking-wider font-mono">
                <div>📞 Mobile: {profileData.mobile || 'N/A'}</div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <span>💼 Status:</span>
                  <select 
                    value={profileData.employment || profileData.workingStatus || ''}
                    onChange={(e) => setProfileData(prev => ({...prev, employment: e.target.value, workingStatus: e.target.value}))}
                    className="w-full bg-white border border-[#e9ecef] rounded-lg px-2.5 py-2 text-xs font-bold text-[#800020] outline-none focus:border-[#ffcc00] transition-colors cursor-pointer"
                  >
                    <option value="student">Student / Higher Education</option>
                    <option value="unemployed">Unemployed Youth</option>
                    <option value="gig_worker">Gig Worker / Delivery</option>
                    <option value="farmer">Active Farmer</option>
                    <option value="private">Private Sector</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-black text-[#800020] uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#ffcc00] rounded-sm inline-block" />Income Screening Engine
            </h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wide mt-1">வருமான சரிபார்ப்பு இயந்திரம்</p>
          </div>

          <p className="text-xs text-zinc-600 font-semibold leading-relaxed">
            Drop in your family's monthly income. The engine evaluates exact borderline thresholds (₹41,600/month = ₹4,99,200/yr) for all schemes instantly.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase text-zinc-500 tracking-wider">Monthly Family Income (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#800020] font-bold text-lg">₹</span>
              <input
                type="number" placeholder="e.g., 41600" value={income}
                onChange={e => setIncome(e.target.value)}
                className="w-full bg-white border-2 border-[#e9ecef] focus:border-[#ffcc00] pl-8 pr-4 py-3.5 rounded-xl focus:outline-none text-xl font-mono font-bold transition shadow-inner"
              />
            </div>
          </div>

          {income && (
            <div className="space-y-3 animate-fadeIn">
              <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-xl p-3 flex justify-between text-xs font-bold">
                <span className="text-zinc-500">Annual equivalent</span>
                <span className="text-[#800020] font-black">₹{annual.toLocaleString()}/yr</span>
              </div>

              {isEligible ? (
                <div className="bg-[#ffcc00]/10 border-l-4 border-[#ffcc00] p-4 rounded-xl space-y-1">
                  <span className="font-black text-[#800020] uppercase text-[10px] tracking-wider block">✅ Status: Eligible</span>
                  <p className="text-xs text-zinc-700 font-semibold">Income qualifies! Checklists unlocked on scheme cards below.</p>
                </div>
              ) : (
                <div className="bg-zinc-100 border-l-4 border-zinc-400 p-4 rounded-xl space-y-1">
                  <span className="font-extrabold text-zinc-600 uppercase text-[10px] tracking-wider block">⚠ Income Limit Crossed</span>
                  <p className="text-xs text-zinc-500 font-semibold">Above ₹5L/yr threshold for cash transfers. Gig worker hub below may still apply.</p>
                </div>
              )}
            </div>
          )}

          {/* INCOGNITO LABS INTEGRATION */}
          <div className="text-right text-[9px] font-mono font-bold text-[#800020]/60 uppercase tracking-wider mt-3">
            📊 Analytics Logic & Core R&D // Incognito Labs
          </div>
        </div>

        {/* SCHEME DIRECTORY */}
        <div id="schemes" className="scroll-mt-20 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-[#e9ecef]">
            <h2 className="text-xl font-black text-[#800020] uppercase tracking-tight">📜 Welfare Guidelines</h2>
            {isPrivate && !isSenior && (
              <span className="bg-[#800020]/10 text-[#800020] text-xs font-black px-3 py-1 rounded-full uppercase">{privateSchemes.length} Programs</span>
            )}
          </div>
          <div className="space-y-6">
            {isLimitCrossed && isPrivate && !isSenior && (
              <div className="bg-zinc-100 border border-zinc-300 p-5 rounded-2xl flex items-start gap-3 animate-fadeIn">
                <span className="text-xl">ℹ️</span>
                <p className="text-sm text-zinc-600 font-bold leading-relaxed">
                  Direct cash transfer schemes are restricted based on your household income ceiling. View available institutional or skill development waivers below.
                </p>
              </div>
            )}

            {isSenior ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🧓</span> {profileData.language === 'ta' ? "மூத்த குடிமக்கள் பாதுகாப்புத் திட்டம்" : "Senior Citizen Protection Hub"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Senior Citizen Dignity Pension (₹3,000/mo)"
                    titleTa="முதியோர் மாண்பு ஓய்வூதியத் திட்டம் (₹3,000/மாதம்)"
                    descEn="Provides a monthly dignity pension of ₹3,000 to all citizens aged 60 and above, directly credited to their bank accounts to ensure financial independence."
                    descTa="60 வயது மற்றும் அதற்கு மேற்பட்ட அனைத்து மூத்த குடிமக்களுக்கும் மாதம் ₹3,000 மாண்பு ஓய்வூதியமாக அவர்களின் வங்கிக் கணக்கில் நேரடியாகச் செலுத்தப்படும்."
                    icon="🧓" language={profileData.language}
                  />
                  <UniversalCard 
                    titleEn="Destitute Livelihood Net & Free Medical Care"
                    titleTa="ஆதரவற்றோர் வாழ்வாதாரப் பாதுகாப்பு மற்றும் இலவச மருத்துவக் கட்டமைப்பு"
                    descEn="Comprehensive livelihood protection and doorstep medical care integration for destitute senior citizens without family support."
                    descTa="குடும்ப ஆதரவற்ற மூத்த குடிமக்களுக்கு முழுமையான வாழ்வாதாரப் பாதுகாப்பு மற்றும் வீடுகளுக்கே வந்து மருத்துவச் சேவை வழங்கும் ஒருங்கிணைந்த திட்டம்."
                    icon="🕊️" language={profileData.language}
                  />
                </div>
              </div>
            ) : isFisherman ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🎣</span> {profileData.language === 'ta' ? "கடலோரத் தொழிலாளர் மேம்பாட்டுப் பெட்டகம்" : "Coastal Laborer Welfare Hub"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Lean Season Subvention Allowance"
                    titleTa="மீன்பிடித் தடைக்கால நிவாரண உதவி"
                    descEn="Provides enhanced subvention allowance directly to fishermen families during the seasonal ban period to support uninterrupted livelihood."
                    descTa="மீன்பிடித் தடைக்காலத்தில் மீனவர் குடும்பங்களின் வாழ்வாதாரத்தை தடையின்றிப் பாதுகாக்க மேம்படுத்தப்பட்ட நிவாரண உதவித் தொகை நேரடியாக வழங்கப்படும்."
                    icon="🌊" language={profileData.language}
                  />
                  <UniversalCard 
                    titleEn="Advanced Marine Safety & Subsidy"
                    titleTa="மேம்படுத்தப்பட்ட கடல்சார் பாதுகாப்புத் தளம்"
                    descEn="Subsidies for modern life-saving communication equipment and motorized boat fuel allowance for active coastal workers."
                    descTa="மீனவர்களின் பாதுகாப்பிற்காக நவீன தொலைத்தொடர்புச் சாதனங்கள் வாங்க மானியம் மற்றும் விசைப்படகு எரிபொருள் மானியம்."
                    icon="⚓" language={profileData.language}
                  />
                </div>
              </div>
            ) : isWeaver ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🧵</span> {profileData.language === 'ta' ? "நெசவாளர் மற்றும் கைவினைஞர் நல்வாழ்வு" : "Weaver & Artisan Welfare Hub"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Free Power Allocation for Handlooms"
                    titleTa="இலவச மின்சார ஒதுக்கீடு"
                    descEn="Guaranteed free electricity units for registered handloom and powerloom weavers to eliminate production overheads."
                    descTa="கைத்தறி மற்றும் விசைத்தறி நெசவாளர்களின் உற்பத்திச் செலவைக் குறைக்கும் வகையில் உத்தரவாதமான இலவச மின்சார ஒதுக்கீடு."
                    icon="💡" language={profileData.language}
                  />
                  <UniversalCard 
                    titleEn="Artisan Modernization Market Bridge"
                    titleTa="கைவினைஞர் நவீனமயமாக்கல் மற்றும் சந்தை இணைப்பு"
                    descEn="State-backed capital subsidy for loom modernization and direct e-commerce integration eliminating middlemen."
                    descTa="தறி நவீனமயமாக்கலுக்கான மூலதன மானியம் மற்றும் இடைத்தரகர்கள் இன்றி நேரடியாக ஈ-காமர்ஸ் தளங்களில் இணைக்கும் திட்டம்."
                    icon="🧶" language={profileData.language}
                  />
                </div>
              </div>
            ) : isStudent ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase">
                    🎓 {profileData.language === 'ta' ? "உயர்கல்வி மற்றும் மாணவர் நல மேம்பாட்டுத் திட்டம்" : "Higher Education & Student Support Matrix"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {age >= 22 ? (
                    <UniversalCard 
                      titleEn="Skill Placement & Employment Assistance"
                      titleTa="திறன் மேம்பாட்டுப் பயிற்சி மற்றும் வேலைவாய்ப்பு உறுதி"
                      descEn="Offers specialized industrial and digital skill training with an additional monthly stipend of ₹10,000 during the active internship period."
                      descTa="தொழில்நுட்ப மற்றும் தொழில்முறைப் பயிற்சிகளை இலவசமாக வழங்குவதோடு, பயிற்சிக் காலத்தில் மாதம் ₹10,000 ஊதியமாக வழங்கி நேரடி வேலைவாய்ப்புகள் உருவாக்கப்படும்."
                      icon="🚀" language={profileData.language}
                    />
                  ) : (
                    <>
                      <UniversalCard 
                        titleEn="Education Loan Interest Waiver Scheme"
                        titleTa="கல்விக்கடன் வட்டித் தள்ளுபடித் திட்டம்"
                        descEn="The state government will directly absorb all interest components on active higher education loans until graduation, relieving families of financial burden during job-seeking periods."
                        descTa="மாணவர்கள் உயர்கல்விக்காகப் பெற்ற கடன்களுக்கான வட்டித் தொகையை முழுமையாக அரசே ஏற்கும். இதனால் படிப்பு முடித்து வேலை தேடும் காலம் வரை மாணவர்களின் குடும்பங்களுக்கு எவ்வித வட்டிச் சுமையும் இருக்காது."
                        icon="🎓" language={profileData.language}
                      />
                      <UniversalCard 
                        titleEn="Advanced Tech Kit & Travel Assistance"
                        titleTa="இலவச கணினி மற்றும் கட்டணமில்லாப் பேருந்துப் பயணம்"
                        descEn="Distribution of advanced laptops for technical and digital skills training, coupled with fully subsidized, cost-free public transport passes for all active students."
                        descTa="மாணவர்களின் தொழில்நுட்பத் திறன்களை மேம்படுத்த பிரீமியம் ரக மடிக்கணினிகள் வழங்குவதோடு, கல்வி நிலையங்களுக்குச் சென்று வரக் கட்டணமில்லாப் பேருந்துப் பயண வசதியும் தொடர்ந்து நீட்டிக்கப்படும்."
                        icon="💻" language={profileData.language}
                      />
                    </>
                  )}
                </div>
              </div>
            ) : isUnemployed ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">💼</span> {profileData.language === 'ta' ? "வேலைவாய்ப்பற்ற இளைஞர் நல்வாழ்வுப் பெட்டகம்" : "Unemployed Youth Welfare Hub"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Monthly Unemployment Allowance (₹4,000/mo)"
                    titleTa="மாதாந்திர வேலைவாய்ப்பற்றோர் ஊக்கத்தொகை (₹4,000)"
                    descEn={age <= 25 ? "Provides a direct financial stipend of ₹4,000 per month to eligible unemployed graduates to support essential job-hunting application costs and mobility." : "Provides a direct financial stipend of ₹4,000 per month functioning as a family livelihood stabilization cushion during extended unemployment."}
                    descTa={age <= 25 ? "தகுதிவாய்ந்த பட்டதாரி இளைஞர்களுக்கு வேலை தேடும் காலப் பயண மற்றும் விண்ணப்பச் செலவுகளுக்காக மாதம் ₹4,000 நேரடி உதவித்தொகையாக வழங்கப்படும்." : "வேலைவாய்ப்பற்ற காலங்களில் குடும்ப வாழ்வாதாரத்தை நிலைநிறுத்தும் அடிப்படைப் பாதுகாப்பாக மாதம் ₹4,000 உதவித்தொகை வழங்கப்படும்."}
                    icon="💸" language={profileData.language}
                  />
                  {age <= 25 && (
                    <UniversalCard 
                      titleEn="Skill Placement & Employment Assistance"
                      titleTa="திறன் மேம்பாட்டுப் பயிற்சி மற்றும் வேலைவாய்ப்பு உறுதி"
                      descEn="Offers specialized industrial and digital skill training with an additional monthly stipend of ₹10,000 during the active internship period."
                      descTa="தொழில்நுட்ப மற்றும் தொழில்முறைப் பயிற்சிகளை இலவசமாக வழங்குவதோடு, பயிற்சிக் காலத்தில் மாதம் ₹10,000 ஊதியமாக வழங்கி நேரடி வேலைவாய்ப்புகள் உருவாக்கப்படும்."
                      icon="🚀" language={profileData.language}
                    />
                  )}
                </div>
              </div>
            ) : isGigWorker ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🛵</span> {profileData.language === 'ta' ? "ஆப் ஊழியர் நல வாரியம்" : "Gig Worker Welfare Board"}
                  </h3>
                </div>
                
                {/* KM Calculator Widget */}
                <div className="bg-white border-2 border-[#ffcc00] p-6 rounded-3xl shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-[#ffcc00] text-[#1a1a1a] text-[9px] font-black uppercase tracking-widest px-3.5 py-1 rounded-bl-xl z-10">
                    {profileData.language === 'ta' ? "வருமானக் கணக்கீட்டு இயந்திரம்" : "Earnings Calculator Engine"}
                  </div>
                  <h5 className="text-sm font-black text-[#800020] uppercase tracking-wide">
                    {profileData.language === 'ta' ? "தினசரிப் பயணத் தொலைவு (கி.மீ):" : "Daily Travel Distance (KMs):"}
                  </h5>
                  <div className="mt-6 pt-2 pb-4">
                    <input type="range" min="10" max="300" step="5" value={dailyKms} onChange={(e) => setDailyKms(Number(e.target.value))} className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#800020]" />
                    <div className="text-center mt-3 font-black text-2xl text-[#800020]">{dailyKms} KM / {profileData.language === 'ta' ? "நாள்" : "Day"}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-zinc-100 rounded-xl p-4 text-center border border-zinc-200">
                      <p className="text-[9px] font-bold text-zinc-500 uppercase">{profileData.language === 'ta' ? "தற்போதைய நிறுவனங்களின் விலை" : "Current App Market Rate"}</p>
                      <p className="text-lg font-black text-zinc-700 mt-1">₹{(dailyKms * 11.5).toFixed(0)}</p>
                      <p className="text-[10px] font-bold text-zinc-400">(@ ₹11.5/km)</p>
                    </div>
                    <div className="bg-[#800020]/10 rounded-xl p-4 text-center border border-[#800020]/20">
                      <p className="text-[9px] font-bold text-[#800020] uppercase">{profileData.language === 'ta' ? "மாற்றத்திற்கான நமது உறுதிமொழி" : "TVK Mandate Rate"}</p>
                      <p className="text-lg font-black text-[#800020] mt-1">₹{(dailyKms * 20).toFixed(0)}</p>
                      <p className="text-[10px] font-bold text-[#800020]/60">(@ ₹20.0/km)</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center bg-[#ffcc00]/20 text-[#800020] py-2 rounded-lg text-xs font-black uppercase">
                    {profileData.language === 'ta' ? "தினசரி கூடுதல் லாபம்:" : "Daily Profit Difference:"} <span className="text-xl">₹{((dailyKms * 20) - (dailyKms * 11.5)).toFixed(0)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {age <= 25 ? (
                    <>
                      <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl shadow-sm hover:border-[#800020]/30 transition-colors">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h5 className="text-[11px] font-black text-[#800020] uppercase">{profileData.language === 'ta' ? "அடிப்படை ஊதியச் சட்டம்" : "Base Pay Sasanum"}</h5>
                        <p className="text-[10px] text-zinc-600 font-bold mt-2 leading-relaxed">{profileData.language === 'ta' ? "பயன்பாட்டு நிறுவனங்கள் குறைந்தபட்ச அடிப்படை ஊதியத்தை வழங்குவதை சட்டபூர்வமாக உறுதிசெய்தல்." : "Legally mandating aggregator apps to provide a strict minimum base pay structure."}</p>
                      </div>
                      <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl shadow-sm hover:border-[#800020]/30 transition-colors">
                        <div className="text-2xl mb-2">🤖</div>
                        <h5 className="text-[11px] font-black text-[#800020] uppercase">{profileData.language === 'ta' ? "அல்காரிதம் சுரண்டல் தடை" : "Anti-Algorithmic Target Ban"}</h5>
                        <p className="text-[10px] text-zinc-600 font-bold mt-2 leading-relaxed">{profileData.language === 'ta' ? "ஊழியர்களைச் சோர்வடையச் செய்யும் அறிவியலற்ற அல்காரிதம் இலக்குகளுக்கு நிரந்தரத் தடை." : "Permanent ban on unscientific algorithmic targeting that exhausts workers."}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl shadow-sm hover:border-[#800020]/30 transition-colors">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h5 className="text-[11px] font-black text-[#800020] uppercase">{profileData.language === 'ta' ? "நல வாரியக் காப்பீடு" : "Welfare Board Cover"}</h5>
                        <p className="text-[10px] text-zinc-600 font-bold mt-2 leading-relaxed">{profileData.language === 'ta' ? "அனைத்து ஆப் ஊழியர்களுக்கும் விபத்து மற்றும் மருத்துவக் காப்பீடு உள்ளிட்ட முழுமையான நல வாரியப் பாதுகாப்பு." : "Comprehensive welfare board coverage including accident and medical insurance."}</p>
                      </div>
                      <div className="bg-white border-2 border-[#e9ecef] p-5 rounded-2xl shadow-sm hover:border-[#800020]/30 transition-colors">
                        <div className="text-2xl mb-2">🆔</div>
                        <h5 className="text-[11px] font-black text-[#800020] uppercase">{profileData.language === 'ta' ? "அடையாள அட்டை முடக்கப் பாதுகாப்பு" : "ID Suspension Protection"}</h5>
                        <p className="text-[10px] text-zinc-600 font-bold mt-2 leading-relaxed">{profileData.language === 'ta' ? "எவ்வித விசாரணையும் இன்றி ஊழியர்களின் ஐடியை தன்னிச்சையாக முடக்குவதற்கு எதிரான சட்டப் பாதுகாப்பு." : "Legal protection against arbitrary ID suspension by aggregators without due inquiry."}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : isFarmer ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🌾</span> {profileData.language === 'ta' ? "விவசாயிகள் நல்வாழ்வுப் பெட்டகம்" : "Active Farmer Welfare Hub"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {age <= 35 ? (
                    <UniversalCard 
                      titleEn="Free Agricultural Power & Input Subsidy Matrix"
                      titleTa="இலவச விவசாய மின்சாரம் மற்றும் முதலீட்டு மானியத் திட்டம்"
                      descEn="24/7 free power accompanied by special subsidies for acquiring modern agricultural input machinery."
                      descTa="நவீன வேளாண் கருவிகள் வாங்க சிறப்பு மானியத்துடன் கூடிய 24 மணி நேர இலவச மின்சாரம்."
                      icon="⚡" language={profileData.language}
                    />
                  ) : (
                    <UniversalCard 
                      titleEn="Comprehensive Crop Insurance & Minimum Support Price Guarantee"
                      titleTa="விவசாயப் பயிர்க் காப்பீடு மற்றும் குறைந்தபட்ச ஆதரவு விலை உறுதித் திட்டம்"
                      descEn="Features land stabilizing loans, seed subsidies, and cooperative credit waivers coupled with robust crop insurance."
                      descTa="விவசாயிகளின் நிலையான வாழ்வாதாரத்திற்கு ஆதரவாக நில மேம்பாட்டுக் கடன்கள், விதை மானியங்கள் மற்றும் கூட்டுறவுக் கடன் தள்ளுபடிகளுடன் கூடிய காப்பீடு."
                      icon="🌱" language={profileData.language}
                    />
                  )}
                </div>
              </div>
            ) : isPrivate ? (
              <div className="space-y-8 animate-fadeIn">
                {privateSchemes.map(s => <SchemeCard key={s.id} scheme={s} eligible={isEligible} language={profileData.language} />)}
                
                <div className="mb-2 mt-8 border-t border-[#e9ecef] pt-8">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">🌱</span> {profileData.language === 'ta' ? "உலகளாவிய பசுமை ஒருங்கிணைப்பு" : "Universal Green Integration"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Solar Rooftop Subvention"
                    titleTa="சூரிய மின்தகடு மானியத் திட்டம்"
                    descEn="Heavy subvention on residential solar panel installations to promote green energy and permanently reduce household electricity bills."
                    descTa="வீடுகளுக்கு சூரிய மின்தகடு அமைப்பதற்கு சிறப்பு மானியம் வழங்கி, பசுமை ஆற்றலை ஊக்குவிப்பதோடு மின்கட்டணச் சுமையையும் நிரந்தரமாகக் குறைக்கும் திட்டம்."
                    icon="☀️" language={profileData.language}
                  />
                  <UniversalCard 
                    titleEn="Waterbody Restoration Campaign"
                    titleTa="நீர்நிலைகள் மறுசீரமைப்புத் திட்டம்"
                    descEn="Community-driven fully funded initiative to restore local lakes and ponds, integrating employment opportunities for neighborhood residents."
                    descTa="உள்ளூர் ஏரிகள் மற்றும் குளங்களைச் சீரமைக்கும் சமூகப் பங்களிப்புத் திட்டம், இதில் அக்கம் பக்கத்தில் உள்ளவர்களுக்கு வேலைவாய்ப்புகளும் உறுதி செய்யப்படும்."
                    icon="💧" language={profileData.language}
                  />
                </div>
              </div>
            ) : null}

            {/* DIFFERENTLY ABLED APPEND */}
            {isDifferentlyAbled && (
              <div className="space-y-8 animate-fadeIn border-t-4 border-[#ffcc00] mt-10 pt-10 relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#ffcc00] text-[#800020] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-white">
                  Special Provision Active
                </div>
                <div className="mb-2">
                  <h3 className="text-lg font-black text-[#800020] uppercase flex items-center gap-2">
                    <span className="text-2xl">♿</span> {profileData.language === 'ta' ? "மாற்றுத்திறனாளிகள் நல்வாழ்வு மற்றும் அதிகாரமளித்தல்" : "Disability Empowerment & Welfare"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <UniversalCard 
                    titleEn="Enhanced Disability Caregiver Pension"
                    titleTa="மாற்றுத்திறனாளிகள் பராமரிப்பு உதவித்தொகை"
                    descEn="An enhanced monthly pension explicitly allocated for differently-abled individuals and their primary caregivers to ensure uncompromised quality of life."
                    descTa="மாற்றுத்திறனாளிகள் மற்றும் அவர்களைப் பராமரிப்போரின் வாழ்வாதாரத்தை உறுதிசெய்ய, மேம்படுத்தப்பட்ட மாதாந்திர சிறப்பு உதவித்தொகை."
                    icon="♿" language={profileData.language}
                  />
                  <UniversalCard 
                    titleEn="Accessible Tech Infrastructure"
                    titleTa="தடையற்ற தொழில்நுட்ப கட்டமைப்பு வசதிகள்"
                    descEn="Free specialized mobility aides, sensory devices, and retrofitted scooters completely subsidized by the state."
                    descTa="மாற்றுத்திறனாளிகளுக்கான சிறப்புச் சக்கர நாற்காலிகள், செவித்திறன் கருவிகள் மற்றும் பிரத்யேகமாக வடிவமைக்கப்பட்ட ஸ்கூட்டர்கள் முற்றிலும் இலவசமாக வழங்கப்படும்."
                    icon="🦽" language={profileData.language}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* CONDITIONAL RENDERING RESULT METRICS */}
      <CustomResultsView profileData={profileData} />

      {/* RELOCATED ALL MANIFESTO MODULES BUTTON */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-16 flex flex-col items-center relative z-10 animate-fadeIn">
        <div className="w-16 h-1 bg-[#ffcc00]/50 rounded-full mb-6"></div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-4">
          {profileData.language === 'ta' ? "கட்சியின் முழுமையான கொள்கை விளக்கப் பட்டியலை அறிய" : "Explore the complete party resolution catalog"}
        </p>
        <button 
          onClick={() => setManifestoOpen(true)}
          className="bg-transparent border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
        >
          {profileData.language === 'ta' ? "📋 அனைத்து கொள்கை மாடியூல்களும் →" : "📋 All Manifesto Modules →"}
        </button>
      </div>
      </>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0d0204] border-t-4 border-[#800020] text-white py-10 px-4 text-center mt-20 font-mono">
        <p className="text-[11px] text-zinc-500 uppercase tracking-widest">
          Makkal Connect Ecosystem Dashboard v1.0.4
        </p>
        <p className="text-[10px] text-zinc-400 mt-2">
          Designed, Code-Stitched, and Maintained by <span className="text-[#ffcc00] font-black">INCOGNITO BUILDS</span>
        </p>
      </footer>
      </>
      )}
    </div>
  </>
  );
}
