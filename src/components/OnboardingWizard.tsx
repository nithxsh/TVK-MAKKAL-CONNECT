import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Language } from '../store/useStore';
import { ChevronRight, ChevronLeft, Check, LogIn } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import tvkLogo from '../assets/tvk logo.jpg';

export const OnboardingWizard: React.FC = () => {
  const { userProfile, setUserProfile, setViewState, authUser, setAuthUser } = useStore();
  const [step, setStep] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const isEn = userProfile.language === 'en';

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setAuthUser(result.user);
      nextStep();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const nextStep = () => {
    if (step === 3 && userProfile.employment !== 'active_farmer') {
      setStep(5); // Skip Step 4 (Farmer land metrics)
    } else if (step === 9) {
      setViewState('dashboard');
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (step === 0) {
      setViewState('landing');
      return;
    }
    if (step === 5 && userProfile.employment !== 'active_farmer') {
      setStep(3);
    } else {
      setStep(s => Math.max(0, s - 1));
    }
  };

  const employmentOptions = [
    { id: 'student', en: 'Student / Higher Education', ta: 'மாணவர் / உயர்கல்வி' },
    { id: 'unemployed_youth', en: 'Unemployed Youth / Job Seeker', ta: 'வேலைவாய்ப்பற்ற இளைஞர் / வேலை தேடுபவர்' },
    { id: 'gig_worker', en: 'Gig Worker / Delivery & Transit', ta: 'ஆப் ஊழியர் / விநியோகம் மற்றும் போக்குவரத்துப் பிரிவு' },
    { id: 'active_farmer', en: 'Active Farmer / Land Laborer', ta: 'விவசாயி / விவசாயத் தொழிலாளர்' },
    { id: 'fisherman_coastal', en: 'Fisherman / Coastal Laborer', ta: 'மீனவர் / கடலோரத் தொழிலாளர்' },
    { id: 'handloom_weaver', en: 'Handloom Weaver / Artisan', ta: 'நெசவாளர் / கைவினைஞர்' },
    { id: 'private_sector', en: 'Private Sector / Self-Employed', ta: 'தனியார் துறை / சுயதொழில்' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Branding in Background */}
      <div className="absolute top-8 left-8 text-tvk-maroon font-black uppercase tracking-widest text-sm flex items-center gap-3">
        <img 
          src={tvkLogo} 
          alt="TVK Logo" 
          className="w-6 h-6 object-cover rounded-md border border-tvk-maroon/10"
        />
        Makkal Connect
      </div>

      <div className="w-full max-w-xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-12">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
            const isActive = step >= idx;
            return (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${isActive ? 'w-8 bg-tvk-maroon' : 'w-2 bg-zinc-200'}`}
              />
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="card-floating p-6 sm:p-10 md:p-16"
          >
            {/* Step 0: Language */}
            {step === 0 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight leading-tight">
                  Choose Your Preferred Language / <span className="text-tvk-maroon">மொழியைத் தேர்ந்தெடுக்கவும்</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {(['en', 'ta'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setUserProfile({ language: lang });
                        setStep(1);
                      }}
                      className={`flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 font-black text-base sm:text-lg transition-all duration-300
                        ${userProfile.language === lang 
                          ? 'border-tvk-maroon bg-tvk-maroon/5 text-tvk-maroon shadow-lg' 
                          : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200'}`}
                    >
                      {lang === 'en' ? 'English' : 'தமிழ்'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Name */}
            {step === 1 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Enter your full name' : 'தங்களின் முழுப் பெயர் என்ன?'}
                </h2>
                <input 
                  type="text" 
                  autoFocus
                  placeholder={isEn ? "e.g. Karthik" : "உ-ம். கார்த்திக்"}
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ name: e.target.value })}
                  className="w-full text-xl sm:text-2xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-2xl px-6 sm:px-8 py-4 sm:py-6 outline-none transition-all duration-300"
                />
              </div>
            )}

            {/* Step 2: Age */}
            {step === 2 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Enter your age' : 'தங்களின் வயது என்ன?'}
                </h2>
                <input 
                  type="number" 
                  autoFocus
                  placeholder={isEn ? "e.g. 28" : "உ-ம். 28"}
                  value={userProfile.age || ''}
                  onChange={(e) => setUserProfile({ age: Number(e.target.value) })}
                  className="w-full text-xl sm:text-2xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-2xl px-6 sm:px-8 py-4 sm:py-6 outline-none transition-all duration-300 appearance-none"
                />
              </div>
            )}

            {/* Step 3: Employment */}
            {step === 3 && (
              <div className="space-y-5 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Select your employment status' : 'உங்களின் தற்போதைய வேலைவாய்ப்பு நிலை:'}
                </h2>
                <div className="grid gap-2 sm:gap-3 max-h-[45vh] sm:max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {employmentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setUserProfile({ employment: opt.id })}
                      className={`text-left px-5 sm:px-6 py-3 sm:py-4 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all duration-300
                        ${userProfile.employment === opt.id 
                          ? 'border-tvk-maroon bg-tvk-maroon/5 text-tvk-maroon' 
                          : 'border-zinc-100 bg-white text-zinc-500 hover:border-zinc-200'}`}
                    >
                      {isEn ? opt.en : opt.ta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Farmer Conditional */}
            {step === 4 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Total land ownership area (in Acres):' : 'மொத்த நில உடைமை அளவு (ஏக்கரில்):'}
                </h2>
                <input 
                  type="number" 
                  autoFocus
                  placeholder={isEn ? "e.g. 2.5" : "உ-ம். 2.5"}
                  value={userProfile.landArea || ''}
                  onChange={(e) => setUserProfile({ landArea: Number(e.target.value) })}
                  className="w-full text-xl sm:text-2xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-2xl px-6 sm:px-8 py-4 sm:py-6 outline-none transition-all duration-300"
                />
              </div>
            )}

            {/* Step 5: Income */}
            {step === 5 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Enter your monthly family income (₹):' : 'குடும்பத்தின் மாத வருமானம் (₹):'}
                </h2>
                <div className="space-y-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="1000"
                    value={userProfile.monthlyIncome}
                    onChange={(e) => setUserProfile({ monthlyIncome: Number(e.target.value) })}
                    className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-tvk-maroon"
                  />
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black text-tvk-maroon">₹{userProfile.monthlyIncome.toLocaleString()}</span>
                    <span className="text-zinc-400 font-bold ml-2">/ month</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Marital */}
            {step === 6 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Select your marital status:' : 'உங்களின் திருமண நிலை என்ன?'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {[
                    { id: 'single', en: 'Unmarried or Single', ta: 'திருமணமா ஆகாதவர்' },
                    { id: 'married', en: 'Married', ta: 'திருமணமானவர்' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setUserProfile({ maritalStatus: opt.id as 'single' | 'married' })}
                      className={`flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 font-black text-base sm:text-lg transition-all duration-300
                        ${userProfile.maritalStatus === opt.id 
                          ? 'border-tvk-maroon bg-tvk-maroon/5 text-tvk-maroon' 
                          : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200'}`}
                    >
                      {isEn ? opt.en : opt.ta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Login */}
            {step === 7 && (
              <div className="space-y-6 sm:space-y-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Verify Your Identity' : 'அடையாளத்தை உறுதிப்படுத்தவும்'}
                </h2>
                <p className="text-zinc-500 font-bold text-sm leading-relaxed">
                  {isEn 
                    ? 'Secure your session by authenticating with Google.' 
                    : 'கூகுள் கணக்கைப் பயன்படுத்தி உங்கள் அமர்வைப் பாதுகாக்கவும்.'}
                </p>
                
                <div className="pt-2 sm:pt-4">
                  {authUser ? (
                    <div className="bg-green-50 border-2 border-green-100 rounded-2xl p-5 sm:p-6 flex items-center justify-center gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <Check size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified</p>
                        <p className="text-base sm:text-lg font-black text-zinc-900">{authUser.displayName}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <button
                        onClick={handleGoogleLogin}
                        disabled={isLoggingIn}
                        className="w-full bg-white border-2 border-zinc-100 hover:border-tvk-maroon px-6 sm:px-8 py-4 sm:py-5 rounded-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                      >
                        {isLoggingIn ? (
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-tvk-maroon/20 border-t-tvk-maroon rounded-full animate-spin" />
                        ) : (
                          <LogIn size={20} className="text-tvk-maroon" />
                        )}
                        <span className="text-base sm:text-lg font-black text-zinc-700">
                          {isEn ? 'Continue with Google' : 'கூகுள் மூலம் தொடரவும்'}
                        </span>
                      </button>
                      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        🛡️ Security Verification Engine Powered by Incognito Hacks
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 8: Disability */}
            {step === 8 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Do you have any physical disability?' : 'உங்களுக்கு ஏதேனும் உடல் ஊனம் உள்ளதா?'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {[
                    { id: false, en: 'No', ta: 'இல்லை' },
                    { id: true, en: 'Yes', ta: 'ஆம்' }
                  ].map((opt) => (
                    <button
                      key={opt.id.toString()}
                      onClick={() => {
                        setUserProfile({ isDifferentlyAbled: opt.id });
                        nextStep();
                      }}
                      className={`flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 font-black text-base sm:text-lg transition-all duration-300
                        ${userProfile.isDifferentlyAbled === opt.id 
                          ? 'border-tvk-maroon bg-tvk-maroon/5 text-tvk-maroon' 
                          : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200'}`}
                    >
                      {isEn ? opt.en : opt.ta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 9: Final Review */}
            {step === 9 && (
              <div className="space-y-6 sm:space-y-8 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-tvk-yellow/20 text-tvk-maroon rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Check size={32} className="stroke-[3]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'All parameters verified.' : 'அனைத்து விவரங்களும் சரிபார்க்கப்பட்டன.'}
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                  {isEn ? 'Ready to calculate your entitlements' : 'உங்கள் உரிமைகளைக் கணக்கிடத் தயார்'}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 sm:mt-12 pt-8 sm:pt-10 border-t border-zinc-50">
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 text-zinc-400 hover:text-zinc-600 font-black uppercase tracking-widest text-[10px] sm:text-xs transition"
              >
                <ChevronLeft size={14} />
                {isEn ? 'Back' : 'பின்செல்'}
              </button>
              
              {step > 0 && (
                <button 
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !userProfile.name) ||
                    (step === 2 && !userProfile.age) ||
                    (step === 3 && !userProfile.employment) ||
                    (step === 4 && !userProfile.landArea) ||
                    (step === 7 && !authUser)
                  }
                  className={`flex items-center gap-2 bg-tvk-maroon text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs transition hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100
                    ${(step === 7 && !authUser) ? 'hidden' : 'flex'}`}
                >
                  {step === 9 ? (isEn ? 'Complete →' : 'முடிக்க →') : (isEn ? 'Continue' : 'தொடர')}
                  {step !== 9 && <ChevronRight size={14} />}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
