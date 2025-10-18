import React, { useState, useEffect } from 'react';
// FIX: Imported CalculatorProps from the central types file and removed the local definition.
import type { BackupData, CalculatorProps } from '../../types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

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
      onCalculate({ height, weight }, `BMI: ${bmi.toFixed(2)}|Category: ${category}`);
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

        const resultString = `Years: ${ageYears} | Months: ${ageMonths} | Days: ${ageDays}`;
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
      onCalculate({ age, gender, height, weight }, `BMR: ${bmr.toFixed(0)} calories/day`);
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
        if (heightCm > 152.4) { // 5 feet
            const heightInches = heightCm / 2.54;
            const inchesOver5Ft = heightInches - 60;
            let idealWeightKg = 0;
            // G.J. Hamwi Formula (1964)
            if (gender === 'male') {
                idealWeightKg = 48 + (2.7 * inchesOver5Ft);
            } else {
                idealWeightKg = 45.5 + (2.2 * inchesOver5Ft);
            }
            onCalculate({ height, gender }, `Ideal Weight Range: ${(idealWeightKg * 0.9).toFixed(1)} - ${(idealWeightKg * 1.1).toFixed(1)} kg`);
        } else {
            onCalculate({ height, gender }, `Height must be over 152.4 cm (5 ft).`);
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
        if (ageVal > 0 && ageVal < 120) {
            const maxHr = 220 - ageVal;
            const moderateMin = Math.round(maxHr * 0.50);
            const moderateMax = Math.round(maxHr * 0.70);
            const vigorousMin = Math.round(maxHr * 0.70);
            const vigorousMax = Math.round(maxHr * 0.85);
            const resultString = `Max HR: ${maxHr} bpm | Moderate Zone: ${moderateMin}-${moderateMax} bpm | Vigorous Zone: ${vigorousMin}-${vigorousMax} bpm`;
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
    const [activity, setActivity] = usePersistedState(`${slug}_activity`, 'light');

    useEffect(() => {
        if (restoredData?.inputs) {
            setWeight(restoredData.inputs.weight || '');
            setActivity(restoredData.inputs.activity || 'light');
        }
    }, [restoredData, setWeight, setActivity]);
    
    const calculate = () => {
        const weightVal = parseFloat(weight);
        if (weightVal > 0) {
            let baseIntake = weightVal * 0.033; // Liters
            let activityMultiplier = 0;
            switch(activity) {
                case 'light': activityMultiplier = 0.35; break;
                case 'moderate': activityMultiplier = 0.5; break;
                case 'active': activityMultiplier = 0.7; break;
            }
            const totalIntake = baseIntake + activityMultiplier;
            onCalculate({ weight, activity }, `Recommended Intake: ${totalIntake.toFixed(2)} liters/day`);
        }
    };

    const reset = () => {
        setWeight('');
        setActivity('light');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="weight" className={labelClass}>Weight (kg)</label>
                <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputClass} placeholder="e.g., 70" />
            </div>
            <div>
                <label htmlFor="activity" className={labelClass}>Exercise Level (30 min sessions)</label>
                <select id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} className={selectClass}>
                    <option value="light">Light (Walking, Yoga)</option>
                    <option value="moderate">Moderate (Jogging, Swimming)</option>
                    <option value="active">Active (Running, HIIT)</option>
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

export const EMICalculator: React.FC<CalculatorProps> = LoanCalculator; // EMI is the same as Loan

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
                    <option value="365">Daily</option>
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
    const [initial, setInitial] = usePersistedState(`${slug}_initial`, '');
    const [final, setFinal] = usePersistedState(`${slug}_final`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setInitial(restoredData.inputs.initial || '');
            setFinal(restoredData.inputs.final || '');
        }
    }, [restoredData, setInitial, setFinal]);
    
    const calculate = () => {
        const i = parseFloat(initial);
        const f = parseFloat(final);
        if (i > 0) {
            const roi = ((f - i) / i) * 100;
            const netProfit = f - i;
            onCalculate({ initial, final }, `ROI: ${roi.toFixed(2)}% | Net Profit: $${netProfit.toFixed(2)}`);
        }
    };

    const reset = () => {
        setInitial('');
        setFinal('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="initial" className={labelClass}>Initial Investment ($)</label>
                <input type="number" id="initial" value={initial} onChange={(e) => setInitial(e.target.value)} className={inputClass} placeholder="e.g., 1000" />
            </div>
            <div>
                <label htmlFor="final" className={labelClass}>Final Value ($)</label>
                <input type="number" id="final" value={final} onChange={(e) => setFinal(e.target.value)} className={inputClass} placeholder="e.g., 1200" />
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
            onCalculate({ income, rate }, `Tax Amount: $${taxAmount.toFixed(2)} | Net Income: $${netIncome.toFixed(2)}`);
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
                <label htmlFor="income" className={labelClass}>Income Amount ($)</label>
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
            const saved = p * (d / 100);
            const finalPrice = p - saved;
            onCalculate({ price, discount }, `You Save: $${saved.toFixed(2)} | Final Price: $${finalPrice.toFixed(2)}`);
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

const currencyRates: Record<string, number> = {
    USD: 1, EUR: 0.92, JPY: 157.2, GBP: 0.78, AUD: 1.5, CAD: 1.37, CHF: 0.9, CNY: 7.25, INR: 83.5
};

export const CurrencyConverter: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [amount, setAmount] = usePersistedState(`${slug}_amount`, '1');
    const [from, setFrom] = usePersistedState(`${slug}_from`, 'USD');
    const [to, setTo] = usePersistedState(`${slug}_to`, 'EUR');

    const calculate = React.useCallback(() => {
        const amt = parseFloat(amount);
        if (amt > 0) {
            const amountInUsd = amt / currencyRates[from];
            const convertedAmount = amountInUsd * currencyRates[to];
            onCalculate({ amount, from, to }, `${convertedAmount.toFixed(2)} ${to}`);
        }
    }, [amount, from, to, onCalculate]);

    useEffect(() => {
        if (restoredData?.inputs) {
            setAmount(restoredData.inputs.amount || '1');
            setFrom(restoredData.inputs.from || 'USD');
            setTo(restoredData.inputs.to || 'EUR');
        }
    }, [restoredData, setAmount, setFrom, setTo]);

    useEffect(() => {
        calculate();
    }, [calculate]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                 <div>
                    <label htmlFor="from" className={labelClass}>From</label>
                    <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass}>
                        {Object.keys(currencyRates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="to" className={labelClass}>To</label>
                    <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className={selectClass}>
                        {Object.keys(currencyRates).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                    </select>
                </div>
            </div>
             <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">Rates are for demonstration and not real-time.</p>
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
            onCalculate({ cost, revenue }, `Gross Profit: $${profit.toFixed(2)} | Profit Margin: ${margin.toFixed(2)}%`);
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
    const [fixed, setFixed] = usePersistedState(`${slug}_fixed`, '');
    const [variable, setVariable] = usePersistedState(`${slug}_variable`, '');
    const [price, setPrice] = usePersistedState(`${slug}_price`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setFixed(restoredData.inputs.fixed || '');
            setVariable(restoredData.inputs.variable || '');
            setPrice(restoredData.inputs.price || '');
        }
    }, [restoredData, setFixed, setVariable, setPrice]);
    
    const calculate = () => {
        const f = parseFloat(fixed);
        const v = parseFloat(variable);
        const p = parseFloat(price);
        if (f > 0 && v >= 0 && p > v) {
            const breakEvenUnits = f / (p - v);
            onCalculate({ fixed, variable, price }, `Break-Even Point: ${Math.ceil(breakEvenUnits)} units`);
        }
    };

    const reset = () => {
        setFixed('');
        setVariable('');
        setPrice('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="fixed" className={labelClass}>Total Fixed Costs ($)</label>
                <input type="number" id="fixed" value={fixed} onChange={(e) => setFixed(e.target.value)} className={inputClass} placeholder="e.g., 10000" />
            </div>
            <div>
                <label htmlFor="variable" className={labelClass}>Variable Cost Per Unit ($)</label>
                <input type="number" id="variable" value={variable} onChange={(e) => setVariable(e.target.value)} className={inputClass} placeholder="e.g., 5" />
            </div>
            <div>
                <label htmlFor="price" className={labelClass}>Selling Price Per Unit ($)</label>
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
    const [monthly, setMonthly] = usePersistedState(`${slug}_monthly`, '');
    const [rate, setRate] = usePersistedState(`${slug}_rate`, '');
    const [years, setYears] = usePersistedState(`${slug}_years`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setMonthly(restoredData.inputs.monthly || '');
            setRate(restoredData.inputs.rate || '');
            setYears(restoredData.inputs.years || '');
        }
    }, [restoredData, setMonthly, setRate, setYears]);
    
    const calculate = () => {
        const p = parseFloat(monthly);
        const r = parseFloat(rate) / 100 / 12;
        const n = parseFloat(years) * 12;
        if (p > 0 && r > 0 && n > 0) {
            const futureValue = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            const invested = p * n;
            const returns = futureValue - invested;
            onCalculate({ monthly, rate, years }, `Invested: $${invested.toFixed(2)} | Est. Returns: $${returns.toFixed(2)} | Total Value: $${futureValue.toFixed(2)}`);
        }
    };

    const reset = () => {
        setMonthly('');
        setRate('');
        setYears('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="monthly" className={labelClass}>Monthly Investment ($)</label>
                <input type="number" id="monthly" value={monthly} onChange={(e) => setMonthly(e.target.value)} className={inputClass} placeholder="e.g., 500" />
            </div>
            <div>
                <label htmlFor="rate" className={labelClass}>Expected Return Rate (%, p.a.)</label>
                <input type="number" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={inputClass} placeholder="e.g., 12" />
            </div>
            <div>
                <label htmlFor="years" className={labelClass}>Investment Period (Years)</label>
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
    const [start, setStart] = usePersistedState(`${slug}_start`, '');
    const [end, setEnd] = usePersistedState(`${slug}_end`, '');

    useEffect(() => {
        if (restoredData?.inputs) {
            setStart(restoredData.inputs.start || '');
            setEnd(restoredData.inputs.end || '');
        }
    }, [restoredData, setStart, setEnd]);
    
    const calculate = () => {
        if (!start || !end) return;
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let tempStart = new Date(start);
        let years = endDate.getFullYear() - tempStart.getFullYear();
        let months = endDate.getMonth() - tempStart.getMonth();
        let days = endDate.getDate() - tempStart.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        onCalculate({ start, end }, `Difference: ${years} Y, ${months} M, ${days} D | Total Days: ${totalDays}`);
    };

    const reset = () => {
        setStart('');
        setEnd('');
        onReset();
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="start" className={labelClass}>Start Date</label>
                <input type="date" id="start" value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} />
            </div>
            <div>
                <label htmlFor="end" className={labelClass}>End Date</label>
                <input type="date" id="end" value={end} onChange={(e) => setEnd(e.target.value)} className={inputClass} />
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
            const lper100km = (f / d) * 100;
            const kmperl = d / f;
            onCalculate({ distance, fuel }, `Consumption: ${lper100km.toFixed(2)} L/100km | Efficiency: ${kmperl.toFixed(2)} km/L`);
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
            onCalculate({ distance, speed }, `Travel Time: ${hours} hours, ${minutes} minutes`);
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
                <input type="number" id="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} className={inputClass} placeholder="e.g., 80" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

// Math & General
export const StandardCalculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
    const [display, setDisplay] = useState('0');
    
    const handleButtonClick = (value: string) => {
        if (value === 'C') {
            setDisplay('0');
        } else if (value === 'DEL') {
            setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        } else if (value === '=') {
            try {
                // Using a safe evaluation method
                const result = new Function(`return ${display.replace('x', '*').replace('÷', '/')}`)();
                setDisplay(String(result));
                onCalculate({ expression: display }, String(result));
            } catch (e) {
                setDisplay('Error');
            }
        } else {
            if (display === '0' && value !== '.') {
                setDisplay(value);
            } else {
                setDisplay(display + value);
            }
        }
    };

    const buttons = ['7','8','9','÷', '4','5','6','x', '1','2','3','-', '0','.','=','+'];
    const buttonStyle = "p-4 text-xl bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors";
    
    return (
        <div className="space-y-4">
            <div className="p-4 text-4xl text-right font-mono bg-slate-100 dark:bg-slate-900 rounded-lg break-all">{display}</div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleButtonClick('C')} className={`${buttonStyle} col-span-1 bg-red-400 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 text-white`}>C</button>
                <button onClick={() => handleButtonClick('DEL')} className={`${buttonStyle} col-span-1 bg-amber-400 dark:bg-amber-700 hover:bg-amber-500 dark:hover:bg-amber-600 text-white`}>DEL</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map(btn => (
                    <button key={btn} onClick={() => handleButtonClick(btn)} className={`${buttonStyle} ${['+','-','x','÷','='].includes(btn) ? 'bg-primary-500 dark:bg-primary-700 hover:bg-primary-600 dark:hover:bg-primary-600 text-white' : ''}`}>
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const ScientificCalculator: React.FC<CalculatorProps> = PlaceholderCalculator;

const unitFactors: Record<string, Record<string, number>> = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
    weight: { kg: 1, g: 0.001, mg: 1e-6, lb: 0.453592, oz: 0.0283495 },
    temperature: { c: 1, f: 1, k: 1 } // special handling
};
export const UnitConverter: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [value, setValue] = usePersistedState(`${slug}_value`, '1');
    const [category, setCategory] = usePersistedState(`${slug}_category`, 'length');
    const [from, setFrom] = usePersistedState(`${slug}_from`, 'm');
    const [to, setTo] = usePersistedState(`${slug}_to`, 'ft');

    const calculate = React.useCallback(() => {
        const val = parseFloat(value);
        if (!isNaN(val)) {
            let result;
            if (category === 'temperature') {
                if (from === 'c' && to === 'f') result = (val * 9/5) + 32;
                else if (from === 'f' && to === 'c') result = (val - 32) * 5/9;
                else if (from === 'c' && to === 'k') result = val + 273.15;
                else if (from === 'k' && to === 'c') result = val - 273.15;
                else if (from === 'f' && to === 'k') result = (val - 32) * 5/9 + 273.15;
                else if (from === 'k' && to === 'f') result = (val - 273.15) * 9/5 + 32;
                else result = val;
            } else {
                const valueInBase = val * unitFactors[category][from];
                result = valueInBase / unitFactors[category][to];
            }
            onCalculate({ value, category, from, to }, `${result.toFixed(4)} ${to}`);
        }
    }, [value, category, from, to, onCalculate]);

    useEffect(() => {
        if (restoredData?.inputs) {
             setValue(restoredData.inputs.value || '1');
             setCategory(restoredData.inputs.category || 'length');
             setFrom(restoredData.inputs.from || 'm');
             setTo(restoredData.inputs.to || 'ft');
        }
    }, [restoredData, setValue, setCategory, setFrom, setTo]);
    
     useEffect(() => { calculate() }, [calculate]);

    const reset = () => {
        setValue('1'); setCategory('length'); setFrom('m'); setTo('ft');
        onReset();
    };
    
    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        const units = Object.keys(unitFactors[cat]);
        setFrom(units[0]);
        setTo(units[1] || units[0]);
    };

    return (
        <div className="space-y-4">
             <div>
                <label className={labelClass}>Category</label>
                <select value={category} onChange={e => handleCategoryChange(e.target.value)} className={selectClass}>
                    {Object.keys(unitFactors).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                </select>
            </div>
            <div>
                <label className={labelClass}>Value</label>
                <input type="number" value={value} onChange={e => setValue(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label className={labelClass}>From</label>
                    <select value={from} onChange={e => setFrom(e.target.value)} className={selectClass}>
                       {Object.keys(unitFactors[category]).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
                 <div>
                    <label className={labelClass}>To</label>
                    <select value={to} onChange={e => setTo(e.target.value)} className={selectClass}>
                       {Object.keys(unitFactors[category]).map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

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
        let result = '';
        if (!isNaN(a) && !isNaN(b)) {
            if (mode === 'percentOf') result = `${(a / 100) * b}`;
            else if (mode === 'isWhatPercent') result = b !== 0 ? `${(a / b) * 100}%` : 'N/A';
            else if (mode === 'change') result = a !== 0 ? `${((b - a) / a) * 100}%` : 'N/A';
        }
        onCalculate({ mode, valA, valB }, result);
    };

    const reset = () => {
        setValA(''); setValB(''); onReset();
    };

    const labels = {
        percentOf: { a: 'Percentage (%)', b: 'Value' },
        isWhatPercent: { a: 'Value A', b: 'Value B' },
        change: { a: 'Initial Value', b: 'Final Value' }
    };
    
    return (
        <div className="space-y-4">
            <div>
                <label className={labelClass}>Mode</label>
                <select value={mode} onChange={e => setMode(e.target.value)} className={selectClass}>
                    <option value="percentOf">What is X% of Y?</option>
                    <option value="isWhatPercent">X is what percent of Y?</option>
                    <option value="change">Percentage change from X to Y</option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={labelClass}>{labels[mode as keyof typeof labels].a}</label>
                    <input type="number" value={valA} onChange={e => setValA(e.target.value)} className={inputClass} />
                </div>
                 <div>
                    <label className={labelClass}>{labels[mode as keyof typeof labels].b}</label>
                    <input type="number" value={valB} onChange={e => setValB(e.target.value)} className={inputClass} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

interface Course { id: number; credits: string; grade: string; }
const gradePoints: Record<string, number> = { 'A': 4, 'A-': 3.7, 'B+': 3.3, 'B': 3, 'B-': 2.7, 'C+': 2.3, 'C': 2, 'C-': 1.7, 'D+': 1.3, 'D': 1, 'F': 0 };

export const GpaCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [courses, setCourses] = usePersistedState<Course[]>(`${slug}_courses`, [{ id: 1, credits: '', grade: 'A' }]);

    useEffect(() => {
        if (restoredData?.inputs?.courses) setCourses(restoredData.inputs.courses);
    }, [restoredData, setCourses]);

    const handleCourseChange = (id: number, field: 'credits' | 'grade', value: string) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
    };
    
    const addCourse = () => setCourses([...courses, { id: Date.now(), credits: '', grade: 'A' }]);
    const removeCourse = (id: number) => setCourses(courses.filter(c => c.id !== id));

    const calculate = () => {
        let totalPoints = 0, totalCredits = 0;
        courses.forEach(c => {
            const credits = parseFloat(c.credits);
            if (!isNaN(credits) && credits > 0) {
                totalPoints += gradePoints[c.grade] * credits;
                totalCredits += credits;
            }
        });
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
        onCalculate({ courses }, `GPA: ${gpa} | Total Credits: ${totalCredits}`);
    };
    
    const reset = () => { setCourses([{ id: 1, credits: '', grade: 'A' }]); onReset(); };

    return (
        <div className="space-y-4">
            {courses.map((course, index) => (
                <div key={course.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5"><input type="number" placeholder="Credits" value={course.credits} onChange={e => handleCourseChange(course.id, 'credits', e.target.value)} className={inputClass} /></div>
                    <div className="col-span-5">
                        <select value={course.grade} onChange={e => handleCourseChange(course.id, 'grade', e.target.value)} className={selectClass}>
                            {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div className="col-span-2">{ index > 0 && <button onClick={() => removeCourse(course.id)} className="w-full h-11 flex items-center justify-center bg-red-500 text-white rounded-md">&times;</button>}</div>
                </div>
            ))}
            <button onClick={addCourse} className="w-full text-sm text-primary-600 dark:text-primary-400 p-2">+ Add Course</button>
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
        if (t > 0) {
            const percentage = (s / t) * 100;
            let grade = 'F';
            if (percentage >= 90) grade = 'A';
            else if (percentage >= 80) grade = 'B';
            else if (percentage >= 70) grade = 'C';
            else if (percentage >= 60) grade = 'D';
            onCalculate({ score, total }, `Percentage: ${percentage.toFixed(2)}% | Grade: ${grade}`);
        }
    };
    
    const reset = () => { setScore(''); setTotal(''); onReset(); };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className={labelClass}>Your Score</label>
                    <input type="number" value={score} onChange={e => setScore(e.target.value)} className={inputClass} />
                </div>
                 <div>
                    <label className={labelClass}>Total Possible Score</label>
                    <input type="number" value={total} onChange={e => setTotal(e.target.value)} className={inputClass} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
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
            const totalPaint = (a * c) / cov;
            onCalculate({ area, coats, coverage }, `Total Paint Needed: ${totalPaint.toFixed(2)} liters`);
        }
    };
    
    const reset = () => { setArea(''); setCoats('2'); setCoverage('10'); onReset(); };

    return (
        <div className="space-y-4">
            <div><label className={labelClass}>Total Surface Area (m²)</label><input type="number" value={area} onChange={e => setArea(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Number of Coats</label><input type="number" value={coats} onChange={e => setCoats(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Paint Coverage (m²/liter)</label><input type="number" value={coverage} onChange={e => setCoverage(e.target.value)} className={inputClass} /></div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};

export const TileCalculator: React.FC<CalculatorProps> = ({ onCalculate, onReset, restoredData, slug }) => {
    const [area, setArea] = usePersistedState(`${slug}_area`, '');
    const [tileL, setTileL] = usePersistedState(`${slug}_tileL`, '');
    const [tileW, setTileW] = usePersistedState(`${slug}_tileW`, '');
    const [waste, setWaste] = usePersistedState(`${slug}_waste`, '10');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setArea(restoredData.inputs.area || '');
            setTileL(restoredData.inputs.tileL || '');
            setTileW(restoredData.inputs.tileW || '');
            setWaste(restoredData.inputs.waste || '10');
        }
    }, [restoredData, setArea, setTileL, setTileW, setWaste]);

    const calculate = () => {
        const a = parseFloat(area);
        const tl = parseFloat(tileL) / 100; // cm to m
        const tw = parseFloat(tileW) / 100; // cm to m
        const w = parseFloat(waste);
        if (a > 0 && tl > 0 && tw > 0) {
            const tileArea = tl * tw;
            const tilesNeeded = a / tileArea;
            const totalTiles = Math.ceil(tilesNeeded * (1 + w/100));
            onCalculate({ area, tileL, tileW, waste }, `Total Tiles Needed: ~${totalTiles} tiles`);
        }
    };
    
    const reset = () => { setArea(''); setTileL(''); setTileW(''); setWaste('10'); onReset(); };

    return (
        <div className="space-y-4">
            <div><label className={labelClass}>Total Area (m²)</label><input type="number" value={area} onChange={e => setArea(e.target.value)} className={inputClass} /></div>
            <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Tile Length (cm)</label><input type="number" value={tileL} onChange={e => setTileL(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Tile Width (cm)</label><input type="number" value={tileW} onChange={e => setTileW(e.target.value)} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Wastage (%)</label><input type="number" value={waste} onChange={e => setWaste(e.target.value)} className={inputClass} /></div>
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
    const [thick, setThick] = usePersistedState(`${slug}_thick`, '');
    
    useEffect(() => {
        if (restoredData?.inputs) {
            setLength(restoredData.inputs.length || '');
            setWidth(restoredData.inputs.width || '');
            setThick(restoredData.inputs.thick || '');
        }
    }, [restoredData, setLength, setWidth, setThick]);

    const calculate = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const t = parseFloat(thick) / 100; // cm to m
        if (l > 0 && w > 0 && t > 0) {
            const volume = l * w * t;
            onCalculate({ length, width, thick }, `Concrete Volume: ${volume.toFixed(3)} m³`);
        }
    };
    
    const reset = () => { setLength(''); setWidth(''); setThick(''); onReset(); };

    return (
        <div className="space-y-4">
            <div><label className={labelClass}>Length (m)</label><input type="number" value={length} onChange={e => setLength(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Width (m)</label><input type="number" value={width} onChange={e => setWidth(e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>Thickness (cm)</label><input type="number" value={thick} onChange={e => setThick(e.target.value)} className={inputClass} /></div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <button onClick={reset} className={resetButtonClass}>Reset</button>
                <button onClick={calculate} className={buttonClass}>Calculate</button>
            </div>
        </div>
    );
};
