import fs from 'fs';
const path = 'd:/makkal connect/src/App.jsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Add UniversalCard component before App
const universalCardCode = `
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

`;

content = content.replace('/* ─── APP ─────────────────────────────────────────────────────────── */', universalCardCode + '/* ─── APP ─────────────────────────────────────────────────────────── */');

// 2. Update status booleans
const newBooleans = `
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
`;

const oldBooleansRegex = /const currentStatus = profileData\.employment[\s\S]*?const isPrivate = !isStudent && !isUnemployed && !isGigWorker && !isFarmer;/m;
content = content.replace(oldBooleansRegex, newBooleans.trim());

// 3. Update the SCHEME DIRECTORY completely
const newDirectory = `
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
`;

const oldDirectoryRegex = /\{\/\* SCHEME DIRECTORY \*\/\}[\s\S]*?\{\/\* CONDITIONAL RENDERING RESULT METRICS \*\/\}/m;
content = content.replace(oldDirectoryRegex, newDirectory.trim() + '\n\n      {/* CONDITIONAL RENDERING RESULT METRICS */}');

fs.writeFileSync(path, content, 'utf8');
console.log('App.jsx Refactored successfully!');
