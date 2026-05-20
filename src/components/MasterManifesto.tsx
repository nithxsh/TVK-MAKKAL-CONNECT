import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { 
  Search, 
  ChevronLeft, 
  ChevronDown, 
  ExternalLink, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Sprout, 
  Home, 
  Heart, 
  Anchor, 
  Palette, 
  Accessibility, 
  Zap 
} from 'lucide-react';
import tvkLogo from '../assets/tvk logo.jpg';

interface ManifestoModule {
  id: string;
  sector: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  checklist: string[];
}

const MANIFESTO_DATA: ManifestoModule[] = [
  // 1. HIGHER EDUCATION & STUDENT WELFARE
  {
    id: 'STU_01',
    sector: 'Higher Education',
    title: 'Education Loan Interest Waiver Scheme',
    description: 'The state government will directly absorb all interest components on active higher education loans until graduation, relieving families of financial burden during job-seeking periods.',
    icon: <GraduationCap size={20} />,
    checklist: ['Active Loan Statement', 'College ID Card', 'Native Resident Certificate']
  },
  {
    id: 'STU_02',
    sector: 'Higher Education',
    title: 'Advanced Tech Kit & Travel Assistance',
    description: 'Distribution of advanced laptops for technical and digital skills training, coupled with fully subsidized, cost-free public transport passes for all active students.',
    icon: <GraduationCap size={20} />,
    checklist: ['Student ID Card', 'Course Completion Certificate', 'Aadhaar Card']
  },
  // 2. UNEMPLOYED YOUTH SUPPORT
  {
    id: 'EMP_01',
    sector: 'Unemployed Youth',
    title: 'Monthly Unemployment Allowance',
    description: 'Provides a direct financial stipend of $4,000 per month to eligible unemployed graduates to support essential livelihood and job-hunting application costs.',
    icon: <Briefcase size={20} />,
    checklist: ['Degree Certificate', 'Employment Exchange Registration', 'Income Certificate']
  },
  {
    id: 'EMP_02',
    sector: 'Unemployed Youth',
    title: 'Skill Placement & Employment Assistance',
    description: 'Offers specialized industrial and digital skill training with an additional monthly stipend of $10,000 during the active internship period, ensuring direct placement pipelines.',
    icon: <Briefcase size={20} />,
    checklist: ['Educational Qualifications', 'Aadhaar Card', 'Passport Size Photo']
  },
  // 3. GIG ECONOMY WORKERS PROTECTION CHARTER
  {
    id: 'GIG_01',
    sector: 'Gig Economy',
    title: '$20 Minimum Statutory Base Pay',
    description: 'Legally establishes a mandatory base rate of $20 per kilometer for all delivery partners and transit drivers, completely insulating daily livelihoods from volatile fuel price spikes.',
    icon: <ShieldCheck size={20} />,
    checklist: ['Platform Worker ID', 'Driving License', 'Vehicle Registration']
  },
  {
    id: 'GIG_02',
    sector: 'Gig Economy',
    title: 'Unorganised Workers Welfare Board Integration',
    description: 'Enables automatic registration into the State Welfare Board network, guaranteeing comprehensive accident insurance, medical claim structures, and old-age safety pensions.',
    icon: <ShieldCheck size={20} />,
    checklist: ['Worker ID Card', 'Bank Passbook', 'Family Ration Card']
  },
  {
    id: 'GIG_03',
    sector: 'Gig Economy',
    title: 'Anti-Algorithmic Target Exploitation Ban',
    description: 'Strictly prohibits predatory algorithms that enforce high-pressure delivery windows, ensuring workplace safety and reducing mental and physical stress on the road.',
    icon: <ShieldCheck size={20} />,
    checklist: ['Platform Registration Details', 'Working Hours Record']
  },
  {
    id: 'GIG_04',
    sector: 'Gig Economy',
    title: 'ID Suspension Protection Framework',
    description: 'Mandates a multi-tier legal arbitration committee review before corporate platforms can unilaterally suspend or block a worker\'s digital terminal access ID.',
    icon: <ShieldCheck size={20} />,
    checklist: ['ID Suspension Notice (if any)', 'Legal Representation Form']
  },
  // 4. AGRICULTURAL & AGRITECH INFRASTRUCTURE
  {
    id: 'AGR_01',
    sector: 'Agriculture',
    title: 'Comprehensive Crop Insurance & MSP Guarantee',
    description: 'Secures full insurance parameters against seasonal structural crop failures, backed by a guaranteed legal Minimum Support Price matrix for all yield productions.',
    icon: <Sprout size={20} />,
    checklist: ['Land Ownership Record (Patta)', 'Crop Sowing Certificate', 'Bank Account Details']
  },
  {
    id: 'AGR_02',
    sector: 'Agriculture',
    title: 'Free Agricultural Power & Input Subsidy Matrix',
    description: 'Provides uninterrupted free high-tension electrical supply for farm irrigation along with direct subvention frameworks for seasonal fertilizers and organic inputs.',
    icon: <Sprout size={20} />,
    checklist: ['Farmer ID Card', 'Electricity Connection Details', 'Land Tax Receipt']
  },
  // 5. UNIVERSAL HOUSEHOLD STABILIZATION NET
  {
    id: 'HH_01',
    sector: 'Household Welfare',
    title: 'Madhippumigu Magalir Thittam',
    description: 'A direct financial empowerment grant of $2,500 per month transferred directly to the bank accounts of women heads of households to secure monthly domestic stability.',
    icon: <Home size={20} />,
    checklist: ['Ration Card', 'Bank Passbook', 'Aadhaar Card']
  },
  {
    id: 'HH_02',
    sector: 'Household Welfare',
    title: 'Annan Seer Thittam',
    description: 'A marriage assistance endowment package offering 1 sovereign pure gold along with an official traditional silk saree allocation to support eligible low-income families.',
    icon: <Home size={20} />,
    checklist: ['Marriage Invitation', 'Income Certificate', 'Community Certificate']
  },
  {
    id: 'HH_03',
    sector: 'Household Welfare',
    title: 'Yearly 6 Free LPG Cylinders Scheme',
    description: 'Provides 6 completely subsidized, free domestic LPG cooking gas cylinders per year directly to eligible households to shield family monthly budgets from inflation and rising fuel costs.',
    icon: <Home size={20} />,
    checklist: ['LPG Connection Book', 'Aadhaar Card', 'Ration Card']
  },
  {
    id: 'HH_04',
    sector: 'Household Welfare',
    title: 'Universal Comprehensive Health Insurance Net',
    description: 'A zero-premium public medical insurance wrapper delivering cashless high-end critical treatment access across private and government healthcare institutions.',
    icon: <Home size={20} />,
    checklist: ['Health Insurance Card', 'Family Photo', 'Address Proof']
  },
  // 6. SENIOR CITIZENS & DESTITUTE SUPPORT
  {
    id: 'SEN_01',
    sector: 'Senior Citizens',
    title: 'Universal Senior Citizen Dignity Pension',
    description: 'Provides a non-contributory monthly security pension of $3,000 to all citizens above 60 years of age to ensure financial independence and dignity in their golden years.',
    icon: <Heart size={20} />,
    checklist: ['Age Proof (Aadhaar/Voter ID)', 'Bank Passbook', 'Residence Certificate']
  },
  {
    id: 'SEN_02',
    sector: 'Senior Citizens',
    title: 'Destitute & Widow Livelihood Protection Net',
    description: 'Specialized financial aid paired with priority vocational training grants for destitute women and widows to secure independent household stability.',
    icon: <Heart size={20} />,
    checklist: ['Death Certificate of Spouse', 'Income Certificate', 'Destitute Widow Certificate']
  },
  // 7. FISHERMEN & COASTAL ECONOMY WELFARE
  {
    id: 'FISH_01',
    sector: 'Coastal Welfare',
    title: 'Lean Season Subvention & Smart Subsidy Net',
    description: 'Provides an enhanced financial relief package of $15,000 during the annual fishing ban period, coupled with fully subsidized marine fuel allocations.',
    icon: <Anchor size={20} />,
    checklist: ['Fisherman ID Card', 'Bank Passbook', 'Cooperative Society Membership']
  },
  {
    id: 'FISH_02',
    sector: 'Coastal Welfare',
    title: 'Advanced Marine Safety & Cold-Chain Infrastructure',
    description: 'Deployment of satellite-linked navigation rescue devices for deep-sea safety, alongside setting up free solar-powered cold storage hubs at major coastal landing centers.',
    icon: <Anchor size={20} />,
    checklist: ['Boat Registration', 'Fisherman ID Card', 'Safety Equipment List']
  },
  // 8. HANDLOOM WEAVERS & ARTISANS UPGRADES
  {
    id: 'WEV_01',
    sector: 'Handloom & Artisans',
    title: 'Free Power Allocation & Raw Material Subvention',
    description: 'Guarantees up to 500 units of free electricity for handloom units and 1000 units for powerloom units, paired with subsidized high-quality yarn supply.',
    icon: <Palette size={20} />,
    checklist: ['Loom Registration Certificate', 'Electricity Bill', 'Weaver ID Card']
  },
  {
    id: 'WEV_02',
    sector: 'Handloom & Artisans',
    title: 'Artisan Modernization & Global Market Bridge',
    description: 'Provides zero-interest modernization loans for advanced loom upgrades, integrated with a state-backed e-commerce platform for direct global sales without middlemen.',
    icon: <Palette size={20} />,
    checklist: ['Modernization Plan', 'Bank Loan Application', 'Artisan Card']
  },
  // 9. INCLUSIVE DIFFERENTLY-ABLED EMPOWERMENT
  {
    id: 'DIS_01',
    sector: 'Disability Empowerment',
    title: 'Universal Caregiver Allowance & Enhanced Pension',
    description: 'Elevates the monthly disability pension to $5,000, complemented by an additional caregiver stipend for families supporting individuals with high support needs.',
    icon: <Accessibility size={20} />,
    checklist: ['Disability ID (UDID)', 'Medical Certificate', 'Caregiver Aadhaar Card']
  },
  {
    id: 'DIS_02',
    sector: 'Disability Empowerment',
    title: 'Accessible Tech Integration & Barrier-Free Infrastructure',
    description: 'Provision of smart customized assistive mobility devices and screen-reading hardware, alongside enforcing mandatory barrier-free infrastructure across all public spaces.',
    icon: <Accessibility size={20} />,
    checklist: ['Disability ID Card', 'Requirement Assessment Form']
  },
  // 10. SUSTAINABLE ENVIRONMENT & GREEN ENERGY
  {
    id: 'ENV_01',
    sector: 'Environment',
    title: 'Solar Rooftop Subvention & Clean Energy Incentive',
    description: 'Offers a 50% state capital subsidy for residential solar rooftop installations, actively promoting green energy self-sufficiency across clean households.',
    icon: <Zap size={20} />,
    checklist: ['Electricity Bill', 'Rooftop Layout Plan', 'Bank Account Details']
  },
  {
    id: 'ENV_02',
    sector: 'Environment',
    title: 'Pasumai Tamil Nadu Tree-Cover & Waterbody Restoration',
    description: 'A community-driven campaign for massive afforestation and mandatory desilting of traditional lakes, channels, and water catchments to elevate groundwater matrices.',
    icon: <Zap size={20} />,
    checklist: ['Volunteer Registration', 'Local Body NOC', 'Project Proposal']
  }
];

