
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CALCULATORS } from '../constants';
import { CalculatorCategory } from '../types';
import SeoManager from '../components/SeoManager';

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
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          30-in-1 Calculator Pro
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Your one-stop destination for all calculation needs.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for a calculator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      {groupedCalculators.map(group => (
        <div key={group.name} className="mb-12">
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 border-b-2 border-primary-500 pb-2 mb-6">{group.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {group.calculators.map((calc) => (
              <Link
                key={calc.slug}
                to={`/calculators/${calc.slug}`}
                className="block p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 mb-4">
                      <calc.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                  </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{calc.name}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
      {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400">No calculators found for "{searchTerm}".</p>
          </div>
      )}
    </div>
  );
};

export default HomePage;
