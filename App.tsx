import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import BackupPage from './pages/BackupPage';
import AboutUsPage from './pages/AboutUsPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import FeedbackPage from './pages/FeedbackPage';
import Layout from './components/Layout';
import type { Theme, ThemeContextType, AdContextType } from './types';
import { AdPlaceholder } from './components/AdPlaceholder';


export const ThemeContext = React.createContext<ThemeContextType | null>(null);
export const AdContext = React.createContext<AdContextType | null>(null);

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [showInterstitial, setShowInterstitial] = useState(false);
  const adTriggerCounter = useRef(0);
  const AD_TRIGGER_COUNT = 3; // Show ad after 3 calculations

  const [showRewarded, setShowRewarded] = useState(false);
  const rewardCallback = useRef<(() => void) | null>(null);

  const showInterstitialAd = useCallback(() => {
    adTriggerCounter.current += 1;
    if (adTriggerCounter.current >= AD_TRIGGER_COUNT) {
      setShowInterstitial(true);
      adTriggerCounter.current = 0;
    }
  }, []);

  const handleInterstitialClose = () => {
    setShowInterstitial(false);
  };
  
  const showRewardedAd = useCallback((onReward: () => void) => {
    rewardCallback.current = onReward;
    setShowRewarded(true);
  }, []);
  
  const handleReward = () => {
    if (rewardCallback.current) {
        rewardCallback.current();
    }
    setShowRewarded(false);
    rewardCallback.current = null;
  };

  const handleRewardedClose = () => {
    setShowRewarded(false);
    rewardCallback.current = null;
  };


  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const adContextValue = useMemo(() => ({ showInterstitialAd, showRewardedAd }), [showInterstitialAd, showRewardedAd]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AdContext.Provider value={adContextValue}>
        {showInterstitial && (
          <AdPlaceholder
            type="interstitial"
            onClose={handleInterstitialClose}
            adSlotId="Interstitial_Android"
          />
        )}
        {showRewarded && (
            <AdPlaceholder
                type="rewarded"
                onClose={handleRewardedClose}
                onReward={handleReward}
                adSlotId="Rewarded_Android"
            />
        )}
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculators/:slug" element={<CalculatorPage />} />
              <Route path="/backup" element={<BackupPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/terms" element={<TermsOfUsePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
            </Routes>
          </Layout>
        </HashRouter>
      </AdContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;