import React, { useState } from 'react';
import {
  ArrowLeft,
  Archive,
  AlertOctagon,
  Trash2,
  Mail,
  FolderOpen,
  MoreVertical,
  Star,
  Reply,
  Forward,
  Smile,
  Printer,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import GmailViewer from './GmailViewer';

interface EmailViewProps {
  emailHtml: string | null;
  onGenerate: () => void;
  isLoading: boolean;
}

const EmailView: React.FC<EmailViewProps> = ({ emailHtml, onGenerate, isLoading }) => {
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [zoom, setZoom] = useState(100);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#f6f8fc' }}>
      {/* Top Action Bar */}
      <div
        className="flex items-center px-4 h-14 gap-1 flex-shrink-0"
        style={{ backgroundColor: '#f6f8fc' }}
      >
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors">
          <ArrowLeft size={20} style={{ color: '#444746' }} />
        </button>
        <div className="flex items-center gap-0.5 ml-1">
          <ActionBtn icon={<Archive size={18} />} title="Archive" />
          <ActionBtn icon={<AlertOctagon size={18} />} title="Report spam" />
          <ActionBtn icon={<Trash2 size={18} />} title="Delete" />
          <div className="w-px h-5 mx-1" style={{ backgroundColor: '#e0e0e0' }} />
          <ActionBtn icon={<Mail size={18} />} title="Mark as unread" />
          <ActionBtn icon={<FolderOpen size={18} />} title="Move to" />
          <ActionBtn icon={<MoreVertical size={18} />} title="More" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ fontSize: '13px', color: '#444746', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>
            1 of 519
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors">
            <ChevronLeft size={18} style={{ color: '#444746' }} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors">
            <ChevronRight size={18} style={{ color: '#444746' }} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {!emailHtml && !isLoading ? (
          <EmptyState onGenerate={onGenerate} />
        ) : isLoading ? (
          <LoadingState />
        ) : (
          <div
            className="mx-auto rounded-2xl overflow-hidden"
            style={{ maxWidth: '900px', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            {/* Subject + Labels */}
            <div className="flex items-start justify-between px-6 pt-5 pb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  style={{
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#202124',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  Revised TCS Rates on Foreign Exchange transactions under LRS from 1st April 2026
                </h1>
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: '#e8f0fe', color: '#1a73e8', fontSize: '12px', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
                >
                  Inbox
                  <button className="ml-1 opacity-60 hover:opacity-100">×</button>
                </span>
              </div>
              <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                <ActionBtn icon={<Printer size={18} />} title="Print" />
                <ActionBtn icon={<ExternalLink size={18} />} title="Open in new window" />
              </div>
            </div>

            {/* Sender Row */}
            <div className="flex items-start justify-between px-6 py-3">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-medium text-white text-sm"
                  style={{ backgroundColor: '#D71E28', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
                >
                  H
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{ fontSize: '14px', fontWeight: 600, color: '#202124', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
                    >
                      HDFC Bank
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a73e8">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span
                      style={{ fontSize: '13px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
                    >
                      &lt;information@mailers.hdfcbank.bank.in&gt;
                    </span>
                    <button
                      style={{ fontSize: '13px', color: '#D71E28', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', textDecoration: 'underline' }}
                    >
                      Unsubscribe
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span style={{ fontSize: '13px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>
                      to me
                    </span>
                    <button style={{ color: '#5f6368' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 10l5 5 5-5H7z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* Time + Actions */}
              <div className="flex items-center gap-2 ml-4">
                <span style={{ fontSize: '13px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', whiteSpace: 'nowrap' }}>
                  2:37 PM (6 hours ago)
                </span>
                <ActionBtn icon={<Star size={18} />} title="Star" />
                <ActionBtn icon={<Reply size={18} />} title="Reply" />
                <ActionBtn icon={<MoreVertical size={18} />} title="More" />
              </div>
            </div>

            {/* View controls bar */}
            <div
              className="flex items-center justify-between px-6 py-2 border-t"
              style={{ borderColor: '#f1f3f4', backgroundColor: '#fafafa' }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '12px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>View:</span>
                <button
                  onClick={() => setViewMode('rendered')}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: viewMode === 'rendered' ? '#1a73e8' : 'transparent',
                    color: viewMode === 'rendered' ? '#fff' : '#5f6368',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    border: '1px solid ' + (viewMode === 'rendered' ? '#1a73e8' : '#dadce0'),
                    fontSize: '12px',
                  }}
                >
                  Rendered View
                </button>
                <button
                  onClick={() => setViewMode('raw')}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: viewMode === 'raw' ? '#1a73e8' : 'transparent',
                    color: viewMode === 'raw' ? '#fff' : '#5f6368',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    border: '1px solid ' + (viewMode === 'raw' ? '#1a73e8' : '#dadce0'),
                    fontSize: '12px',
                  }}
                >
                  Raw HTML
                </button>
              </div>
              {viewMode === 'rendered' && (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '12px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>Zoom:</span>
                  {[90, 100, 110].map(z => (
                    <button
                      key={z}
                      onClick={() => setZoom(z)}
                      className="px-2 py-0.5 rounded text-xs transition-colors"
                      style={{
                        backgroundColor: zoom === z ? '#e8f0fe' : 'transparent',
                        color: zoom === z ? '#1a73e8' : '#5f6368',
                        fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                        fontSize: '12px',
                        fontWeight: zoom === z ? 600 : 400,
                      }}
                    >
                      {z}%
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Email Body */}
            <div className="overflow-hidden" style={{ backgroundColor: '#f4f4f4' }}>
              <GmailViewer emailHtml={emailHtml!} zoom={zoom} viewMode={viewMode} />
            </div>

            {/* Reply / Forward footer */}
            <div
              className="flex items-center gap-3 px-6 py-4 border-t"
              style={{ borderColor: '#f1f3f4' }}
            >
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors hover:bg-black/5"
                style={{
                  border: '1px solid #dadce0',
                  color: '#444746',
                  fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                  fontSize: '14px',
                }}
              >
                <Reply size={16} />
                Reply
              </button>
              <button
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors hover:bg-black/5"
                style={{
                  border: '1px solid #dadce0',
                  color: '#444746',
                  fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                  fontSize: '14px',
                }}
              >
                <Forward size={16} />
                Forward
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                style={{ border: '1px solid #dadce0' }}
              >
                <Smile size={16} style={{ color: '#444746' }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <button
    title={title}
    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/8 transition-colors"
    style={{ color: '#444746' }}
  >
    {icon}
  </button>
);

const EmptyState: React.FC<{ onGenerate: () => void }> = ({ onGenerate }) => (
  <div className="flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
      style={{ backgroundColor: '#e8f0fe' }}
    >
      <Mail size={36} style={{ color: '#1a73e8' }} />
    </div>
    <p
      className="mb-2"
      style={{ fontSize: '22px', color: '#202124', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontWeight: 400 }}
    >
      No email loaded
    </p>
    <p
      className="mb-8"
      style={{ fontSize: '14px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
    >
      Click the button below to load a sample HDFC Bank email
    </p>
    <button
      onClick={onGenerate}
      className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all hover:shadow-lg active:scale-95"
      style={{
        backgroundColor: '#1a73e8',
        fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
        fontSize: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }}
    >
      <Mail size={18} />
      Generate Email
    </button>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
    <div
      className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mb-4"
      style={{ borderColor: '#e0e0e0', borderTopColor: '#1a73e8' }}
    />
    <p style={{ fontSize: '14px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>
      Loading email...
    </p>
  </div>
);

export default EmailView;
