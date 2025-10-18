import React from 'react';
import InfoPage from '../components/InfoPage';

const AboutUsPage: React.FC = () => {
  const content = (
    <>
      <p className="mb-4 text-lg">
        Welcome to <strong>30-in-1 Calculator Pro</strong>, your all-in-one solution for a wide range of calculation needs.
      </p>
      <p className="mb-4">
        Born from a desire to create a single, reliable, and accessible resource for everyday calculations, our mission is to provide a comprehensive and intuitive tool that simplifies complex problems for everyone—from students and professionals to homeowners and hobbyists.
      </p>
       <h2 className="text-xl font-semibold mb-2 mt-6">Our Vision</h2>
      <p className="mb-4">
        In a world of specialized apps, we saw the need for a unified platform. Why clutter your device with dozens of single-purpose apps when you can have one powerful tool that does it all? We've meticulously designed and curated a collection of 30 essential calculators, ensuring accuracy, ease of use, and a seamless user experience across all devices.
      </p>
      <h2 className="text-xl font-semibold mb-2 mt-6">What We Offer</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Financial Calculators:</strong> Plan your loans, investments, and savings with confidence.</li>
        <li><strong>Health & Fitness Calculators:</strong> Monitor your health metrics like BMI, BMR, and daily water intake.</li>
        <li><strong>Math & General Calculators:</strong> From basic arithmetic to scientific calculations and unit conversions.</li>
        <li><strong>Construction & Home Calculators:</strong> Estimate materials for your home improvement projects.</li>
        <li><strong>Lifestyle Calculators:</strong> Useful tools for everyday situations, like calculating tips or travel time.</li>
      </ul>
      <p>
        We are passionate about building tools that make a difference. We are constantly working to improve and expand our collection of calculators based on user feedback. Our goal is to be the only calculator app you'll ever need. Thank you for choosing 30-in-1 Calculator Pro!
      </p>
    </>
  );

  return <InfoPage title="About Us" content={content} />;
};

export default AboutUsPage;
