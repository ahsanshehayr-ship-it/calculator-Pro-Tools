
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../App';
import type { ThemeContextType } from '../types';
import { CALCULATORS } from '../constants';
import { CalculatorCategory } from '../types';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon, HomeIcon, InformationCircleIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { CalculatorIcon as SolidCalculatorIcon } from '@heroicons/react/24/solid';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = Object.values(CalculatorCategory).map(category => ({
    name: category,
    calculators: CALCULATORS.filter(c => c.category === category),
  }));

  const infoLinks = [
    { name: 'About Us', path: '/about', icon: InformationCircleIcon },
    { name: 'Feedback', path: '/feedback', icon: ChatBubbleLeftRightIcon },
    { name: 'Terms of Use', path: '/terms', icon: DocumentTextIcon },
    { name: 'Privacy Policy', path: '/privacy', icon: ShieldCheckIcon },
  ];

  const SidebarContent = () => (
    <>
     <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <SolidCalculatorIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">Calculator Pro</h1>
        </Link>
      </div>
    <nav className="flex-1 px-4 py-4 space-y-2">
      <NavLink 
        to="/" 
        className={({isActive}) => `flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        onClick={() => setSidebarOpen(false)}
      >
        <HomeIcon className="w-5 h-5 mr-3" />
        Home
      </NavLink>
      {navLinks.map((group) => (
        <div key={group.name}>
          <h3 className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{group.name}</h3>
          {group.calculators.map((calc) => (
            <NavLink
              key={calc.slug}
              to={`/calculators/${calc.slug}`}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`
              }
            >
              <calc.icon className="w-5 h-5 mr-3" />
              {calc.name}
            </NavLink>
          ))}
        </div>
      ))}
       <div>
            <h3 className="px-4 mt-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Information</h3>
            {infoLinks.map((link) => (
                 <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                        isActive
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`
                    }
                    >
                    <link.icon className="w-5 h-5 mr-3" />
                    {link.name}
                </NavLink>
            ))}
       </div>
    </nav>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 flex transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="w-72 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-full overflow-y-auto">
             <SidebarContent />
          </div>
          <div className="flex-shrink-0 w-14" onClick={() => setSidebarOpen(false)} aria-hidden="true"></div>
      </div>
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
           <SidebarContent />
        </div>
      </aside>

      <div className="flex flex-col flex-1 w-full">
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <button className="md:hidden p-1 mr-5 -ml-1 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
          <div className="flex-1" />
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 focus:ring-primary-500">
            {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
          </button>
        </header>
        <main className="flex-1 flex flex-col overflow-y-auto p-4 md:p-8">
          <div className="flex-grow">
            {children}
          </div>
          <footer className="text-center text-sm text-slate-500 dark:text-slate-400 py-4 mt-auto border-t border-slate-200 dark:border-slate-700 space-x-4">
              <Link to="/about" className="hover:text-primary-500 hover:underline">About Us</Link>
              <Link to="/feedback" className="hover:text-primary-500 hover:underline">Feedback</Link>
              <Link to="/terms" className="hover:text-primary-500 hover:underline">Terms of Use</Link>
              <Link to="/privacy" className="hover:text-primary-500 hover:underline">Privacy Policy</Link>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
