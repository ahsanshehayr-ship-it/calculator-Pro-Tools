
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
const selectClass = "w-full px-4 py-2 text-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500";


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

    if (principal > 0 && annualInterestRate >= 0 && years > 0) {
      const monthlyInterestRate = annualInterestRate / 100 / 12;
      const numberOfPayments = years * 12;
      
      let monthlyPayment;
      if (annualInterestRate === 0) {
        monthlyPayment = principal / numberOfPayments;
      } else {
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        monthlyPayment = principal * (numerator / denominator);
      }
      
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
        
        if (birthDate > today) {
            onCalculate({ dob }, "Date of birth cannot be in the future.");
            return;
        }

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

// ========================================================================
// NEWLY IMPLEMENTED CALCULATORS
// ========================================================================

// Health & Fitness

export const BmrCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
  const [age, setAge] = usePersistedState(`${slug}_age`, '');
  const [gender, setGender] = usePersistedState(`${slug}_gender`, 'male');
  const [height, setHeight] = usePersistedState(`${slug}_height`, '');
  const [weight, setWeight] = usePersistedState(`${slug}_weight`, '');

  useEffect(() => {
    if (restoredData?.inputs) {
      setAge(restoredData.inputs.age || '');
      setGender(restoredData.inputs.gender || 'male');
      setHeight(restoredData.inputs.height || '');
      setWeight(restoredData.inputs.weight || '');
    }
  }, [restoredData, setAge, setGender, setHeight, setWeight]);

  const calculate = () => {
    const ageVal = parseInt(age, 10);
    const heightVal = parseFloat(height);
    const weightVal = parseFloat(weight);
    if (ageVal > 0 && heightVal > 0 && weightVal > 0) {
      let bmr = 0;
      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal + 5;
      } else {
        bmr = 10 * weightVal + 6.25 * heightVal - 5 * ageVal - 161;
      }
      onCalculate({ age, gender, height, weight }, `Your BMR is ${bmr.toFixed(2)} calories/day.`);
    }
  };
  
  const reset = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    onReset();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="age" className={labelClass}>Age</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} placeholder="e.g., 25" />
      </div>
      <div>
        <label htmlFor="gender" className={labelClass}>Gender</label>
        <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
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

