import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import { CalculatorCategory } from '../types';
import SeoManager from '../components/SeoManager';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const categoryStyles: { [key in CalculatorCategory]: { border: string, bg: string, text: string } } = {
  [CalculatorCategory.FINANCIAL]: { border: 'border-green-500', bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-300' },
  [CalculatorCategory.HEALTH]: { border: 'border-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/50', text: 'text-teal-600 dark:text-teal-300' },
  [CalculatorCategory.MATH]: { border: 'border-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-600 dark:text-orange-300' },
  [CalculatorCategory.CONSTRUCTION]: { border: 'border-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/50', text: 'text-amber-600 dark:text-amber-300' },
  [CalculatorCategory.LIFESTYLE]: { border: 'border-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-600 dark:text-purple-300' },
  [CalculatorCategory.GAMES]: { border: 'border-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/50', text: 'text-pink-600 dark:text-pink-300' },
};


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalculators = CALCULATORS.filter(
    (calc) =>
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const groupedCalculators = Object.values(CalculatorCategory).map(category => ({
      name: category,
      calculators: filteredCalculators.filter(c => c.category === category)
  })).filter(group => group.calculators.length > 0);


  return (
    <div className="container mx-auto">
       <SeoManager 
        title="Home"
        description="A free, comprehensive 30-in-1 calculator tool website for all your calculation needs, from finance and health to math and lifestyle."
        keywords={['calculators', 'free tools', 'online calculator', 'finance calculator', 'health calculator']}
        slug="/"
      />
      <div className="text-center p-8 md:p-12 mb-10 rounded-3xl bg-gradient-to-br from-primary-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
        <h1 className="text-4xl md:text-6xl font-extrabold font-display text-slate-800 dark:text-slate-100 mb-3">
          30-in-1 Calculator Pro
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your one-stop destination for all calculation needs. Fast, free, and easy to use.
        </p>
         <div className="mt-8 max-w-xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for a calculator..."
              className="w-full pl-12 pr-4 py-3 text-lg bg-white/70 dark:bg-slate-700/50 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>
        {groupedCalculators.map((group) => (
            <div key={group.name} className="mb-12">
            <h2 className={`text-2xl font-bold font-display text-slate-800 dark:text-slate-200 mb-6 pb-2 border-b-2 ${categoryStyles[group.name as CalculatorCategory].border}`}>
                {group.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.calculators.map((calc) => (
                <Link
                    key={calc.slug}
                    to={`/calculators/${calc.slug}`}
                    className="group block p-6 rounded-2xl bg-white dark:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 shadow-lg border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500"
                >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-colors duration-300 ${categoryStyles[calc.category].bg} group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50`}>
                    <calc.icon className={`w-7 h-7 transition-colors duration-300 ${categoryStyles[calc.category].text} group-hover:text-primary-600 dark:group-hover:text-primary-300`} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">{calc.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{calc.description}</p>
                </Link>
                ))}
            </div>
            </div>
        ))}
    </div>
  );
};

export default HomePage;
