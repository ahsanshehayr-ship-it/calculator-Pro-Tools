import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import SeoManager from '../components/SeoManager';
import type { AdContextType, BackupData } from '../types';
import { AdContext } from '../App';
import { ArrowDownTrayIcon, ShareIcon } from '@heroicons/react/24/outline';
import { CALCULATOR_DESCRIPTIONS } from '../components/calculatorDescriptions';
import { AdPlaceholder } from '../components/AdPlaceholder';


const CalculatorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const adContext = useContext(AdContext) as AdContextType;

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
      adContext.registerCalculation();
      // FIX: Added error parameter to the catch block to resolve 'Cannot find name 'error''.
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
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
         <div className="mt-8 animate-[fadeIn_0.5s_ease-in-out]">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Result</h3>
                
                {hasMultipleParts ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        {renderableParts.map((part, index) => (
                            <div key={index} className="flex flex-col">
                                <dt className="text-sm text-slate-500 dark:text-slate-400">{part.label}</dt>
                                <dd className="text-xl font-semibold text-slate-800 dark:text-slate-200">{part.value}</dd>
                            </div>
                        ))}
                    </dl>
                ) : (
                    <p className="text-4xl font-bold text-primary-600 dark:text-primary-300 break-words">{result}</p>
                )}

                <div className="flex items-center gap-2 mt-6">
                    <button onClick={shareResult} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        <ShareIcon className="w-4 h-4" /> Share
                    </button>
                    <button onClick={downloadResult} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        <ArrowDownTrayIcon className="w-4 h-4" /> Download
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
    <div className="max-w-3xl mx-auto">
      <SeoManager
        title={calculator.name}
        description={calculator.description}
        keywords={calculator.keywords}
        slug={`/calculators/${calculator.slug}`}
      />
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900">
                <calculator.icon className="h-7 w-7 text-primary-600 dark:text-primary-300" />
            </div>
            <div>
                 <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{calculator.name}</h1>
                 <p className="text-slate-500 dark:text-slate-400">{calculator.description}</p>
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
            <AdPlaceholder type="banner" adSlotId="8821587979" />
        </div>
        
        {CALCULATOR_DESCRIPTIONS[calculator.slug] && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">About the {calculator.name}</h2>
                <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {CALCULATOR_DESCRIPTIONS[calculator.slug]}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;