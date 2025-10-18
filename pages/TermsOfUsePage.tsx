import React from 'react';
import InfoPage from '../components/InfoPage';

const TermsOfUsePage: React.FC = () => {
  const content = (
    <>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mb-4">
        Please read these terms and conditions ("Terms") carefully before using the 30-in-1 Calculator Pro application (the "Service").
      </p>
      
      <h2 className="text-xl font-semibold mt-4 mb-2">Acknowledgment</h2>
      <p className="mb-4">
        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
      </p>
      
      <h2 className="text-xl font-semibold mt-4 mb-2">Use of Service</h2>
      <p className="mb-4">
        The Service and its calculators are provided for informational and educational purposes only. The calculations are not a substitute for professional advice. You agree to use this Service at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Intellectual Property</h2>
      <p className="mb-4">
        The Service and its original content, features, and functionality are and will remain the exclusive property of the application owners.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Disclaimer and Limitation of Liability</h2>
      <p className="mb-4">
        The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for accuracy, we make no warranties, express or implied, regarding the accuracy, reliability, or completeness of any information provided. We shall not be liable for any decisions made or actions taken in reliance on the information provided by the Service. You should always consult with a qualified professional for financial, health, or other important decisions.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Changes to These Terms</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Use on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms, please contact us through the Feedback page.
      </p>
    </>
  );

  return <InfoPage title="Terms of Use" content={content} />;
};

export default TermsOfUsePage;
