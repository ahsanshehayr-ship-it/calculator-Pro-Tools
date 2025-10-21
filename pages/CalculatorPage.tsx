import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import SeoManager from '../components/SeoManager';
import type { BackupData, AdContextType } from '../types';
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import { CALCULATOR_DESCRIPTIONS } from '../components/calculatorDescriptions';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { AdContext } from '../App';


const CalculatorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const adContext = useContext(AdContext);

  const calculator = CALCULATORS.find((c) => c.slug === slug);
  const [result, setResult] = useState<string>('');
  const [inputs, setInputs] = useState<Record<string, any>>({});
  
  const restoredState = location.state as { restoredData: BackupData } | null;

  useEffect(() => {
    // Clear restored state after using it
    if (restoredState) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [restoredState, location.pathname, navigate]);
  
  // Reset result when slug changes
  useEffect(() => {
    setResult('');
    setInputs({});
  }, [slug]);

  const handleCalculation = (newInputs: Record<string, any>, newResult: string) => {
    setResult(newResult);
    setInputs(newInputs);
    try {
      localStorage.setItem(`${slug}_result`, JSON.stringify({ inputs: newInputs, result: newResult }));
      // FIX: Added error parameter to the catch block to resolve 'Cannot find name 'error''.
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
    (adContext as AdContextType)?.showInterstitialAd();
  };
  
  const handleReset = () => {
      setResult('');
      setInputs({});
  }

  const downloadResult = useCallback(() => {
    if (!result) return;
    const data: BackupData = {
      calculator: slug!,
      inputs,
      result,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${slug}-backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [result, inputs, slug]);

  const shareResult = useCallback(() => {
    if (!result) return;
    const data: BackupData = {
      calculator: slug!,
      inputs,
      result,
      timestamp: new Date().toISOString(),
    };
    const encodedData = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}#/backup?data=${encodedData}`;

    if (navigator.share) {
      navigator.share({
        title: `${calculator?.name} Result`,
        text: `Check out my calculation result: ${result}`,
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Shareable link copied to clipboard!');
      });
    }
  }, [result, inputs, slug, calculator?.name]);

  const renderResult = () => {
      const hasMultipleParts = result.includes('|');
      const parts = hasMultipleParts ? result.split('|').map(p => p.trim()) : [];
      
      const renderableParts = parts.map(part => {
          const splitPoint = part.indexOf(':');
          if (splitPoint === -1) return { label: '', value: part };
          return {
              label: part.substring(0, splitPoint).trim(),
              value: part.substring(splitPoint + 1).trim()
          };
      });

      return (
         <div className="mt-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-primary-50 to-blue-100 dark:from-slate-800 dark:to-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner relative">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Result</h3>
                
                {hasMultipleParts ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {renderableParts.map((part, index) => (
                            <div key={index} className="flex flex-col">
                                <dt className="text-sm text-slate-500 dark:text-slate-400">{part.label}</dt>
                                <dd className="text-2xl font-bold text-slate-800 dark:text-slate-100">{part.value}</dd>
                            </div>
                        ))}
                    </dl>
                ) : (
                    <p className="text-5xl font-bold font-display text-primary-600 dark:text-primary-300 break-words">{result}</p>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button onClick={shareResult} title="Share Result" className="p-2 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-700/50 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <ShareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={downloadResult} title="Download Result" className="p-2 text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-700/50 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
      )
  }


  if (!calculator) {
    return <div className="text-center text-red-500">Calculator not found!</div>;
  }

  const CalculatorComponent = calculator.component;

  return (
    <div className="max-w-4xl mx-auto">
      <SeoManager
        title={calculator.name}
        description={calculator.description}
        keywords={calculator.keywords}
        slug={`/calculators/${calculator.slug}`}
      />
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/50">
                <calculator.icon className="h-8 w-8 text-primary-600 dark:text-primary-300" />
            </div>
            <div>
                 <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-800 dark:text-slate-100">{calculator.name}</h1>
                 <p className="text-slate-500 dark:text-slate-400 mt-1">{calculator.description}</p>
            </div>
        </div>

        <CalculatorComponent 
            onCalculate={handleCalculation} 
            onReset={handleReset}
            restoredData={restoredState?.restoredData}
            slug={slug!}
        />

        {result && renderResult()}
        
        <div className="my-8">
            <AdPlaceholder type="banner" adSlotId="1234567890" />
        </div>
        
        {CALCULATOR_DESCRIPTIONS[calculator.slug] && (
            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-200 mb-4">About the {calculator.name}</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                    {CALCULATOR_DESCRIPTIONS[calculator.slug]}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;