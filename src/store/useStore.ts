import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ta';

export interface UserProfile {
  language: Language;
  name: string;
  gender: 'male' | 'female' | 'other' | '';
  mobileNumber: string;
  district: string;
  pincode: string;
  age: number;
  employment: string;
  
  // Employment specific fields
  studentLevel?: string;
  studentInstitutionType?: string;
  studentFirstGen?: boolean;
  unemployedQualification?: string;
  unemployedRegistered?: boolean;
  gigPlatform?: string;
  gigVehicle?: string;
  gigRegisteredWelfare?: boolean;
  farmerType?: 'landowner' | 'tenant' | '';
  farmerPmKisan?: boolean;
  fishermanType?: string;
  fishermanRegistered?: boolean;
  weaverLoomType?: 'handloom' | 'powerloom' | '';
  weaverCoop?: boolean;
  privateVendor?: boolean;
  privatePfEsi?: boolean;

  landArea?: number;
  monthlyIncome: number;
  maritalStatus: 'single' | 'married' | '';
  isDifferentlyAbled: boolean;
}

interface AppState {
  viewState: 'landing' | 'onboarding' | 'dashboard' | 'manifesto';
  userProfile: UserProfile;
  authUser: any | null;
  manifestoOpen: boolean;
  onboardingStep: number;
  setViewState: (view: 'landing' | 'onboarding' | 'dashboard' | 'manifesto') => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setAuthUser: (user: any | null) => void;
  setManifestoOpen: (open: boolean) => void;
  setOnboardingStep: (step: number | ((prev: number) => number)) => void;
  resetProfile: () => void;
}

const initialProfile: UserProfile = {
  language: 'en',
  name: '',
  gender: '',
  mobileNumber: '',
  district: '',
  pincode: '',
  age: 0,
  employment: '',
  monthlyIncome: 0,
  maritalStatus: '',
  isDifferentlyAbled: false,
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      viewState: 'landing',
      userProfile: initialProfile,
      authUser: null,
      manifestoOpen: false,
      onboardingStep: 0,
      setViewState: (view) => set({ viewState: view }),
      setUserProfile: (profile) =>
        set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
      setAuthUser: (user) => set({ authUser: user }),
      setManifestoOpen: (open) => set({ manifestoOpen: open }),
      setOnboardingStep: (step) => set((state) => ({
        onboardingStep: typeof step === 'function' ? step(state.onboardingStep) : step
      })),
      resetProfile: () =>
        set((state) => ({ 
          userProfile: { ...initialProfile, language: state.userProfile.language }, 
          viewState: 'landing', 
          manifestoOpen: false, 
          onboardingStep: 0 
        })),
    }),
    {
      name: 'makkal-connect-store', // localStorage key
      // Only persist viewState and userProfile — authUser is a Firebase object so we skip it
      partialize: (state) => ({
        viewState: state.viewState,
        userProfile: state.userProfile,
        onboardingStep: state.onboardingStep,
      }),
    }
  )
);
