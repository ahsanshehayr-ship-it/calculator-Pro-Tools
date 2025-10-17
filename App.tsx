
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import BackupPage from './pages/BackupPage';
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

  const [isInterstitialVisible, setInterstitialVisible] = useState(false);
  const [isAppOpenAdVisible, setAppOpenAdVisible] = useState(false);
  const calculationCount = useRef(0);
  const appOpenAdShown = useRef(false);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    if (!appOpenAdShown.current) {
      const timer = setTimeout(() => {
        setAppOpenAdVisible(true);
        appOpenAdShown.current = true;
      }, 1000); // Show ad after a short delay
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const adContextValue = useMemo(() => ({
    showInterstitialAd: () => setInterstitialVisible(true),
    registerCalculation: () => {
      calculationCount.current += 1;
      if (calculationCount.current > 0 && calculationCount.current % 4 === 0) { // Show ad every 4 calculations
        setInterstitialVisible(true);
      }
    }
  }), []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AdContext.Provider value={adContextValue}>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculators/:slug" element={<CalculatorPage />} />
              <Route path="/backup" element={<BackupPage />} />
            </Routes>
          </Layout>
        </HashRouter>
        {isInterstitialVisible && (
          <AdPlaceholder
            type="interstitial"
            adSlotId="1570618069"
            onClose={() => setInterstitialVisible(false)}
          />
        )}
        {isAppOpenAdVisible && (
            <AdPlaceholder
                type="interstitial"
                adSlotId="7944454721"
                onClose={() => setAppOpenAdVisible(false)}
            />
        )}
      </AdContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;