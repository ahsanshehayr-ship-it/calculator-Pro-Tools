
import React, { useState } from 'react';
import SeoManager from '../components/SeoManager';

const FeedbackPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') {
        alert('Please enter your feedback.');
        return;
    }
    // In a real application, you would send this data to a server.
    console.log({ name, email, message });
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
       <SeoManager 
        title="Feedback"
        description="Submit your feedback to help us improve the 30-in-1 Calculator Pro application."
        keywords={['feedback', 'contact', 'support', 'suggestion']}
        slug="/feedback"
      />
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Submit Feedback</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-6">We'd love to hear from you! Your feedback helps us improve.</p>

        {submitted ? (
          <div className="text-center p-8 bg-green-50 dark:bg-green-900/50 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300">Thank You!</h2>
            <p className="mt-2 text-green-600 dark:text-green-400">Your feedback has been received.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name (Optional)</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email (Optional)</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Feedback</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us what you think..."
              />
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-3 text-base font-semibold text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
