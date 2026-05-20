import React, { useState } from 'react';
import tvkLeader from '@/assets/vijay_anna.png';

export function PremiumOnboarding({ onComplete, user, onGoogleLogin, onLoginClick }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    language: '',
    name: '',
    age: '',
    employment: '',
    landArea: '',
    income: 5000,
    isDifferentlyAbled: false
  });

  const employmentOptions = [
    { id: 'student', en: 'Student / Higher Education', ta: 'மாணவர் / உயர்கல்வி' },
    { id: 'unemployed', en: 'Unemployed Youth / Job Seeker', ta: 'வேலைவாய்ப்பற்ற இளைஞர் / வேலை தேடுபவர்' },
    { id: 'gig_worker', en: 'Gig Worker / App-based Delivery & Transit', ta: 'ஆப் ஊழியர் / விநியோகம் மற்றும் போக்குவரத்துப் பிரிவு' },
    { id: 'farmer', en: 'Active Farmer / Land Laborer', ta: 'விவசாயி / விவசாயத் தொழிலாளர்' },
    { id: 'fisherman', en: 'Fisherman / Coastal Laborer', ta: 'மீனவர் / கடலோரத் தொழிலாளர்' },
    { id: 'weaver', en: 'Handloom Weaver / Artisan', ta: 'நெசவாளர் / கைவினைஞர்' },
    { id: 'private', en: 'Private Sector / Self-Employed', ta: 'தனியார் துறை / சுயதொழில்' }
  ];

  const handleNext = () => {
    if (step === 0) setStep(1);
    else if (step === 5) setStep(6);
    else if (step === 6) setStep(7);
    else if (step === 7) {
      if (formData.employment === 'farmer') setStep(8);
      else setStep(9); // skip land step
    }
    else if (step === 9 || (step === 8 && formData.employment === 'farmer')) {
      if (step === 9) onComplete(formData);
      else setStep(9);
    }
    else setStep(s => s + 1);
  };

  const handleBack = () => {
    if (step === 1) setStep(0);
    else if (step === 9 && formData.employment !== 'farmer') setStep(7);
    else setStep(s => Math.max(0, s - 1));
  };

  const isNextDisabled = () => {
    if (step === 1 && !formData.language) return true;
    if (step === 2 && !formData.name.trim()) return true;
    if (step === 3 && !formData.age) return true;
    if (step === 4 && !formData.mobile.trim()) return true;
    if (step === 6 && !formData.employment) return true;
    if (step === 7 && !user) return true;
    if (step === 8 && formData.employment === 'farmer' && !formData.landArea) return true;
    return false;
  };

  const isEn = formData.language === 'en' || !formData.language;

  // Render Hero (Step 0)
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#800020] via-[#500014] to-[#2d000b] flex items-center justify-center p-6 sm:p-12 font-sans overflow-hidden relative">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#ffcc00]/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Floating Language Switcher for initial state */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <button 
            onClick={() => setFormData(prev => ({ ...prev, language: 'en' }))}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer border ${formData.language === 'en' || !formData.language ? 'bg-[#ffcc00] border-[#ffcc00] text-[#1a1a1a]' : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'}`}
          >
            English
          </button>
          <button 
            onClick={() => setFormData(prev => ({ ...prev, language: 'ta' }))}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer border ${formData.language === 'ta' ? 'bg-[#ffcc00] border-[#ffcc00] text-[#1a1a1a]' : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'}`}
          >
            தமிழ்
          </button>
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center z-10 relative">
          
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              {isEn ? (
                <>Welfare Guidance <br/><span className="text-[#ffcc00] drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">Portal</span></>
              ) : (
                <>மக்கள் <br/><span className="text-[#ffcc00] drop-shadow-[0_0_15px_rgba(255,204,0,0.3)]">நலவழிகாட்டித் தளம்</span></>
              )}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-bold max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {isEn 
                ? "Navigate your eligibility for state welfare programs seamlessly. Provide basic parameters to calculate your guaranteed entitlements." 
                : "மாநில மக்கள் நலத்திட்டங்களுக்கான உங்கள் தகுதியை தடையின்றி அறியுங்கள். உங்கள் உத்தரவாதமான உரிமைகளை கணக்கிட அடிப்படை விவரங்களை வழங்கவும்."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0">
              <button
                onClick={() => setStep(1)}
                className="bg-[#ffcc00] hover:bg-[#ffb800] text-[#1a1a1a] text-lg font-black uppercase tracking-widest px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(255,204,0,0.4)] hover:shadow-[0_0_60px_rgba(255,204,0,0.6)] cursor-pointer border border-[#ffcc00]/50 flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                {isEn ? "Get Your Schemes →" : "உங்கள் திட்டங்களை அறிய →"}
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative group animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ffcc00]/30 to-[#800020]/30 rounded-[3rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative bg-gradient-to-b from-[#2d000b] to-[#1a0005] border border-[#ffcc00]/20 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden aspect-[4/5] w-[300px] sm:w-[360px]">
                <img 
                  src={tvkLeader} 
                  alt="Leader" 
                  className="w-full h-full object-cover rounded-[2rem] filter contrast-125 saturate-110"
                />
                <div className="absolute bottom-4 inset-x-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                  <p className="text-[#ffcc00] font-black tracking-widest uppercase text-sm">Thalapathy Vijay</p>
                  <p className="text-white/60 text-[10px] tracking-wider uppercase mt-1">Founder-President, TVK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Wizard
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8 font-sans transition-colors duration-700 relative overflow-hidden">
      
      <div className="absolute top-8 left-8 text-[#800020] font-black uppercase tracking-widest text-sm flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ffcc00]"></span> Makkal Connect
      </div>

      <div className="w-full max-w-xl animate-[float_8s_ease-in-out_infinite]">
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 transition-all duration-500 relative">
          
          <div className="flex gap-2 mb-10 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => {
              if (idx === 8 && formData.employment && formData.employment !== 'farmer') return null;
              const isActive = step >= idx;
              return (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${isActive ? 'w-8 bg-[#800020]' : 'w-2 bg-zinc-200'}`}
                />
              )
            })}
          </div>

          <div className="min-h-[220px] flex flex-col justify-center relative">
            {step === 1 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">
                  Choose Your Preferred Language / <span className="text-[#800020]">மொழியைத் தேர்ந்தெடுக்கவும்</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={() => { setFormData({...formData, language: 'en'}); setStep(2); }}
                    className={`w-full text-center px-6 py-5 rounded-2xl border-2 font-black text-lg transition-all duration-300 outline-none cursor-pointer
                      ${formData.language === 'en' 
                        ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm scale-[1.01]' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#ffcc00]'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setFormData({...formData, language: 'ta'}); setStep(2); }}
                    className={`w-full text-center px-6 py-5 rounded-2xl border-2 font-black text-lg transition-all duration-300 outline-none cursor-pointer
                      ${formData.language === 'ta' 
                        ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm scale-[1.01]' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#ffcc00]'}`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "What is your full name?" : "தங்களின் முழுப் பெயர் என்ன?"}</h2>
                <input 
                  type="text" 
                  autoFocus
                  placeholder={isEn ? "e.g. Karthik" : "உ-ம். கார்த்திக்"}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  className="w-full text-xl font-bold bg-zinc-50/50 border-2 border-zinc-200 text-[#1a1a1a] placeholder-zinc-300 rounded-2xl px-6 py-5 outline-none transition-all duration-300 focus:border-[#ffcc00] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,204,0,0.1)]"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "What is your age?" : "தங்களின் வயது என்ன?"}</h2>
                <input 
                  type="number" 
                  autoFocus
                  placeholder={isEn ? "e.g. 28" : "உ-ம். 28"}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  className="w-full text-xl font-bold bg-zinc-50/50 border-2 border-zinc-200 text-[#1a1a1a] placeholder-zinc-300 rounded-2xl px-6 py-5 outline-none transition-all duration-300 focus:border-[#ffcc00] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,204,0,0.1)] appearance-none"
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "What is your mobile number?" : "தங்களின் அலைபேசி எண் என்ன?"}</h2>
                <input 
                  type="tel" 
                  autoFocus
                  placeholder={isEn ? "e.g. 9876543210" : "உ-ம். 9876543210"}
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  className="w-full text-xl font-bold bg-zinc-50/50 border-2 border-zinc-200 text-[#1a1a1a] placeholder-zinc-300 rounded-2xl px-6 py-5 outline-none transition-all duration-300 focus:border-[#ffcc00] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,204,0,0.1)] appearance-none"
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "Are you differently-abled?" : "நீங்கள் மாற்றுத்திறனாளியா?"}</h2>
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => { setFormData({...formData, isDifferentlyAbled: true}); setStep(6); }}
                    className={`flex-1 text-center px-6 py-5 rounded-2xl border-2 font-black text-lg transition-all duration-300 outline-none cursor-pointer
                      ${formData.isDifferentlyAbled === true 
                        ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm scale-[1.01]' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#ffcc00]'}`}
                  >
                    {isEn ? "Yes" : "ஆம்"}
                  </button>
                  <button
                    onClick={() => { setFormData({...formData, isDifferentlyAbled: false}); setStep(6); }}
                    className={`flex-1 text-center px-6 py-5 rounded-2xl border-2 font-black text-lg transition-all duration-300 outline-none cursor-pointer
                      ${formData.isDifferentlyAbled === false 
                        ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm scale-[1.01]' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#ffcc00]'}`}
                  >
                    {isEn ? "No" : "இல்லை"}
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "Select your employment status:" : "உங்களின் தற்போதைய வேலைவாய்ப்பு நிலை:"}</h2>
                <div className="flex flex-col gap-3">
                  {employmentOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setFormData({...formData, employment: opt.id}); }}
                      className={`text-left px-5 py-4 rounded-2xl border-2 font-bold text-sm transition-all duration-300 outline-none cursor-pointer
                        ${formData.employment === opt.id 
                          ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm scale-[1.01]' 
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 focus:border-[#ffcc00]'}`}
                    >
                      {isEn ? opt.en : opt.ta}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards] text-center flex flex-col justify-center items-center py-6">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight mb-4">
                  {isEn ? "Verify Your Identity" : "அடையாளத்தை உறுதிப்படுத்தவும்"}
                </h2>
                <p className="text-zinc-500 text-sm font-bold mb-8">
                  {isEn ? "Secure your session by authenticating with Google." : "கூகுள் கணக்கைப் பயன்படுத்தி உள்நுழையவும்."}
                </p>
                {!user ? (
                  <button 
                    onClick={async () => {
                      if (onGoogleLogin) await onGoogleLogin();
                    }}
                    className="flex items-center gap-3 bg-white border-2 border-zinc-200 hover:border-[#800020] text-zinc-700 font-black text-lg px-8 py-4 rounded-2xl shadow-sm transition-all hover:bg-zinc-50 cursor-pointer"
                  >
                    <span className="text-2xl">🌐</span> {isEn ? "Login with Google" : "கூகுள் மூலம் நுழைய"}
                  </button>
                ) : (
                  <div className="bg-[#800020]/10 border-2 border-[#800020]/20 text-[#800020] font-black text-lg px-8 py-4 rounded-2xl flex items-center gap-3">
                    ✅ {isEn ? `Welcome, ${user.displayName?.split(' ')[0]}` : `வணக்கம், ${user.displayName?.split(' ')[0]}`}
                  </div>
                )}
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "Total land ownership area (in Acres):" : "மொத்த நில உடைமை அளவு (ஏக்கரில்):"}</h2>
                <input 
                  type="number" 
                  autoFocus
                  placeholder={isEn ? "e.g. 2.5" : "உ-ம். 2.5"}
                  step="0.1"
                  value={formData.landArea}
                  onChange={(e) => setFormData({...formData, landArea: e.target.value})}
                  onKeyDown={(e) => { if(e.key === 'Enter' && !isNextDisabled()) handleNext(); }}
                  className="w-full text-xl font-bold bg-zinc-50/50 border-2 border-zinc-200 text-[#1a1a1a] placeholder-zinc-300 rounded-2xl px-6 py-5 outline-none transition-all duration-300 focus:border-[#ffcc00] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,204,0,0.1)] appearance-none"
                />
              </div>
            )}

            {step === 9 && (
              <div className="space-y-8 animate-[fadeInUp_0.4s_ease-out_forwards]">
                <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight">{isEn ? "Enter your monthly family income (₹):" : "குடும்பத்தின் மாத வருமானம் (₹):"}</h2>
                
                <div className="pt-6 pb-2">
                  <div className="relative">
                    <input 
                      type="range" 
                      min="0" 
                      max="150000" 
                      step="1000"
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: Number(e.target.value)})}
                      className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#800020] hover:accent-[#ffcc00] transition-all"
                    />
                  </div>
                  <div className="mt-8 relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-400">₹</span>
                    <input 
                      type="number" 
                      value={formData.income}
                      onChange={(e) => setFormData({...formData, income: Number(e.target.value)})}
                      className="w-full text-3xl font-black bg-zinc-50/50 border-2 border-zinc-200 text-[#800020] rounded-2xl pl-14 pr-6 py-4 outline-none transition-all duration-300 focus:border-[#ffcc00] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,204,0,0.1)] appearance-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-zinc-100">
            <button 
              onClick={handleBack}
              className="text-zinc-400 hover:text-zinc-600 font-bold text-sm tracking-wider uppercase px-4 py-2 transition-colors cursor-pointer"
            >
              {isEn ? "← Back" : "← பின்செல்"}
            </button>
            {!(step === 7 && !user) && (
              <button 
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`font-black text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm
                  ${isNextDisabled() 
                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed' 
                    : 'bg-[#800020] hover:bg-[#600018] text-white hover:shadow-md cursor-pointer hover:-translate-y-0.5'}`}
              >
                {step === 9 ? (isEn ? 'Complete →' : 'முடிக்க →') : (isEn ? 'Continue →' : 'தொடர →')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
