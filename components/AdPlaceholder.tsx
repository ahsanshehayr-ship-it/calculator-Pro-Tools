import React, { useEffect } from 'react';

// This is required for TypeScript to know about the adsbygoogle property on the window object.
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdPlaceholderProps {
  type: 'banner' | 'interstitial' | 'rewarded';
  onClose?: () => void;
  onReward?: () => void;
  adSlotId: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, onClose, onReward, adSlotId }) => {
  useEffect(() => {
    // Delay the ad push slightly to ensure the container has dimensions.
    // This helps prevent the "No slot size for availableWidth=0" error.
    const adPushTimeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdMob error:", e);
      }
    }, 100);
    
    return () => clearTimeout(adPushTimeout);
  }, [adSlotId, type]); // Rerun if ad slot or type changes
  
  if (type === 'banner') {
    return (
      <div className="w-full flex justify-center">
        <ins className="adsbygoogle w-full"
             style={{ display: 'block', textAlign: 'center' }}
             data-ad-client="ca-app-pub-5883330634226380"
             data-ad-slot={adSlotId}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    );
  }

  if (type === 'interstitial') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-2xl relative max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Advertisement</h3>
                <button
                    onClick={onClose}
                    aria-label="Close ad"
                    className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="min-h-[250px] w-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded">
                <ins className="adsbygoogle w-full"
                    style={{ display: 'block' }}
                    data-ad-client="ca-app-pub-5883330634226380"
                    data-ad-slot={adSlotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        </div>
      </div>
    );
  }
  
  if (type === 'rewarded') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" aria-modal="true" role="dialog">
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-2xl relative max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Advertisement</h3>
                {onClose && <button
                    onClick={onClose}
                    aria-label="Close ad"
                    className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>}
            </div>
            <div className="min-h-[250px] w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700 rounded p-4">
                 <p className="text-slate-600 dark:text-slate-300 mb-4 text-center">Watch a short video to earn a reward.</p>
                <ins className="adsbygoogle"
                    style={{ display: 'block', width: '100%', minHeight: '150px' }}
                    data-ad-client="ca-app-pub-5883330634226380"
                    data-ad-slot={adSlotId}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                 <button 
                    onClick={onReward} 
                    className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                    Claim Reward
                 </button>
            </div>
        </div>
      </div>
    );
  }

  return null;
};