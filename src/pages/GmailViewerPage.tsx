import React, { useState } from 'react';
import GmailLayout from '../components/gmail/GmailLayout';
import { sampleHdfcEmail } from '../data/sampleEmail';

const GmailViewerPage: React.FC = () => {
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setEmailHtml(sampleHdfcEmail);
      setIsLoading(false);
    }, 600);
  };

  return (
    <GmailLayout emailHtml={emailHtml} onGenerate={handleGenerate} isLoading={isLoading} />
  );
};

export default GmailViewerPage;
