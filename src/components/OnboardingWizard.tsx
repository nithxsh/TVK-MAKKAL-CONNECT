import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, Language } from '../store/useStore';
import { ChevronRight, ChevronLeft, Check, LogIn } from 'lucide-react';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import tvkLogo from '../assets/tvk logo.jpg';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export const OnboardingWizard: React.FC = () => {
  const { userProfile, setUserProfile, setViewState, authUser, setAuthUser, onboardingStep: step, setOnboardingStep: setStep } = useStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  const nextStep = async () => {
    if (step === 12) {
      if (authUser) {
        setIsSaving(true);
        try {
          // Explicitly strip out any undefined values or let firestore handle, but passing userProfile directly works if it's clean
          // To prevent undefined value errors in firestore:
          const cleanProfile = JSON.parse(JSON.stringify(userProfile));
          await setDoc(doc(db, 'users', authUser.uid), cleanProfile, { merge: true });
          setViewState('dashboard');
        } catch (error) {
          console.error("Error saving profile to Firestore:", error);
        } finally {
          setIsSaving(false);
        }
      } else {
        setViewState('dashboard');
      }
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (step === 0) {
      setViewState('landing');
      return;
    }
    setStep(s => Math.max(0, s - 1));
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return !!userProfile.name;
      case 2: return !!userProfile.gender;
      case 3: return userProfile.mobileNumber?.length === 10;
      case 4: return !!userProfile.district && userProfile.pincode?.length === 6;
      case 5: return !!userProfile.age;
      case 6: return !!userProfile.employment;
      case 7: 
        switch(userProfile.employment) {
          case 'student': return !!userProfile.studentLevel && !!userProfile.studentInstitutionType;
          case 'unemployed_youth': return !!userProfile.unemployedQualification;
          case 'gig_worker': return !!userProfile.gigPlatform && !!userProfile.gigVehicle;
          case 'active_farmer': return !!userProfile.landArea && !!userProfile.farmerType;
          case 'fisherman_coastal': return !!userProfile.fishermanType;
          case 'handloom_weaver': return !!userProfile.weaverLoomType;
          case 'private_sector': return true;
          default: return true;
        }
      case 8: return true;
      case 9: return !!userProfile.maritalStatus;
      case 10: return !!authUser;
      case 11: return userProfile.isDifferentlyAbled !== undefined;
      default: return true;
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
        <div className="flex gap-1 mb-12">
          {[...Array(13)].map((_, idx) => {
            const isActive = step >= idx;
            return (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${isActive ? 'flex-1 bg-tvk-maroon' : 'w-2 bg-zinc-200'}`}
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

            {/* Step 2: Gender */}
            {step === 2 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Select your gender' : 'தங்களின் பாலினத்தைத் தேர்ந்தெடுக்கவும்'}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  {[
                    { id: 'male', en: 'Male', ta: 'ஆண்' },
                    { id: 'female', en: 'Female', ta: 'பெண்' },
                    { id: 'other', en: 'Other', ta: 'மற்றவை' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setUserProfile({ gender: opt.id as any });
                        nextStep();
                      }}
                      className={`flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl border-2 font-black text-base sm:text-lg transition-all duration-300
                        ${userProfile.gender === opt.id 
                          ? 'border-tvk-maroon bg-tvk-maroon/5 text-tvk-maroon' 
                          : 'border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200'}`}
                    >
                      {isEn ? opt.en : opt.ta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Mobile Number */}
            {step === 3 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Enter your mobile number' : 'உங்கள் மொபைல் எண்ணை உள்ளிடவும்'}
                </h2>
                <div className="flex gap-4">
                  <div className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 py-4 sm:py-6 text-xl sm:text-2xl font-bold text-zinc-400 flex items-center">
                    +91
                  </div>
                  <input 
                    type="tel" 
                    maxLength={10}
                    autoFocus
                    placeholder="9876543210"
                    value={userProfile.mobileNumber}
                    onChange={(e) => setUserProfile({ mobileNumber: e.target.value.replace(/\D/g, '') })}
                    className="flex-1 w-full text-xl sm:text-2xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-2xl px-6 sm:px-8 py-4 sm:py-6 outline-none transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Step 4: District & Pincode */}
            {step === 4 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Location details' : 'இருப்பிட விவரங்கள்'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block mb-2">{isEn ? 'District' : 'மாவட்டம்'}</label>
                    <input 
                      type="text" 
                      placeholder={isEn ? "e.g. Chennai" : "உ-ம். சென்னை"}
                      value={userProfile.district}
                      onChange={(e) => setUserProfile({ district: e.target.value })}
                      className="w-full text-lg sm:text-xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-xl px-6 py-4 outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block mb-2">{isEn ? 'Pincode' : 'அஞ்சல் குறியீடு'}</label>
                    <input 
                      type="text" 
                      maxLength={6}
                      placeholder="600001"
                      value={userProfile.pincode}
                      onChange={(e) => setUserProfile({ pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full text-lg sm:text-xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-xl px-6 py-4 outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Age */}
            {step === 5 && (
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

            {/* Step 6: Employment */}
            {step === 6 && (
              <div className="space-y-5 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Select your employment status' : 'உங்களின் தற்போதைய வேலைவாய்ப்பு நிலை:'}
                </h2>
                <div className="grid gap-2 sm:gap-3 max-h-[45vh] sm:max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {employmentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setUserProfile({ employment: opt.id });
                        nextStep();
                      }}
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

            {/* Step 7: Employment Specifics */}
            {step === 7 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Employment Details' : 'வேலைவாய்ப்பு விவரங்கள்'}
                </h2>
                <div className="space-y-4">
                  
                  {userProfile.employment === 'student' && (
                    <>
                      <select value={userProfile.studentLevel || ''} onChange={e => setUserProfile({studentLevel: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Select Level of Study' : 'கல்வி நிலை'}</option>
                        <option value="school">{isEn ? 'School (10th/12th)' : 'பள்ளி (10/12ஆம் வகுப்பு)'}</option>
                        <option value="iti_diploma">{isEn ? 'ITI / Diploma' : 'ஐ.டி.ஐ / பட்டயப்படிப்பு'}</option>
                        <option value="ug">{isEn ? 'UG (Undergraduate)' : 'இளங்கலை பட்டம்'}</option>
                        <option value="pg">{isEn ? 'PG (Postgraduate) / Ph.D' : 'முதுகலை பட்டம் / ஆராய்ச்சி'}</option>
                      </select>
                      <select value={userProfile.studentInstitutionType || ''} onChange={e => setUserProfile({studentInstitutionType: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Institution Type' : 'நிறுவனத்தின் வகை'}</option>
                        <option value="government">{isEn ? 'Government' : 'அரசு'}</option>
                        <option value="aided">{isEn ? 'Govt Aided' : 'அரசு உதவிபெறும்'}</option>
                        <option value="private">{isEn ? 'Private' : 'தனியார்'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.studentFirstGen || false} onChange={e => setUserProfile({studentFirstGen: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'First Generation Learner' : 'முதல் தலைமுறை பட்டதாரி'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'unemployed_youth' && (
                    <>
                      <select value={userProfile.unemployedQualification || ''} onChange={e => setUserProfile({unemployedQualification: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Highest Qualification' : 'உயர்ந்த கல்வித்தகுதி'}</option>
                        <option value="10th">{isEn ? '10th' : '10ஆம் வகுப்பு'}</option>
                        <option value="12th">{isEn ? '12th' : '12ஆம் வகுப்பு'}</option>
                        <option value="degree">{isEn ? 'Degree' : 'பட்டம்'}</option>
                        <option value="diploma">{isEn ? 'Diploma' : 'பட்டயப்படிப்பு'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.unemployedRegistered || false} onChange={e => setUserProfile({unemployedRegistered: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Registered in Employment Exchange?' : 'வேலைவாய்ப்பு அலுவலகத்தில் பதிவு செய்துள்ளீர்களா?'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'gig_worker' && (
                    <>
                      <select value={userProfile.gigPlatform || ''} onChange={e => setUserProfile({gigPlatform: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Primary Platform' : 'முதன்மை தளம்'}</option>
                        <option value="swiggy_zomato">{isEn ? 'Swiggy / Zomato' : 'ஸ்விக்கி / சொமாட்டோ'}</option>
                        <option value="uber_ola">{isEn ? 'Uber / Ola' : 'உபெர் / ஓலா'}</option>
                        <option value="rapido">{isEn ? 'Rapido' : 'ராபிடோ'}</option>
                        <option value="other">{isEn ? 'Other' : 'மற்றவை'}</option>
                      </select>
                      <select value={userProfile.gigVehicle || ''} onChange={e => setUserProfile({gigVehicle: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Vehicle Type' : 'வாகனத்தின் வகை'}</option>
                        <option value="2w">{isEn ? '2-Wheeler' : 'இருசக்கர வாகனம்'}</option>
                        <option value="3w">{isEn ? '3-Wheeler (Auto)' : 'முச்சக்கர வாகனம் (ஆட்டோ)'}</option>
                        <option value="4w">{isEn ? '4-Wheeler (Cab)' : 'நான்கு சக்கர வாகனம் (கார்)'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.gigRegisteredWelfare || false} onChange={e => setUserProfile({gigRegisteredWelfare: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Registered with Welfare Board?' : 'நல வாரியத்தில் பதிவு செய்துள்ளீர்களா?'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'active_farmer' && (
                    <>
                      <div>
                        <label className="text-xs font-black uppercase tracking-widest text-zinc-500 block mb-2">{isEn ? 'Land Area (Acres)' : 'நில அளவு (ஏக்கரில்)'}</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 2.5"
                          value={userProfile.landArea || ''}
                          onChange={(e) => setUserProfile({ landArea: Number(e.target.value) })}
                          className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none"
                        />
                      </div>
                      <select value={userProfile.farmerType || ''} onChange={e => setUserProfile({farmerType: e.target.value as any})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Farmer Type' : 'விவசாயி வகை'}</option>
                        <option value="landowner">{isEn ? 'Landowner' : 'சொந்த நிலம்'}</option>
                        <option value="tenant">{isEn ? 'Tenant / Kuthagai' : 'குத்தகை'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.farmerPmKisan || false} onChange={e => setUserProfile({farmerPmKisan: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Do you have a PM-KISAN/State ID?' : 'PM-KISAN/அரசு ஐடி உள்ளதா?'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'fisherman_coastal' && (
                    <>
                      <select value={userProfile.fishermanType || ''} onChange={e => setUserProfile({fishermanType: e.target.value})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Type of Fishing' : 'மீன்பிடி வகை'}</option>
                        <option value="mechanized">{isEn ? 'Mechanized Boat' : 'விசைப்படகு'}</option>
                        <option value="non_mechanized">{isEn ? 'Country Boat' : 'நாட்டுப்படகு'}</option>
                        <option value="inland">{isEn ? 'Inland' : 'உள்நாட்டு மீன்பிடி'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.fishermanRegistered || false} onChange={e => setUserProfile({fishermanRegistered: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Fishermen Cooperative Member?' : 'மீனவர் கூட்டுறவு சங்க உறுப்பினரா?'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'handloom_weaver' && (
                    <>
                      <select value={userProfile.weaverLoomType || ''} onChange={e => setUserProfile({weaverLoomType: e.target.value as any})} className="w-full text-lg font-bold bg-zinc-50 border-2 border-zinc-100 rounded-xl px-4 py-4 outline-none">
                        <option value="" disabled>{isEn ? 'Loom Type' : 'தறி வகை'}</option>
                        <option value="handloom">{isEn ? 'Handloom' : 'கைத்தறி'}</option>
                        <option value="powerloom">{isEn ? 'Powerloom' : 'விசைத்தறி'}</option>
                      </select>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.weaverCoop || false} onChange={e => setUserProfile({weaverCoop: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Part of Cooperative Society?' : 'கூட்டுறவு சங்கத்தில் உறுப்பினரா?'}</span>
                      </label>
                    </>
                  )}

                  {userProfile.employment === 'private_sector' && (
                    <>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.privateVendor || false} onChange={e => setUserProfile({privateVendor: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Are you a Street Vendor?' : 'நீங்கள் தெரு வியாபாரியா?'}</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 bg-zinc-50 border-2 border-zinc-100 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={userProfile.privatePfEsi || false} onChange={e => setUserProfile({privatePfEsi: e.target.checked})} className="w-5 h-5 accent-tvk-maroon"/>
                        <span className="font-bold text-sm">{isEn ? 'Do you have PF / ESI?' : 'உங்களுக்கு PF / ESI உள்ளதா?'}</span>
                      </label>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 8: Income */}
            {step === 8 && (
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                  {isEn ? 'Enter your monthly family income (₹):' : 'குடும்பத்தின் மாத வருமானம் (₹):'}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-zinc-50 border-2 border-zinc-100 rounded-2xl px-4 py-4 sm:py-6 text-xl sm:text-2xl font-bold text-zinc-400 flex items-center">
                      ₹
                    </div>
                    <input 
                      type="number" 
                      autoFocus
                      placeholder={isEn ? "e.g. 15000" : "உ-ம். 15000"}
                      value={userProfile.monthlyIncome || ''}
                      onChange={(e) => setUserProfile({ monthlyIncome: Number(e.target.value) })}
                      className="flex-1 w-full text-xl sm:text-2xl font-bold bg-zinc-50 border-2 border-zinc-100 focus:border-tvk-yellow rounded-2xl px-6 sm:px-8 py-4 sm:py-6 outline-none transition-all duration-300 appearance-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Marital */}
            {step === 9 && (
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
                      onClick={() => {
                        setUserProfile({ maritalStatus: opt.id as 'single' | 'married' });
                        nextStep();
                      }}
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

            {/* Step 10: Login */}
            {step === 10 && (
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
                        <p className="text-base sm:text-lg font-black text-zinc-900">{userProfile.name || authUser.displayName}</p>
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
                          <GoogleIcon />
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

            {/* Step 11: Disability */}
            {step === 11 && (
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

            {/* Step 12: Final Review */}
            {step === 12 && (
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
                  disabled={!isStepValid() || isSaving}
                  className={`flex items-center gap-2 bg-tvk-maroon text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs transition hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100
                    ${(step === 10 && !authUser) ? 'hidden' : 'flex'}`}
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : step === 12 ? (isEn ? 'Complete →' : 'முடிக்க →') : (isEn ? 'Continue' : 'தொடர')}
                  {!isSaving && step !== 12 && <ChevronRight size={14} />}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
