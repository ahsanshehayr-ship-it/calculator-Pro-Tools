import React from 'react';
import { Link } from 'react-router-dom';
import InfoPage from '../components/InfoPage';

const PrivacyPolicyPage: React.FC = () => {
  const content = (
    <>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <p className="mb-4">
        This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of your information when you use the Service. We respect your privacy and are committed to protecting it.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Information We Do Not Collect</h2>
      <p className="mb-4">
        We do not collect, store, or transmit any personally identifiable information (PII). All calculations are performed entirely on your device, and we have no access to your data. We do not require you to create an account or provide any personal details to use our Service.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Local Storage Usage</h2>
      <p className="mb-4">
        To enhance your user experience, this application uses your browser's "Local Storage" feature. This allows us to save your inputs for each calculator directly on your own device. When you return to a calculator, your previous entries will be conveniently pre-filled.
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Data is Private:</strong> This data is stored only on your computer or mobile device and is never transmitted to our servers or any third party.</li>
        <li><strong>You Are in Control:</strong> You can clear this data at any time by clearing your browser's cache and site data for this application.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 mb-2">Third-Party Advertisements</h2>
      <p className="mb-4">
        To keep this Service free, we partner with Google AdMob to display advertisements. AdMob is a third-party service that may collect and use anonymized data to provide personalized ads. This may include information like your device type and general location (e.g., country or city).
      </p>
       <p className="mb-4">
        We encourage you to review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google's Privacy Policy</a> to understand how they handle your data. We do not share any data from the calculator inputs with our advertising partners.
      </p>
       <h2 className="text-xl font-semibold mt-4 mb-2">Backup & Share Feature</h2>
       <p className="mb-4">
        Our "Share" feature generates a unique link containing your calculation data. This data is encoded directly into the link itself. Anyone you share this link with will be able to see your inputs and results. Do not share these links if they contain sensitive information. The data is not stored on our servers.
      </p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Changes to this Privacy Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>
       <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
       <p className="mb-4">
        If you have any questions about this Privacy Policy, please use the <Link to="/feedback" className="text-primary-600 dark:text-primary-400 hover:underline">Feedback</Link> page.
       </p>
    </>
  );

  return <InfoPage title="Privacy Policy" content={content} />;
};

export default PrivacyPolicyPage;
