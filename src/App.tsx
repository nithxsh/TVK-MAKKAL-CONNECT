import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useStore';
import { Hero } from './components/Hero';
import { OnboardingWizard } from './components/OnboardingWizard';
import { Dashboard } from './components/Dashboard';
import { MasterManifesto } from './components/MasterManifesto';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const { viewState } = useStore();

  return (
    <div className="min-h-screen selection:bg-tvk-yellow selection:text-tvk-maroon">
      <AnimatePresence mode="wait">
        {viewState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
          </motion.div>
        )}

        {viewState === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
          >
            <OnboardingWizard />
          </motion.div>
        )}

        {viewState === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Dashboard />
          </motion.div>
        )}

        {viewState === 'manifesto' && (
          <motion.div
            key="manifesto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <MasterManifesto />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
