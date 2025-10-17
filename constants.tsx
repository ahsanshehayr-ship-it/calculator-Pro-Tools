
import React from 'react';
import type { Calculator } from './types';
import { CalculatorCategory } from './types';
import { 
    BmiCalculator, LoanCalculator, TipCalculator, AgeCalculator, PlaceholderCalculator,
    BmrCalculator, IdealWeightCalculator, HeartRateCalculator, WaterIntakeCalculator,
    EMICalculator, CompoundInterestCalculator, SimpleInterestCalculator, RoiCalculator,
    TaxCalculator, DiscountCalculator, CurrencyConverter, ProfitMarginCalculator,
    BreakEvenCalculator, SipCalculator, DateDifferenceCalculator, FuelConsumptionCalculator,
    TravelTimeCalculator, StandardCalculator, ScientificCalculator, UnitConverter,
    PercentageCalculator, GpaCalculator, GradePercentageCalculator, PaintCalculator,
    TileCalculator, ConcreteVolumeCalculator
} from './components/calculators';
import { BeakerIcon, ScaleIcon, BanknotesIcon, GiftIcon, CakeIcon, VariableIcon, CalculatorIcon, ArrowPathIcon, CurrencyDollarIcon, SunIcon, FireIcon, MapIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';


export const CALCULATORS: Calculator[] = [
  // Health
  { slug: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate your Body Mass Index.', keywords: ['bmi', 'health', 'weight'], category: CalculatorCategory.HEALTH, component: BmiCalculator, icon: (props) => <ScaleIcon {...props}/> },
  { slug: 'bmr-calculator', name: 'BMR Calculator', description: 'Calculate your Basal Metabolic Rate.', keywords: ['bmr', 'calories', 'health'], category: CalculatorCategory.HEALTH, component: BmrCalculator, icon: (props) => <FireIcon {...props}/> },
  { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', description: 'Find your ideal body weight.', keywords: ['weight', 'health'], category: CalculatorCategory.HEALTH, component: IdealWeightCalculator, icon: (props) => <UserGroupIcon {...props}/> },
  { slug: 'heart-rate-calculator', name: 'Heart Rate Calculator', description: 'Calculate your target heart rate.', keywords: ['heart', 'fitness', 'exercise'], category: CalculatorCategory.HEALTH, component: HeartRateCalculator, icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg> },
  { slug: 'water-intake-calculator', name: 'Water Intake Calculator', description: 'Estimate your daily water needs.', keywords: ['water', 'hydration', 'health'], category: CalculatorCategory.HEALTH, component: WaterIntakeCalculator, icon: (props) => <BeakerIcon {...props}/> },

  // Financial
  { slug: 'loan-calculator', name: 'Loan Calculator', description: 'Calculate loan payments and interest.', keywords: ['loan', 'emi', 'interest', 'finance'], category: CalculatorCategory.FINANCIAL, component: LoanCalculator, icon: (props) => <BanknotesIcon {...props}/> },
  { slug: 'emi-calculator', name: 'EMI Calculator', description: 'Calculate Equated Monthly Installment.', keywords: ['emi', 'loan', 'finance'], category: CalculatorCategory.FINANCIAL, component: EMICalculator, icon: (props) => <CalculatorIcon {...props}/> },
  { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', description: 'Calculate compound interest.', keywords: ['interest', 'investment', 'finance'], category: CalculatorCategory.FINANCIAL, component: CompoundInterestCalculator, icon: (props) => <VariableIcon {...props}/> },
  { slug: 'simple-interest-calculator', name: 'Simple Interest Calculator', description: 'Calculate simple interest.', keywords: ['interest', 'finance'], category: CalculatorCategory.FINANCIAL, component: SimpleInterestCalculator, icon: (props) => <VariableIcon {...props}/> },
  { slug: 'roi-calculator', name: 'ROI Calculator', description: 'Calculate Return on Investment.', keywords: ['roi', 'investment', 'finance'], category: CalculatorCategory.FINANCIAL, component: RoiCalculator, icon: (props) => <ArrowPathIcon {...props}/> },
  { slug: 'tax-calculator', name: 'Tax Calculator', description: 'Estimate your income tax.', keywords: ['tax', 'income', 'finance'], category: CalculatorCategory.FINANCIAL, component: TaxCalculator, icon: (props) => <ScaleIcon {...props}/> },
  { slug: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate discounts and savings.', keywords: ['discount', 'sale', 'shopping'], category: CalculatorCategory.FINANCIAL, component: DiscountCalculator, icon: (props) => <GiftIcon {...props}/> },
  { slug: 'currency-converter', name: 'Currency Converter', description: 'Convert between different currencies.', keywords: ['currency', 'exchange', 'finance'], category: CalculatorCategory.FINANCIAL, component: CurrencyConverter, icon: (props) => <CurrencyDollarIcon {...props}/> },
  { slug: 'profit-margin-calculator', name: 'Profit Margin Calculator', description: 'Calculate your profit margin.', keywords: ['profit', 'business', 'finance'], category: CalculatorCategory.FINANCIAL, component: ProfitMarginCalculator, icon: (props) => <BanknotesIcon {...props}/> },
  { slug: 'break-even-calculator', name: 'Break-even Calculator', description: 'Find your business break-even point.', keywords: ['break-even', 'business', 'finance'], category: CalculatorCategory.FINANCIAL, component: BreakEvenCalculator, icon: (props) => <BanknotesIcon {...props}/> },
  { slug: 'sip-calculator', name: 'SIP Calculator', description: 'Calculate returns on your SIP investment.', keywords: ['sip', 'investment', 'finance'], category: CalculatorCategory.FINANCIAL, component: SipCalculator, icon: (props) => <VariableIcon {...props}/> },

  // Lifestyle
  { slug: 'age-calculator', name: 'Age Calculator', description: 'Calculate age from date of birth.', keywords: ['age', 'birthday', 'date'], category: CalculatorCategory.LIFESTYLE, component: AgeCalculator, icon: (props) => <CakeIcon {...props}/> },
  { slug: 'date-difference-calculator', name: 'Date Difference Calculator', description: 'Calculate the difference between two dates.', keywords: ['date', 'time', 'duration'], category: CalculatorCategory.LIFESTYLE, component: DateDifferenceCalculator, icon: (props) => <CakeIcon {...props}/> },
  { slug: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate tips for bills.', keywords: ['tip', 'restaurant', 'bill'], category: CalculatorCategory.LIFESTYLE, component: TipCalculator, icon: (props) => <GiftIcon {...props}/> },
  { slug: 'fuel-consumption-calculator', name: 'Fuel Consumption Calculator', description: 'Calculate your vehicle\'s fuel usage.', keywords: ['fuel', 'car', 'travel'], category: CalculatorCategory.LIFESTYLE, component: FuelConsumptionCalculator, icon: (props) => <FireIcon {...props}/> },
  { slug: 'travel-distance-calculator', name: 'Travel Time Calculator', description: 'Calculate travel time and distance.', keywords: ['travel', 'map', 'distance', 'time'], category: CalculatorCategory.LIFESTYLE, component: TravelTimeCalculator, icon: (props) => <MapIcon {...props}/> },

  // Math & General
  { slug: 'standard-calculator', name: 'Standard Calculator', description: 'A standard calculator for basic arithmetic.', keywords: ['math', 'arithmetic'], category: CalculatorCategory.MATH, component: StandardCalculator, icon: (props) => <CalculatorIcon {...props}/> },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', description: 'An advanced scientific calculator.', keywords: ['math', 'science', 'trigonometry'], category: CalculatorCategory.MATH, component: ScientificCalculator, icon: (props) => <CalculatorIcon {...props}/> },
  { slug: 'unit-converter', name: 'Unit Converter', description: 'Convert between various units.', keywords: ['unit', 'conversion', 'measurement'], category: CalculatorCategory.MATH, component: UnitConverter, icon: (props) => <ArrowPathIcon {...props}/> },
  { slug: 'percentage-calculator', name: 'Percentage Calculator', description: 'Calculate percentages easily.', keywords: ['percentage', 'math'], category: CalculatorCategory.MATH, component: PercentageCalculator, icon: (props) => <VariableIcon {...props}/> },
  { slug: 'gpa-calculator', name: 'GPA Calculator', description: 'Calculate your Grade Point Average.', keywords: ['gpa', 'education', 'grades'], category: CalculatorCategory.MATH, component: GpaCalculator, icon: (props) => <SunIcon {...props}/> },
  { slug: 'grade-percentage-calculator', name: 'Grade Percentage Calculator', description: 'Calculate your academic grade.', keywords: ['grade', 'education', 'school'], category: CalculatorCategory.MATH, component: GradePercentageCalculator, icon: (props) => <SunIcon {...props}/> },

  // Construction & Home
  { slug: 'paint-calculator', name: 'Paint Calculator', description: 'Estimate the amount of paint needed.', keywords: ['paint', 'home', 'diy'], category: CalculatorCategory.CONSTRUCTION, component: PaintCalculator, icon: (props) => <BuildingOfficeIcon {...props}/> },
  { slug: 'tile-calculator', name: 'Tile Calculator', description: 'Estimate the number of tiles needed.', keywords: ['tile', 'home', 'diy', 'flooring'], category: CalculatorCategory.CONSTRUCTION, component: TileCalculator, icon: (props) => <BuildingOfficeIcon {...props}/> },
  { slug: 'concrete-volume-calculator', name: 'Concrete Volume Calculator', description: 'Calculate the volume of concrete required.', keywords: ['concrete', 'construction', 'diy'], category: CalculatorCategory.CONSTRUCTION, component: ConcreteVolumeCalculator, icon: (props) => <BuildingOfficeIcon {...props}/> },
];