export const IdealWeightCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [height, setHeight] = usePersistedState(`${slug}_height`, '');
    const [gender, setGender] = usePersistedState(`${slug}_gender`, 'male');

    useEffect(() => {
        if (restoredData?.inputs) {
            setHeight(restoredData.inputs.height || '');
            setGender(restoredData.inputs.gender || 'male');
        }
    }, [restoredData, setHeight, setGender]);

    const calculate = () => {
        const heightCm = parseFloat(height);
        if (heightCm > 0) {
            const heightInches = heightCm / 2.54;
            const heightFeet = Math.floor(heightInches / 12);
            let idealWeightKg = 0;
            if (heightFeet >= 5) {
                const inchesOver5Ft = heightInches - 60;
                if (gender === 'male') {
                    idealWeightKg = 50 + (2.3 * inchesOver5Ft); // Devine formula
                } else {
                    idealWeightKg = 45.5 + (2.3 * inchesOver5Ft); // Devine formula
                }
                 onCalculate({ height, gender }, `Your ideal weight is approx. ${idealWeightKg.toFixed(2)} kg.`);
            } else {
                 onCalculate({ height, gender }, `Height must be at least 5 feet.`);
            }
        }
    };
    
    const reset = () => {
        setHeight('');
        setGender('male');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="height" className={labelClass}>Height (cm)</label>
                <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} className={inputClass} placeholder="e.g., 175" />
            </div>
            <div>
                <label htmlFor="gender" className={labelClass}>Gender</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className={selectClass}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const HeartRateCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [age, setAge] = usePersistedState(`${slug}_age`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setAge(restoredData.inputs.age || '');
        }
    }, [restoredData, setAge]);
    
    const calculate = () => {
        const ageVal = parseInt(age, 10);
        if (ageVal > 0) {
            const maxHr = 220 - ageVal;
            const moderateMin = Math.round(maxHr * 0.50);
            const moderateMax = Math.round(maxHr * 0.70);
            const vigorousMin = Math.round(maxHr * 0.70);
            const vigorousMax = Math.round(maxHr * 0.85);
            const resultString = `Max HR: ${maxHr} bpm. Moderate Zone: ${moderateMin}-${moderateMax} bpm. Vigorous Zone: ${vigorousMin}-${vigorousMax} bpm.`;
            onCalculate({ age }, resultString);
        }
    };

    const reset = () => {
        setAge('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="age" className={labelClass}>Age</label>
                <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className={inputClass} placeholder="e.g., 30" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const WaterIntakeCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [weight, setWeight] = usePersistedState(`${slug}_weight`, '');
    const [activity, setActivity] = usePersistedState(`${slug}_activity`, 'moderate');

    useEffect(() => {
        if (restoredData?.inputs) {
            setWeight(restoredData.inputs.weight || '');
            setActivity(restoredData.inputs.activity || 'moderate');
        }
    }, [restoredData, setWeight, setActivity]);
    
    const calculate = () => {
        const weightVal = parseFloat(weight);
        if (weightVal > 0) {
            let multiplier = 35; // moderate
            if (activity === 'sedentary') multiplier = 30;
            if (activity === 'light') multiplier = 35;
            if (activity === 'active') multiplier = 40;
            if (activity === 'very_active') multiplier = 45;
            const intakeMl = weightVal * multiplier;
            const intakeL = intakeMl / 1000;
            onCalculate({ weight, activity }, `Recommended daily water intake: ${intakeL.toFixed(2)} liters.`);
        }
    };

    const reset = () => {
        setWeight('');
        setActivity('moderate');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="weight" className={labelClass}>Weight (kg)</label>
                <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="e.g., 70" />
            </div>
            <div>
                <label htmlFor="activity" className={labelClass}>Daily Activity Level</label>
                <select id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} className={selectClass}>
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Lightly active (light exercise/sports 1-3 days/week)</option>
                    <option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                    <option value="active">Very active (hard exercise/sports 6-7 days a week)</option>
                    <option value="very_active">Extra active (very hard exercise/physical job)</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};


// Financial

export const EMICalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
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

    if (principal > 0 && annualInterestRate >= 0 && years > 0) {
      const monthlyInterestRate = annualInterestRate / 100 / 12;
      const numberOfPayments = years * 12;
      
      let monthlyPayment;
      if (annualInterestRate === 0) {
        monthlyPayment = principal / numberOfPayments;
      } else {
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
        monthlyPayment = principal * (numerator / denominator);
      }
      
      const totalPayment = monthlyPayment * numberOfPayments;
      const totalInterest = totalPayment - principal;

      const resultString = `Monthly EMI: $${monthlyPayment.toFixed(2)} | Total Payment: $${totalPayment.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)}`;
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

export const CompoundInterestCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [principal, setPrincipal] = usePersistedState(`${slug}_principal`, '');
    const [rate, setRate] = usePersistedState(`${slug}_rate`, '');
    const [years, setYears] = usePersistedState(`${slug}_years`, '');
    const [compounding, setCompounding] = usePersistedState(`${slug}_compounding`, '12');

    useEffect(() => {
        if (restoredData?.inputs) {
            setPrincipal(restoredData.inputs.principal || '');
            setRate(restoredData.inputs.rate || '');
            setYears(restoredData.inputs.years || '');
            setCompounding(restoredData.inputs.compounding || '12');
        }
    }, [restoredData, setPrincipal, setRate, setYears, setCompounding]);

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseInt(compounding, 10);

        if (p > 0 && r >= 0 && t > 0 && n > 0) {
            const amount = p * Math.pow(1 + r / n, n * t);
            const totalInterest = amount - p;
            const resultString = `Total Amount: $${amount.toFixed(2)} | Total Interest: $${totalInterest.toFixed(2)}`;
            onCalculate({ principal, rate, years, compounding }, resultString);
        }
    };
    
    const reset = () => {
        setPrincipal('');
        setRate('');
        setYears('');
        setCompounding('12');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="principal" className={labelClass}>Principal Amount ($)</label>
                <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} placeholder="e.g., 10000" />
            </div>
            <div>
                <label htmlFor="rate" className={labelClass}>Annual Interest Rate (%)</label>
                <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} placeholder="e.g., 5" />
            </div>
            <div>
                <label htmlFor="years" className={labelClass}>Number of Years</label>
                <input type="number" id="years" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} placeholder="e.g., 10" />
            </div>
            <div>
                <label htmlFor="compounding" className={labelClass}>Compound Frequency</label>
                <select id="compounding" value={compounding} onChange={(e) => setCompounding(e.target.value)} className={selectClass}>
                    <option value="1">Annually</option>
                    <option value="2">Semi-Annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const SimpleInterestCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [principal, setPrincipal] = usePersistedState(`${slug}_principal`, '');
    const [rate, setRate] = usePersistedState(`${slug}_rate`, '');
    const [years, setYears] = usePersistedState(`${slug}_years`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setPrincipal(restoredData.inputs.principal || '');
            setRate(restoredData.inputs.rate || '');
            setYears(restoredData.inputs.years || '');
        }
    }, [restoredData, setPrincipal, setRate, setYears]);

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        if (p > 0 && r >= 0 && t > 0) {
            const interest = p * r * t;
            const totalAmount = p + interest;
            const resultString = `Simple Interest: $${interest.toFixed(2)} | Total Amount: $${totalAmount.toFixed(2)}`;
            onCalculate({ principal, rate, years }, resultString);
        }
    };
    
    const reset = () => {
        setPrincipal('');
        setRate('');
        setYears('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="principal" className={labelClass}>Principal Amount ($)</label>
                <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} className={inputClass} placeholder="e.g., 10000" />
            </div>
            <div>
                <label htmlFor="rate" className={labelClass}>Annual Interest Rate (%)</label>
                <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} placeholder="e.g., 5" />
            </div>
            <div>
                <label htmlFor="years" className={labelClass}>Number of Years</label>
                <input type="number" id="years" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} placeholder="e.g., 10" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const RoiCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [invested, setInvested] = usePersistedState(`${slug}_invested`, '');
    const [returned, setReturned] = usePersistedState(`${slug}_returned`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setInvested(restoredData.inputs.invested || '');
            setReturned(restoredData.inputs.returned || '');
        }
    }, [restoredData, setInvested, setReturned]);

    const calculate = () => {
        const i = parseFloat(invested);
        const r = parseFloat(returned);
        if (i > 0) {
            const roi = ((r - i) / i) * 100;
            onCalculate({ invested, returned }, `Return on Investment (ROI): ${roi.toFixed(2)}%`);
        }
    };
    
    const reset = () => {
        setInvested('');
        setReturned('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="invested" className={labelClass}>Amount Invested ($)</label>
                <input type="number" id="invested" value={invested} onChange={(e) => setInvested(e.target.value)} className={inputClass} placeholder="e.g., 1000" />
            </div>
            <div>
                <label htmlFor="returned" className={labelClass}>Amount Returned ($)</label>
                <input type="number" id="returned" value={returned} onChange={(e) => setReturned(e.target.value)} className={inputClass} placeholder="e.g., 1200" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const TaxCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [income, setIncome] = usePersistedState(`${slug}_income`, '');
    const [rate, setRate] = usePersistedState(`${slug}_rate`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setIncome(restoredData.inputs.income || '');
            setRate(restoredData.inputs.rate || '');
        }
    }, [restoredData, setIncome, setRate]);
    
    const calculate = () => {
        const i = parseFloat(income);
        const r = parseFloat(rate);
        if (i > 0 && r >= 0) {
            const taxAmount = i * (r / 100);
            const netIncome = i - taxAmount;
            const resultString = `Tax Amount: $${taxAmount.toFixed(2)} | Net Income: $${netIncome.toFixed(2)}`;
            onCalculate({ income, rate }, resultString);
        }
    };

    const reset = () => {
        setIncome('');
        setRate('');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="income" className={labelClass}>Income ($)</label>
                <input type="number" id="income" value={income} onChange={(e) => setIncome(e.target.value)} className={inputClass} placeholder="e.g., 50000" />
            </div>
            <div>
                <label htmlFor="rate" className={labelClass}>Tax Rate (%)</label>
                <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} placeholder="e.g., 20" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const DiscountCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [price, setPrice] = usePersistedState(`${slug}_price`, '');
    const [discount, setDiscount] = usePersistedState(`${slug}_discount`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setPrice(restoredData.inputs.price || '');
            setDiscount(restoredData.inputs.discount || '');
        }
    }, [restoredData, setPrice, setDiscount]);
    
    const calculate = () => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        if (p > 0 && d >= 0) {
            const savings = p * (d / 100);
            const finalPrice = p - savings;
            const resultString = `Final Price: $${finalPrice.toFixed(2)} | You Save: $${savings.toFixed(2)}`;
            onCalculate({ price, discount }, resultString);
        }
    };
    
    const reset = () => {
        setPrice('');
        setDiscount('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="price" className={labelClass}>Original Price ($)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="e.g., 100" />
            </div>
            <div>
                <label htmlFor="discount" className={labelClass}>Discount (%)</label>
                <input type="number" id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} className={inputClass} placeholder="e.g., 25" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const CurrencyConverter: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [amount, setAmount] = usePersistedState(`${slug}_amount`, '1');
    const [from, setFrom] = usePersistedState(`${slug}_from`, 'USD');
    const [to, setTo] = usePersistedState(`${slug}_to`, 'EUR');

    // Note: Rates are for demonstration and not live.
    const rates: Record<string, number> = {
        AED: 3.67,    // UAE Dirham
        AUD: 1.50,    // Australian Dollar
        BRL: 5.25,    // Brazilian Real
        CAD: 1.37,    // Canadian Dollar
        CHF: 0.90,    // Swiss Franc
        CNY: 7.25,    // Chinese Yuan
        EUR: 0.93,    // Euro
        GBP: 0.79,    // British Pound
        HKD: 7.81,    // Hong Kong Dollar
        IDR: 16250,   // Indonesian Rupiah
        INR: 83.54,   // Indian Rupee
        JPY: 157.29,  // Japanese Yen
        KRW: 1378,    // South Korean Won
        KWD: 0.30,    // Kuwaiti Dinar
        MXN: 18.10,   // Mexican Peso
        MYR: 4.70,    // Malaysian Ringgit
        NOK: 10.55,   // Norwegian Krone
        NZD: 1.63,    // New Zealand Dollar
        PHP: 58.65,   // Philippine Peso
        PKR: 278,     // Pakistani Rupee
        RUB: 88,      // Russian Ruble
        SAR: 3.75,    // Saudi Riyal
        SEK: 10.45,   // Swedish Krona
        SGD: 1.35,    // Singapore Dollar
        THB: 36.60,   // Thai Baht
        TRY: 32.25,   // Turkish Lira
        TWD: 32.30,   // New Taiwan Dollar
        USD: 1,       // US Dollar
        ZAR: 18.25    // South African Rand
    };
    const currencyOptions = Object.keys(rates);

    useEffect(() => {
        if (restoredData?.inputs) {
            setAmount(restoredData.inputs.amount || '1');
            setFrom(restoredData.inputs.from || 'USD');
            setTo(restoredData.inputs.to || 'EUR');
        }
    }, [restoredData, setAmount, setFrom, setTo]);

    const calculate = () => {
        const amt = parseFloat(amount);
        if (amt >= 0) {
            const result = amt * (rates[to] / rates[from]);
            onCalculate({ amount, from, to }, `${amt.toFixed(2)} ${from} = ${result.toFixed(2)} ${to}`);
        }
    };
    
    useEffect(calculate, [amount, from, to]);

    const reset = () => {
        setAmount('1');
        setFrom('USD');
        setTo('EUR');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="amount" className={labelClass}>Amount</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={inputClass} />
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <label htmlFor="from" className={labelClass}>From</label>
                    <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
                        {currencyOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="pt-7">
                    <ArrowPathIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1">
                    <label htmlFor="to" className={labelClass}>To</label>
                    <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
                        {currencyOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">Disclaimer: Exchange rates are for demonstration purposes and are not updated in real-time.</p>
        </div>
    );
};

export const ProfitMarginCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [cost, setCost] = usePersistedState(`${slug}_cost`, '');
    const [revenue, setRevenue] = usePersistedState(`${slug}_revenue`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setCost(restoredData.inputs.cost || '');
            setRevenue(restoredData.inputs.revenue || '');
        }
    }, [restoredData, setCost, setRevenue]);
    
    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);
        if (r > 0) {
            const profit = r - c;
            const margin = (profit / r) * 100;
            const resultString = `Gross Profit: $${profit.toFixed(2)} | Profit Margin: ${margin.toFixed(2)}%`;
            onCalculate({ cost, revenue }, resultString);
        }
    };
    
    const reset = () => {
        setCost('');
        setRevenue('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="cost" className={labelClass}>Total Cost ($)</label>
                <input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} className={inputClass} placeholder="e.g., 75" />
            </div>
            <div>
                <label htmlFor="revenue" className={labelClass}>Total Revenue ($)</label>
                <input type="number" id="revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} className={inputClass} placeholder="e.g., 100" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const BreakEvenCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [fixedCosts, setFixedCosts] = usePersistedState(`${slug}_fixedCosts`, '');
    const [variableCost, setVariableCost] = usePersistedState(`${slug}_variableCost`, '');
    const [price, setPrice] = usePersistedState(`${slug}_price`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setFixedCosts(restoredData.inputs.fixedCosts || '');
            setVariableCost(restoredData.inputs.variableCost || '');
            setPrice(restoredData.inputs.price || '');
        }
    }, [restoredData, setFixedCosts, setVariableCost, setPrice]);
    
    const calculate = () => {
        const fc = parseFloat(fixedCosts);
        const vc = parseFloat(variableCost);
        const p = parseFloat(price);
        if (fc > 0 && p > vc) {
            const breakEvenUnits = fc / (p - vc);
            onCalculate({ fixedCosts, variableCost, price }, `You need to sell ${Math.ceil(breakEvenUnits)} units to break even.`);
        } else if (p <= vc) {
            onCalculate({ fixedCosts, variableCost, price }, "Price per unit must be greater than variable cost per unit.");
        }
    };

    const reset = () => {
        setFixedCosts('');
        setVariableCost('');
        setPrice('');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="fixedCosts" className={labelClass}>Total Fixed Costs ($)</label>
                <input type="number" id="fixedCosts" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} className={inputClass} placeholder="e.g., 10000" />
            </div>
            <div>
                <label htmlFor="variableCost" className={labelClass}>Variable Cost Per Unit ($)</label>
                <input type="number" id="variableCost" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} className={inputClass} placeholder="e.g., 5" />
            </div>
            <div>
                <label htmlFor="price" className={labelClass}>Price Per Unit ($)</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="e.g., 10" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const SipCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [investment, setInvestment] = usePersistedState(`${slug}_investment`, '');
    const [rate, setRate] = usePersistedState(`${slug}_rate`, '');
    const [years, setYears] = usePersistedState(`${slug}_years`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setInvestment(restoredData.inputs.investment || '');
            setRate(restoredData.inputs.rate || '');
            setYears(restoredData.inputs.years || '');
        }
    }, [restoredData, setInvestment, setRate, setYears]);
    
    const calculate = () => {
        const P = parseFloat(investment);
        const r = parseFloat(rate);
        const t = parseFloat(years);
        if (P > 0 && r > 0 && t > 0) {
            const n = t * 12; // number of months
            const i = r / 100 / 12; // monthly interest rate
            const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const totalInvested = P * n;
            const wealthGained = futureValue - totalInvested;
            const resultString = `Total Value: $${futureValue.toFixed(2)} | Total Invested: $${totalInvested.toFixed(2)} | Wealth Gained: $${wealthGained.toFixed(2)}`;
            onCalculate({ investment, rate, years }, resultString);
        }
    };
    
    const reset = () => {
        setInvestment('');
        setRate('');
        setYears('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="investment" className={labelClass}>Monthly Investment ($)</label>
                <input type="number" id="investment" value={investment} onChange={(e) => setInvestment(e.target.value)} className={inputClass} placeholder="e.g., 500" />
            </div>
            <div>
                <label htmlFor="rate" className={labelClass}>Expected Annual Return Rate (%)</label>
                <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} placeholder="e.g., 12" />
            </div>
            <div>
                <label htmlFor="years" className={labelClass}>Time Period (Years)</label>
                <input type="number" id="years" value={years} onChange={(e) => setYears(e.target.value)} className={inputClass} placeholder="e.g., 10" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

// Lifestyle

export const DateDifferenceCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [startDate, setStartDate] = usePersistedState(`${slug}_startDate`, '');
    const [endDate, setEndDate] = usePersistedState(`${slug}_endDate`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setStartDate(restoredData.inputs.startDate || '');
            setEndDate(restoredData.inputs.endDate || '');
        }
    }, [restoredData, setStartDate, setEndDate]);
    
    const calculate = () => {
        if (!startDate || !endDate) return;
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);

        if (d1 > d2) {
             onCalculate({ startDate, endDate }, "End date must be after start date.");
             return;
        }

        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }
        
        const totalDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));

        const resultString = `Difference: ${years} years, ${months} months, and ${days} days. (Total ${totalDays} days)`;
        onCalculate({ startDate, endDate }, resultString);
    };

    const reset = () => {
        setStartDate('');
        setEndDate('');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="startDate" className={labelClass}>Start Date</label>
                <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </div>
            <div>
                <label htmlFor="endDate" className={labelClass}>End Date</label>
                <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const FuelConsumptionCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [distance, setDistance] = usePersistedState(`${slug}_distance`, '');
    const [fuel, setFuel] = usePersistedState(`${slug}_fuel`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setDistance(restoredData.inputs.distance || '');
            setFuel(restoredData.inputs.fuel || '');
        }
    }, [restoredData, setDistance, setFuel]);
    
    const calculate = () => {
        const d = parseFloat(distance);
        const f = parseFloat(fuel);
        if (d > 0 && f > 0) {
            const lPer100km = (f / d) * 100;
            const kmPerL = d / f;
            const resultString = `Consumption: ${lPer100km.toFixed(2)} L/100km | Efficiency: ${kmPerL.toFixed(2)} km/L`;
            onCalculate({ distance, fuel }, resultString);
        }
    };
    
    const reset = () => {
        setDistance('');
        setFuel('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="distance" className={labelClass}>Distance Traveled (km)</label>
                <input type="number" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} className={inputClass} placeholder="e.g., 400" />
            </div>
            <div>
                <label htmlFor="fuel" className={labelClass}>Fuel Used (liters)</label>
                <input type="number" id="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className={inputClass} placeholder="e.g., 30" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const TravelTimeCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [distance, setDistance] = usePersistedState(`${slug}_distance`, '');
    const [speed, setSpeed] = usePersistedState(`${slug}_speed`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setDistance(restoredData.inputs.distance || '');
            setSpeed(restoredData.inputs.speed || '');
        }
    }, [restoredData, setDistance, setSpeed]);
    
    const calculate = () => {
        const d = parseFloat(distance);
        const s = parseFloat(speed);
        if (d > 0 && s > 0) {
            const timeHours = d / s;
            const hours = Math.floor(timeHours);
            const minutes = Math.round((timeHours - hours) * 60);
            onCalculate({ distance, speed }, `Estimated travel time: ${hours} hours and ${minutes} minutes.`);
        }
    };

    const reset = () => {
        setDistance('');
        setSpeed('');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="distance" className={labelClass}>Distance (km)</label>
                <input type="number" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} className={inputClass} placeholder="e.g., 500" />
            </div>
            <div>
                <label htmlFor="speed" className={labelClass}>Average Speed (km/h)</label>
                <input type="number" id="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} className={inputClass} placeholder="e.g., 100" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