const SECTORS = [
  'All Modules',
  'Higher Education',
  'Unemployed Youth',
  'Gig Economy',
  'Agriculture',
  'Household Welfare',
  'Senior Citizens',
  'Coastal Welfare',
  'Handloom & Artisans',
  'Disability Empowerment',
  'Environment'
];

export const MasterManifesto: React.FC = () => {
  const { setViewState } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSector, setActiveSector] = useState('All Modules');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredModules = useMemo(() => {
    return MANIFESTO_DATA.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSector = activeSector === 'All Modules' || module.sector === activeSector;
      
      return matchesSearch && matchesSector;
    });
  }, [searchQuery, activeSector]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={tvkLogo} 
              alt="TVK Logo" 
              className="w-10 h-10 object-cover rounded-xl border border-zinc-100"
            />
            <div className="flex flex-col">
              <span className="text-tvk-maroon font-black uppercase tracking-tight text-lg leading-none">Makkal Connect</span>
              <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1">Master Manifesto</span>
            </div>
          </div>

          <button 
            onClick={() => setViewState('onboarding')}
            className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition hover:bg-tvk-maroon active:scale-95"
          >
            <ChevronLeft size={16} />
            Back to Eligibility Checker
          </button>
        </div>

        {/* Real-time Search Controller */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-tvk-yellow transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for schemes, keywords, or module IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 border-2 border-transparent focus:border-tvk-yellow focus:bg-white rounded-2xl pl-16 pr-8 py-5 outline-none font-bold text-zinc-900 placeholder:text-zinc-400 transition-all duration-300"
            />
          </div>
        </div>
      </nav>

      {/* Main Viewport */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 w-full">
        {/* Sidebar Navigation */}
        <aside className="lg:w-72 shrink-0 space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 ml-4">Policy Sectors</p>
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-between group
                ${activeSector === sector 
                  ? 'bg-tvk-maroon text-white shadow-xl shadow-tvk-maroon/20 translate-x-2' 
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-tvk-maroon'}`}
            >
              {sector}
              {activeSector === sector && (
                <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-tvk-yellow" />
              )}
            </button>
          ))}
        </aside>

        {/* Manifesto Stream */}
        <main className="flex-1 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-zinc-900 uppercase tracking-tight">
              {activeSector} <span className="text-zinc-300 ml-2 font-bold">({filteredModules.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredModules.map((module) => (
                <motion.div
                  key={module.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 100, damping: 14 }}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-tvk-yellow/50 hover:shadow-2xl hover:shadow-tvk-yellow/10 transition-colors"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-tvk-maroon group-hover:bg-tvk-maroon group-hover:text-white transition-colors duration-500">
                          {module.icon}
                        </div>
                        <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-500">
                          {module.sector}
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{module.id}</span>
                    </div>

                    <h3 className="text-xl font-black text-tvk-maroon uppercase tracking-tight leading-tight">
                      {module.title}
                    </h3>

                    <p className="text-zinc-500 text-xs font-semibold leading-relaxed">
                      {module.description}
                    </p>

                    {/* Expandable Utility Drawer */}
                    <div className="pt-2">
                      <button 
                        onClick={() => setExpandedCard(expandedCard === module.id ? null : module.id)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-tvk-maroon transition-colors"
                      >
                        Prerequisite Application Checklist
                        <ChevronDown size={14} className={`transition-transform duration-300 ${expandedCard === module.id ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedCard === module.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="pt-6 space-y-3">
                              {module.checklist.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-zinc-600">
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

                  <div className="pt-10">
                    <button className="w-full py-4 bg-tvk-yellow text-tvk-maroon rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition hover:bg-tvk-maroon hover:text-white active:scale-95 shadow-lg shadow-tvk-yellow/10">
                      Apply @ TN E-Sevai Portal
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredModules.length === 0 && (
            <div className="py-24 text-center space-y-4">
              <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-300">
                <BookOpen size={40} />
              </div>
              <p className="text-zinc-400 font-black uppercase tracking-widest text-sm">No modules found matching your search</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <div className="fixed bottom-8 right-8 lg:hidden z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-tvk-maroon text-tvk-yellow rounded-full flex items-center justify-center shadow-2xl active:scale-95"
        >
          <Search size={24} />
        </button>
      </div>
    </div>
  );
};
