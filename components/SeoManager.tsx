
import React, { useEffect } from 'react';

interface SeoManagerProps {
  title: string;
  description: string;
  keywords: string[];
  slug: string;
}

const SeoManager: React.FC<SeoManagerProps> = ({ title, description, keywords, slug }) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | 30-in-1 Calculator Pro`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords.join(', '));

    // Update canonical link
    const canonicalUrl = `${window.location.origin}${window.location.pathname}#${slug}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update or create JSON-LD schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": `${title} | 30-in-1 Calculator Pro`,
      "description": description,
      "url": canonicalUrl,
      "applicationCategory": "Tool"
    };
    
    let schemaScript = document.getElementById('app-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'app-schema');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema, null, 2);

  }, [title, description, keywords, slug]);

  return null;
};

export default SeoManager;