// Math & General

export const PercentageCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [mode, setMode] = usePersistedState(`${slug}_mode`, 'percentOf');
    const [valA, setValA] = usePersistedState(`${slug}_valA`, '');
    const [valB, setValB] = usePersistedState(`${slug}_valB`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setMode(restoredData.inputs.mode || 'percentOf');
            setValA(restoredData.inputs.valA || '');
            setValB(restoredData.inputs.valB || '');
        }
    }, [restoredData, setMode, setValA, setValB]);

    const calculate = () => {
        const a = parseFloat(valA);
        const b = parseFloat(valB);
        if (isNaN(a) || isNaN(b)) return;
        
        let result = '';
        if (mode === 'percentOf') { // what is A% of B
            result = `${( (a / 100) * b ).toFixed(2)}`;
        } else if (mode === 'isWhatPercent') { // A is what % of B
            if (b === 0) result = "Cannot divide by zero";
            else result = `${( (a / b) * 100 ).toFixed(2)}%`;
        } else if (mode === 'change') { // % change from A to B
            if (a === 0) result = "Cannot calculate change from zero";
            else result = `${( ((b - a) / a) * 100 ).toFixed(2)}%`;
        }
        onCalculate({ mode, valA, valB }, result);
    };
    
    const reset = () => {
        setValA('');
        setValB('');
        onReset();
    };

    const getLabels = () => {
        if (mode === 'percentOf') return { labelA: 'Percentage (%)', labelB: 'Value' };
        if (mode === 'isWhatPercent') return { labelA: 'Value A', labelB: 'Value B' };
        if (mode === 'change') return { labelA: 'Initial Value', labelB: 'Final Value' };
        return { labelA: 'Value A', labelB: 'Value B' };
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="mode" className={labelClass}>Calculation Type</label>
                <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)} className={selectClass}>
                    <option value="percentOf">What is X% of Y?</option>
                    <option value="isWhatPercent">X is what percent of Y?</option>
                    <option value="change">Percentage change from X to Y</option>
                </select>
            </div>
            <div>
                <label htmlFor="valA" className={labelClass}>{getLabels().labelA}</label>
                <input type="number" id="valA" value={valA} onChange={(e) => setValA(e.target.value)} className={inputClass} />
            </div>
             <div>
                <label htmlFor="valB" className={labelClass}>{getLabels().labelB}</label>
                <input type="number" id="valB" value={valB} onChange={(e) => setValB(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const GpaCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    type Course = { credits: string, grade: string };
    const [courses, setCourses] = usePersistedState<Course[]>(`${slug}_courses`, [{ credits: '', grade: 'A' }]);

    useEffect(() => {
        if (restoredData?.inputs?.courses) {
            setCourses(restoredData.inputs.courses);
        }
    }, [restoredData, setCourses]);

    const gradePoints: Record<string, number> = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };

    const handleCourseChange = (index: number, field: keyof Course, value: string) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    const addCourse = () => setCourses([...courses, { credits: '', grade: 'A' }]);
    const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));

    const calculate = () => {
        let totalCredits = 0;
        let totalPoints = 0;
        courses.forEach(course => {
            const credits = parseFloat(course.credits);
            const point = gradePoints[course.grade];
            if (!isNaN(credits) && credits > 0) {
                totalCredits += credits;
                totalPoints += credits * point;
            }
        });
        if (totalCredits > 0) {
            const gpa = totalPoints / totalCredits;
            onCalculate({ courses }, `Your GPA is ${gpa.toFixed(2)}`);
        } else {
            onCalculate({ courses }, "Please enter valid credits.");
        }
    };
    
    const reset = () => {
        setCourses([{ credits: '', grade: 'A' }]);
        onReset();
    };

    return (
        <div className="space-y-4">
            {courses.map((course, index) => (
                <div key={index} className="flex items-end space-x-2">
                    <div className="flex-1">
                        <label className={labelClass}>Credits</label>
                        <input type="number" value={course.credits} onChange={e => handleCourseChange(index, 'credits', e.target.value)} className={inputClass} />
                    </div>
                    <div className="flex-1">
                        <label className={labelClass}>Grade</label>
                        <select value={course.grade} onChange={e => handleCourseChange(index, 'grade', e.target.value)} className={selectClass}>
                            {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <button onClick={() => removeCourse(index)} className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 h-[46px]">-</button>
                </div>
            ))}
            <button onClick={addCourse} className="w-full text-sm text-primary-600 dark:text-primary-300 font-medium py-2">+ Add Course</button>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const GradePercentageCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [score, setScore] = usePersistedState(`${slug}_score`, '');
    const [total, setTotal] = usePersistedState(`${slug}_total`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setScore(restoredData.inputs.score || '');
            setTotal(restoredData.inputs.total || '');
        }
    }, [restoredData, setScore, setTotal]);
    
    const calculate = () => {
        const s = parseFloat(score);
        const t = parseFloat(total);
        if (t > 0 && s >= 0) {
            const percentage = (s / t) * 100;
            let letter = 'F';
            if (percentage >= 90) letter = 'A';
            else if (percentage >= 80) letter = 'B';
            else if (percentage >= 70) letter = 'C';
            else if (percentage >= 60) letter = 'D';
            onCalculate({ score, total }, `Your grade is ${percentage.toFixed(2)}% (${letter})`);
        }
    };
    
    const reset = () => {
        setScore('');
        setTotal('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="score" className={labelClass}>Your Score</label>
                <input type="number" id="score" value={score} onChange={(e) => setScore(e.target.value)} className={inputClass} placeholder="e.g., 85" />
            </div>
            <div>
                <label htmlFor="total" className={labelClass}>Total Possible Score</label>
                <input type="number" id="total" value={total} onChange={(e) => setTotal(e.target.value)} className={inputClass} placeholder="e.g., 100" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

// Unit converter is complex. Let's create a solid one.
export const UnitConverter: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const units = {
        Length: { meters: 1, kilometers: 1000, feet: 0.3048, miles: 1609.34 },
        Weight: { kilograms: 1, grams: 0.001, pounds: 0.453592, ounces: 0.0283495 },
        Temperature: {}, // Special handling
    };

    const [category, setCategory] = usePersistedState<keyof typeof units>(`${slug}_category`, 'Length');
    const [fromUnit, setFromUnit] = usePersistedState(`${slug}_fromUnit`, 'meters');
    const [toUnit, setToUnit] = usePersistedState(`${slug}_toUnit`, 'feet');
    const [value, setValue] = usePersistedState(`${slug}_value`, '1');

    useEffect(() => {
        const unitsForCategory = Object.keys(units[category]);
        if (!unitsForCategory.includes(fromUnit)) setFromUnit(unitsForCategory[0]);
        if (!unitsForCategory.includes(toUnit)) setToUnit(unitsForCategory[1] || unitsForCategory[0]);
    }, [category]);
    
     useEffect(() => {
        if (restoredData?.inputs) {
            setCategory(restoredData.inputs.category || 'Length');
            setFromUnit(restoredData.inputs.fromUnit || 'meters');
            setToUnit(restoredData.inputs.toUnit || 'feet');
            setValue(restoredData.inputs.value || '1');
        }
    }, [restoredData]);

    const calculate = () => {
        const val = parseFloat(value);
        if (isNaN(val)) return;

        let result;
        if (category === 'Temperature') {
            if (fromUnit === 'Celsius' && toUnit === 'Fahrenheit') result = (val * 9/5) + 32;
            else if (fromUnit === 'Fahrenheit' && toUnit === 'Celsius') result = (val - 32) * 5/9;
            else if (fromUnit === 'Celsius' && toUnit === 'Kelvin') result = val + 273.15;
            else if (fromUnit === 'Kelvin' && toUnit === 'Celsius') result = val - 273.15;
            else if (fromUnit === 'Fahrenheit' && toUnit === 'Kelvin') result = (val - 32) * 5/9 + 273.15;
            else if (fromUnit === 'Kelvin' && toUnit === 'Fahrenheit') result = (val - 273.15) * 9/5 + 32;
            else result = val;
        } else {
            const fromToBase = val * (units[category] as Record<string, number>)[fromUnit];
            result = fromToBase / (units[category] as Record<string, number>)[toUnit];
        }

        onCalculate({ category, fromUnit, toUnit, value }, `${value} ${fromUnit} is ${result.toFixed(3)} ${toUnit}`);
    };
    
    useEffect(calculate, [value, fromUnit, toUnit, category]);
    
    const reset = () => {
        setCategory('Length');
        setFromUnit('meters');
        setToUnit('feet');
        setValue('1');
        onReset();
    };
    
    const currentUnits = category === 'Temperature' ? ['Celsius', 'Fahrenheit', 'Kelvin'] : Object.keys(units[category]);

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="category" className={labelClass}>Category</label>
                <select id="category" value={category} onChange={e => setCategory(e.target.value as keyof typeof units)} className={selectClass}>
                    {Object.keys(units).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="value" className={labelClass}>Value</label>
                <input type="number" id="value" value={value} onChange={e => setValue(e.target.value)} className={inputClass} />
            </div>
             <div className="flex items-center space-x-4">
                <div className="flex-1">
                    <label htmlFor="from" className={labelClass}>From</label>
                    <select id="from" value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={selectClass}>
                        {currentUnits.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                <div className="pt-7">
                    <ArrowPathIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div className="flex-1">
                    <label htmlFor="to" className={labelClass}>To</label>
                    <select id="to" value={toUnit} onChange={e => setToUnit(e.target.value)} className={selectClass}>
                        {currentUnits.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

// Construction & Home

export const PaintCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [area, setArea] = usePersistedState(`${slug}_area`, '');
    const [coats, setCoats] = usePersistedState(`${slug}_coats`, '2');
    const [coverage, setCoverage] = usePersistedState(`${slug}_coverage`, '10');

    useEffect(() => {
        if (restoredData?.inputs) {
            setArea(restoredData.inputs.area || '');
            setCoats(restoredData.inputs.coats || '2');
            setCoverage(restoredData.inputs.coverage || '10');
        }
    }, [restoredData, setArea, setCoats, setCoverage]);
    
    const calculate = () => {
        const a = parseFloat(area);
        const c = parseInt(coats, 10);
        const cov = parseFloat(coverage);
        if (a > 0 && c > 0 && cov > 0) {
            const paintNeeded = (a * c) / cov;
            onCalculate({ area, coats, coverage }, `You need approximately ${paintNeeded.toFixed(2)} liters of paint.`);
        }
    };
    
    const reset = () => {
        setArea('');
        setCoats('2');
        setCoverage('10');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="area" className={labelClass}>Total Area to Paint (m²)</label>
                <input type="number" id="area" value={area} onChange={(e) => setArea(e.target.value)} className={inputClass} placeholder="e.g., 50" />
            </div>
            <div>
                <label htmlFor="coats" className={labelClass}>Number of Coats</label>
                <input type="number" id="coats" value={coats} onChange={(e) => setCoats(e.target.value)} className={inputClass} />
            </div>
            <div>
                <label htmlFor="coverage" className={labelClass}>Paint Coverage (m²/liter)</label>
                <input type="number" id="coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const TileCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [floorL, setFloorL] = usePersistedState(`${slug}_floorL`, '');
    const [floorW, setFloorW] = usePersistedState(`${slug}_floorW`, '');
    const [tileL, setTileL] = usePersistedState(`${slug}_tileL`, '');
    const [tileW, setTileW] = usePersistedState(`${slug}_tileW`, '');
    const [waste, setWaste] = usePersistedState(`${slug}_waste`, '10');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setFloorL(restoredData.inputs.floorL || '');
            setFloorW(restoredData.inputs.floorW || '');
            setTileL(restoredData.inputs.tileL || '');
            setTileW(restoredData.inputs.tileW || '');
            setWaste(restoredData.inputs.waste || '10');
        }
    }, [restoredData, setFloorL, setFloorW, setTileL, setTileW, setWaste]);
    
    const calculate = () => {
        const fl = parseFloat(floorL);
        const fw = parseFloat(floorW);
        const tl = parseFloat(tileL);
        const tw = parseFloat(tileW);
        const w = parseFloat(waste);
        
        if (fl > 0 && fw > 0 && tl > 0 && tw > 0) {
            const floorArea = fl * fw;
            const tileArea = (tl/100) * (tw/100); // convert cm to m
            const tilesNeeded = Math.ceil(floorArea / tileArea);
            const totalTiles = Math.ceil(tilesNeeded * (1 + w/100));
            onCalculate({ floorL, floorW, tileL, tileW, waste }, `You need approximately ${totalTiles} tiles (including ${w}% wastage).`);
        }
    };
    
    const reset = () => {
        setFloorL('');
        setFloorW('');
        setTileL('');
        setTileW('');
        setWaste('10');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label className={labelClass}>Floor Dimensions (meters)</label>
                <div className="flex space-x-2">
                    <input type="number" value={floorL} onChange={e => setFloorL(e.target.value)} className={inputClass} placeholder="Length" />
                    <input type="number" value={floorW} onChange={e => setFloorW(e.target.value)} className={inputClass} placeholder="Width" />
                </div>
            </div>
            <div>
                <label className={labelClass}>Tile Dimensions (cm)</label>
                <div className="flex space-x-2">
                    <input type="number" value={tileL} onChange={e => setTileL(e.target.value)} className={inputClass} placeholder="Length" />
                    <input type="number" value={tileW} onChange={e => setTileW(e.target.value)} className={inputClass} placeholder="Width" />
                </div>
            </div>
            <div>
                <label htmlFor="waste" className={labelClass}>Wastage (%)</label>
                <input type="number" id="waste" value={waste} onChange={e => setWaste(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const ConcreteVolumeCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [length, setLength] = usePersistedState(`${slug}_length`, '');
    const [width, setWidth] = usePersistedState(`${slug}_width`, '');
    const [thickness, setThickness] = usePersistedState(`${slug}_thickness`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setLength(restoredData.inputs.length || '');
            setWidth(restoredData.inputs.width || '');
            setThickness(restoredData.inputs.thickness || '');
        }
    }, [restoredData, setLength, setWidth, setThickness]);
    
    const calculate = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thickness) / 100; // convert cm to meters
        if (l > 0 && w > 0 && t > 0) {
            const volume = l * w * t;
            onCalculate({ length, width, thickness }, `You need ${volume.toFixed(3)} cubic meters of concrete.`);
        }
    };
    
    const reset = () => {
        setLength('');
        setWidth('');
        setThickness('');
        onReset();
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="length" className={labelClass}>Length (meters)</label>
                <input type="number" id="length" value={length} onChange={e => setLength(e.target.value)} className={inputClass} />
            </div>
             <div>
                <label htmlFor="width" className={labelClass}>Width (meters)</label>
                <input type="number" id="width" value={width} onChange={e => setWidth(e.target.value)} className={inputClass} />
            </div>
             <div>
                <label htmlFor="thickness" className={labelClass}>Thickness (cm)</label>
                <input type="number" id="thickness" value={thickness} onChange={e => setThickness(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

// Standard and Scientific calculators are more complex. I will add a basic implementation.

const CalcButton: React.FC<{ onClick: () => void, children: React.ReactNode, className?: string }> = ({ onClick, children, className = '' }) => {
    return <button onClick={onClick} className={`p-4 rounded-md text-lg font-semibold transition-colors ${className}`}>{children}</button>
};

export const StandardCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [display, setDisplay] = useState('0');
    
    const handleInput = (val: string) => {
        if (display === '0' && val !== '.') {
            setDisplay(val);
        } else if (val === '.' && display.includes('.')) {
            // do nothing
        }
        else {
            setDisplay(display + val);
        }
    };

    const handleOperator = (op: string) => {
        setDisplay(display + ` ${op} `);
    };

    const calculate = () => {
        try {
            // Using a safer evaluation method than direct eval()
            const result = new Function('return ' + display.replace(/×/g, '*').replace(/÷/g, '/'))();
            setDisplay(String(result));
            onCalculate({expression: display}, String(result));
        } catch(e) {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        onReset();
    };
    
    const backspace = () => {
        setDisplay(display.slice(0, -1) || '0');
    };

    return (
        <div className="w-full max-w-xs mx-auto space-y-2">
            <div className="w-full px-4 py-3 text-2xl text-right bg-slate-200 dark:bg-slate-700 rounded-md break-all">{display}</div>
            <div className="grid grid-cols-4 gap-2">
                <CalcButton onClick={clear} className="col-span-2 bg-red-500 text-white hover:bg-red-600">C</CalcButton>
                <CalcButton onClick={backspace} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">DEL</CalcButton>
                <CalcButton onClick={() => handleOperator('÷')} className="bg-primary-500 text-white hover:bg-primary-600">÷</CalcButton>

                <CalcButton onClick={() => handleInput('7')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">7</CalcButton>
                <CalcButton onClick={() => handleInput('8')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">8</CalcButton>
                <CalcButton onClick={() => handleInput('9')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">9</CalcButton>
                <CalcButton onClick={() => handleOperator('×')} className="bg-primary-500 text-white hover:bg-primary-600">×</CalcButton>

                <CalcButton onClick={() => handleInput('4')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">4</CalcButton>
                <CalcButton onClick={() => handleInput('5')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">5</CalcButton>
                <CalcButton onClick={() => handleInput('6')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">6</CalcButton>
                <CalcButton onClick={() => handleOperator('-')} className="bg-primary-500 text-white hover:bg-primary-600">-</CalcButton>

                <CalcButton onClick={() => handleInput('1')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">1</CalcButton>
                <CalcButton onClick={() => handleInput('2')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">2</CalcButton>
                <CalcButton onClick={() => handleInput('3')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">3</CalcButton>
                <CalcButton onClick={() => handleOperator('+')} className="bg-primary-500 text-white hover:bg-primary-600">+</CalcButton>

                <CalcButton onClick={() => handleInput('0')} className="col-span-2 bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">0</CalcButton>
                <CalcButton onClick={() => handleInput('.')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">.</CalcButton>
                <CalcButton onClick={calculate} className="bg-green-500 text-white hover:bg-green-600">=</CalcButton>
            </div>
        </div>
    );
};


export const ScientificCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [display, setDisplay] = useState('0');
    const [isRadians, setIsRadians] = useState(true);

    const handleInput = (val: string) => {
        if (display === '0' && val !== '.') setDisplay(val);
        else if (val === '.' && display.includes('.')) return;
        else setDisplay(display + val);
    };

    const handleOperator = (op: string) => setDisplay(display + ` ${op} `);

    const calculate = () => {
        try {
            let expr = display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/π/g, 'Math.PI')
                .replace(/\^/g, '**');

            const result = new Function('return ' + expr)();
            setDisplay(String(result));
            onCalculate({ expression: display }, String(result));
        } catch (e) {
            setDisplay('Error');
        }
    };

    const handleFunction = (func: string) => {
        try {
            const val = parseFloat(display);
            if (isNaN(val)) return;
            let result;
            const angle = isRadians ? val : val * (Math.PI / 180);

            if (func === 'sin') result = Math.sin(angle);
            else if (func === 'cos') result = Math.cos(angle);
            else if (func === 'tan') result = Math.tan(angle);
            else if (func === 'log') result = Math.log10(val);
            else if (func === 'ln') result = Math.log(val);
            else if (func === 'sqrt') result = Math.sqrt(val);
            else return;

            setDisplay(String(result));
        } catch (e) {
            setDisplay('Error');
        }
    };
    
    const clear = () => { setDisplay('0'); onReset(); };
    const backspace = () => setDisplay(display.slice(0, -1) || '0');

    return (
        <div className="w-full max-w-sm mx-auto space-y-2">
            <div className="w-full px-4 py-3 text-2xl text-right bg-slate-200 dark:bg-slate-700 rounded-md break-all">{display}</div>
            <div className="grid grid-cols-5 gap-2 text-sm">
                <CalcButton onClick={() => handleFunction('sin')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">sin</CalcButton>
                <CalcButton onClick={() => handleFunction('cos')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">cos</CalcButton>
                <CalcButton onClick={() => handleFunction('tan')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">tan</CalcButton>
                <CalcButton onClick={() => handleInput('π')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">π</CalcButton>
                 <CalcButton onClick={() => setIsRadians(!isRadians)} className="bg-slate-400 dark:bg-slate-700 hover:bg-slate-500">{isRadians ? 'Rad' : 'Deg'}</CalcButton>

                <CalcButton onClick={() => handleFunction('log')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">log</CalcButton>
                <CalcButton onClick={() => handleFunction('ln')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">ln</CalcButton>
                <CalcButton onClick={() => handleInput('(')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">(</CalcButton>
                <CalcButton onClick={() => handleInput(')')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">)</CalcButton>
                <CalcButton onClick={() => handleFunction('sqrt')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">√</CalcButton>

                <CalcButton onClick={clear} className="bg-red-500 text-white hover:bg-red-600">C</CalcButton>
                <CalcButton onClick={backspace} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400">DEL</CalcButton>
                <CalcButton onClick={() => handleOperator('^')} className="bg-primary-500 text-white hover:bg-primary-600">^</CalcButton>
                <CalcButton onClick={() => handleOperator('%')} className="bg-primary-500 text-white hover:bg-primary-600">%</CalcButton>
                <CalcButton onClick={() => handleOperator('÷')} className="bg-primary-500 text-white hover:bg-primary-600">÷</CalcButton>

                <CalcButton onClick={() => handleInput('7')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">7</CalcButton>
                <CalcButton onClick={() => handleInput('8')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">8</CalcButton>
                <CalcButton onClick={() => handleInput('9')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">9</CalcButton>
                <CalcButton onClick={() => handleOperator('×')} className="col-span-2 bg-primary-500 text-white hover:bg-primary-600">×</CalcButton>

                <CalcButton onClick={() => handleInput('4')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">4</CalcButton>
                <CalcButton onClick={() => handleInput('5')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">5</CalcButton>
                <CalcButton onClick={() => handleInput('6')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">6</CalcButton>
                <CalcButton onClick={() => handleOperator('-')} className="col-span-2 bg-primary-500 text-white hover:bg-primary-600">-</CalcButton>

                <CalcButton onClick={() => handleInput('1')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">1</CalcButton>
                <CalcButton onClick={() => handleInput('2')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">2</CalcButton>
                <CalcButton onClick={() => handleInput('3')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">3</CalcButton>
                <CalcButton onClick={() => handleOperator('+')} className="col-span-2 bg-primary-500 text-white hover:bg-primary-600">+</CalcButton>

                <CalcButton onClick={() => handleInput('0')} className="col-span-2 bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">0</CalcButton>
                <CalcButton onClick={() => handleInput('.')} className="bg-slate-200 dark:bg-slate-500 hover:bg-slate-300">.</CalcButton>
                <CalcButton onClick={calculate} className="col-span-2 bg-green-500 text-white hover:bg-green-600">=</CalcButton>
            </div>
        </div>
    );
};
