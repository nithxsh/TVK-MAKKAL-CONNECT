import { create } from 'zustand';

export type Language = 'en' | 'ta';

export interface UserProfile {
  language: Language;
  name: string;
  age: number;
  employment: string;
  landArea?: number;
  monthlyIncome: number;
  maritalStatus: 'single' | 'married';
  isDifferentlyAbled: boolean;
}

interface AppState {
  viewState: 'landing' | 'onboarding' | 'dashboard' | 'manifesto';
  userProfile: UserProfile;
  authUser: any | null;
  manifestoOpen: boolean;
  setViewState: (view: 'landing' | 'onboarding' | 'dashboard' | 'manifesto') => void;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setAuthUser: (user: any | null) => void;
  setManifestoOpen: (open: boolean) => void;
  resetProfile: () => void;
}

const initialProfile: UserProfile = {
  language: 'en',
  name: '',
  age: 0,
  employment: '',
  monthlyIncome: 0,
  maritalStatus: 'single',
  isDifferentlyAbled: false,
};

export const useStore = create<AppState>((set) => ({
  viewState: 'landing',
  userProfile: initialProfile,
  authUser: null,
  manifestoOpen: false,
  setViewState: (view) => set({ viewState: view }),
  setUserProfile: (profile) => 
    set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
  setAuthUser: (user) => set({ authUser: user }),
  setManifestoOpen: (open) => set({ manifestoOpen: open }),
  resetProfile: () => set({ userProfile: initialProfile, viewState: 'landing', authUser: null, manifestoOpen: false }),
}));
