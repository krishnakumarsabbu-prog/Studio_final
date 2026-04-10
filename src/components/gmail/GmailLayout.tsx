import React, { useState } from 'react';
import GmailHeader from './GmailHeader';
import GmailSidebar from './GmailSidebar';
import InboxView from './InboxView';
import EmailView from './EmailView';
import { inboxEmails, getEmailHtml, EmailMeta } from '../../data/inboxEmails';

const GmailLayout: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailMeta | null>(null);
  const [emailHtml, setEmailHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailClick = (email: EmailMeta) => {
    setIsLoading(true);
    setSelectedEmail(email);
    setEmailHtml(null);
    setTimeout(() => {
      setEmailHtml(getEmailHtml(email.id));
      setIsLoading(false);
    }, 300);
  };

  const handleBack = () => {
    setSelectedEmail(null);
    setEmailHtml(null);
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: '100vh', backgroundColor: '#f6f8fc', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
    >
      <GmailHeader />
      <div className="flex flex-1 overflow-hidden">
        <GmailSidebar />
        <main className="flex-1 overflow-hidden">
          {selectedEmail ? (
            <EmailView
              emailHtml={emailHtml}
              isLoading={isLoading}
              emailMeta={selectedEmail}
              onBack={handleBack}
            />
          ) : (
            <InboxView emails={inboxEmails} onEmailClick={handleEmailClick} />
          )}
        </main>
      </div>
    </div>
  );
};

export default GmailLayout;
