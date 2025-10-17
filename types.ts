import React from 'react';

export enum CalculatorCategory {
  FINANCIAL = 'Financial',
  HEALTH = 'Health & Fitness',
  MATH = 'Math & General',
  CONSTRUCTION = 'Construction & Home',
  LIFESTYLE = 'Lifestyle',
}

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  category: CalculatorCategory;
  component: React.ComponentType;
  // FIX: Replaced `JSX.Element` with `React.ReactElement` to resolve issue with JSX namespace not being found in a .ts file.
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface AdContextType {
  showInterstitialAd: () => void;
  registerCalculation: () => void;
}

export interface BackupData {
  calculator: string;
  inputs: Record<string, any>;
  result: string;
  timestamp: string;
}
