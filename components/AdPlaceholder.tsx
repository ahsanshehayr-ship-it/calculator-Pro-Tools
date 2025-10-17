
import React from 'react';

interface AdPlaceholderProps {
  type: 'banner' | 'interstitial';
  onClose?: () => void;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type, onClose }) => {
  if (type === 'banner') {
    return (
      <div className="w-full mt-6 p-4 bg-slate-200 dark:bg-slate-700 rounded-lg text-center text-slate-500 dark:text-slate-400 text-sm">
        [AdMob Banner Placeholder]
      </div>
    );
  }

  if (type === 'interstitial') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-2xl text-center relative max-w-sm w-full">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Advertisement</h3>
          <div className="my-4 p-10 bg-slate-200 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-400">
            [AdMob Interstitial Placeholder]
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Close Ad
          </button>
        </div>
      </div>
    );
  }

  return null;
};
