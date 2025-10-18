
import React from 'react';
import SeoManager from './SeoManager';

interface InfoPageProps {
  title: string;
  content: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, content }) => {
  const slug = `/${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="max-w-3xl mx-auto">
      <SeoManager 
        title={title}
        description={`Learn more about ${title} for the 30-in-1 Calculator Pro app.`}
        keywords={[title.toLowerCase(), 'information', 'details']}
        slug={slug}
      />
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">{title}</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
