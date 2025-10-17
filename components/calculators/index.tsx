
import React, { useState, useEffect } from 'react';
import type { BackupData } from '../../types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface CalculatorProps {
  onCalculate: (inputs: Record<string, any>, result: string) => void;
  onReset: () => void;
  restoredData?: BackupData;
  slug: string;
}

const inputClass = "w-full px-4 py-2 text-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
const buttonClass = "w-full px-4 py-3 text-base font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors";
const resetButtonClass = "w-full px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-600 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors";

// A generic function to load from local storage
const usePersistedState = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, state]);

  return [state, setState];
};

export const BmiCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
  const [height, setHeight] = usePersistedState(`${slug}_height`, '');
  const [weight, setWeight] = usePersistedState(`${slug}_weight`, '');
  
  useEffect(() => {
    if (restoredData?.inputs) {
      setHeight(restoredData.inputs.height || '');
      setWeight(restoredData.inputs.weight || '');
    }
  }, [restoredData, setHeight, setWeight]);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = "Unknown";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal weight";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";
      onCalculate({ height, weight }, `${bmi.toFixed(2)} (${category})`);
    }
  };
  
  const reset = () => {
      setHeight('');
      setWeight('');
      onReset();
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="height" className={labelClass}>Height (cm)</label>
        <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} placeholder="e.g., 175" />
      </div>
      <div>
        <label htmlFor="weight" className={labelClass}>Weight (kg)</label>
        <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="e.g., 70" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button onClick={reset} className={resetButtonClass}>Reset</button>
        <button onClick={calculate} className={buttonClass}>Calculate</button>
      </div>
    </div>
  );
};


export const TipCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
  const [bill, setBill] = usePersistedState(`${slug}_bill`, '');
  const [tipPercent, setTipPercent] = usePersistedState(`${slug}_tipPercent`, '15');
  const [people, setPeople] = usePersistedState(`${slug}_people`, '1');
  
  useEffect(() => {
    if (restoredData?.inputs) {
        setBill(restoredData.inputs.bill || '');
        setTipPercent(restoredData.inputs.tipPercent || '15');
        setPeople(restoredData.inputs.people || '1');
    }
  }, [restoredData, setBill, setTipPercent, setPeople]);

  const calculate = () => {
    const b = parseFloat(bill);
    const t = parseFloat(tipPercent);
    const p = parseInt(people, 10);
    if (b > 0 && t >= 0 && p > 0) {
      const tipAmount = b * (t / 100);
      const totalAmount = b + tipAmount;
      const perPerson = totalAmount / p;
      const resultString = `Total Tip: $${tipAmount.toFixed(2)} | Total Bill: $${totalAmount.toFixed(2)} | Per Person: $${perPerson.toFixed(2)}`;
      onCalculate({ bill, tipPercent, people }, resultString);
    }
  };
  
  const reset = () => {
      setBill('');
      setTipPercent('15');
      setPeople('1');
      onReset();
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="bill" className={labelClass}>Bill Amount ($)</label>
        <input type="number" id="bill" value={bill} onChange={(e) => setBill(e.target.value)} className={inputClass} placeholder="e.g., 50.00"/>
      </div>
      <div>
        <label htmlFor="tip" className={labelClass}>Tip Percentage (%)</label>
        <input type="number" id="tip" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="people" className={labelClass}>Number of People</label>
        <input type="number" id="people" value={people} onChange={(e) => setPeople(e.target.value)} className={inputClass} min="1" step="1" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button onClick={reset} className={resetButtonClass}>Reset</button>
        <button onClick={calculate} className={buttonClass}>Calculate</button>
      </div>
    </div>
  );
};


export const LoanCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
  const [amount, setAmount] = usePersistedState(`${slug}_amount`, '');
  const [interest, setInterest] = usePersistedState(`${slug}_interest`, '');
  const [term, setTerm] = usePersistedState(`${slug}_term`, '');
  
  useEffect(() => {
    if (restoredData?.inputs) {
        setAmount(restoredData.inputs.amount || '');
        setInterest(restoredData.inputs.interest || '');
        setTerm(restoredData.inputs.term || '');
    }
  }, [restoredData, setAmount, setInterest, setTerm]);

  const calculate = () => {
    const principal = parseFloat(amount);
    const annualInterestRate = parseFloat(interest);
    const years = parseFloat(term);

    if (principal > 0 && annualInterestRate > 0 && years > 0) {
      const monthlyInterestRate = annualInterestRate / 100 / 12;
      const numberOfPayments = years * 12;
      
      const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
      const monthlyPayment = principal * (numerator / denominator);
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      const resultString = `Monthly Payment: $${monthlyPayment.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)}`;
      onCalculate({ amount, interest, term }, resultString);
    }
  };
  
  const reset = () => {
      setAmount('');
      setInterest('');
      setTerm('');
      onReset();
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="amount" className={labelClass}>Loan Amount ($)</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} placeholder="e.g., 100000" />
      </div>
      <div>
        <label htmlFor="interest" className={labelClass}>Annual Interest Rate (%)</label>
        <input type="number" id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className={inputClass} placeholder="e.g., 5" />
      </div>
      <div>
        <label htmlFor="term" className={labelClass}>Loan Term (Years)</label>
        <input type="number" id="term" value={term} onChange={(e) => setTerm(e.target.value)} className={inputClass} placeholder="e.g., 30" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button onClick={reset} className={resetButtonClass}>Reset</button>
        <button onClick={calculate} className={buttonClass}>Calculate</button>
      </div>
    </div>
  );
};


export const AgeCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [dob, setDob] = usePersistedState(`${slug}_dob`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setDob(restoredData.inputs.dob || '');
        }
    }, [restoredData, setDob]);

    const calculate = () => {
        if (!dob) return;
        const birthDate = new Date(dob);
        const today = new Date();
        
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += lastMonth.getDate();
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        const resultString = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
        onCalculate({ dob }, resultString);
    };
    
    const reset = () => {
        setDob('');
        onReset();
    }

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="dob" className={labelClass}>Date of Birth</label>
                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};


export const PlaceholderCalculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  return (
    <div className="text-center p-8 bg-slate-100 dark:bg-slate-700 rounded-lg">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Coming Soon!</h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2">This calculator is under construction.</p>
    </div>
  );
};
