
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import type { BackupData } from '../types';

const BackupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading your calculation...');

  useEffect(() => {
    const data = searchParams.get('data');
    if (!data) {
      setError('No backup data found in the link.');
      return;
    }

    try {
      const decodedData: BackupData = JSON.parse(atob(data));
      const { calculator: slug, inputs, result } = decodedData;

      const calculatorExists = CALCULATORS.some(c => c.slug === slug);

      if (calculatorExists) {
        setStatus(`Restoring ${slug}...`);
        // Redirect to the calculator page with state
        navigate(`/calculators/${slug}`, { 
          replace: true, 
          state: { restoredData: decodedData } 
        });
      } else {
        setError('The calculator specified in the backup link does not exist.');
      }
    } catch (e) {
      console.error('Failed to parse backup data:', e);
      setError('Invalid or corrupted backup link.');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-500">Error</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{error}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-300">{status}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Please wait, you will be redirected shortly.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BackupPage;
