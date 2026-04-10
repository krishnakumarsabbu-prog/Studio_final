import React from 'react';
import GmailHeader from './GmailHeader';
import GmailSidebar from './GmailSidebar';
import EmailView from './EmailView';

interface GmailLayoutProps {
  emailHtml: string | null;
  onGenerate: () => void;
  isLoading: boolean;
}

const GmailLayout: React.FC<GmailLayoutProps> = ({ emailHtml, onGenerate, isLoading }) => {
  return (
    <div
      className="flex flex-col"
      style={{ height: '100vh', backgroundColor: '#f6f8fc', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
    >
      {/* Top Header */}
      <GmailHeader />

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <GmailSidebar />

        {/* Main Email View */}
        <main className="flex-1 overflow-hidden">
          <EmailView emailHtml={emailHtml} onGenerate={onGenerate} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
};

export default GmailLayout;
