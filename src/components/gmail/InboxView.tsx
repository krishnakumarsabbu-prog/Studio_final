import React, { useState } from 'react';
import { CheckSquare, RefreshCw, MoreVertical, Star, ArrowRight, Paperclip, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmailMeta } from '../../data/inboxEmails';

interface InboxViewProps {
  emails: EmailMeta[];
  onEmailClick: (email: EmailMeta) => void;
}

const tabs = [
  { id: 'primary', label: 'Primary', color: '#1a73e8' },
  { id: 'promotions', label: 'Promotions', badge: '19 new', color: '#188038' },
  { id: 'social', label: 'Social', color: '#5f6368' },
];

const InboxView: React.FC<InboxViewProps> = ({ emails, onEmailClick }) => {
  const [activeTab, setActiveTab] = useState('primary');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [starredIds, setStarredIds] = useState<Set<string>>(
    new Set(emails.filter(e => e.isStarred).map(e => e.id))
  );

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStarredIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white" style={{ borderRadius: '16px', overflow: 'hidden', margin: '8px 16px 8px 0' }}>
      {/* Top Toolbar */}
      <div
        className="flex items-center px-4 h-12 gap-2 flex-shrink-0"
        style={{ borderBottom: '1px solid #e0e0e0' }}
      >
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-0.5 h-8 px-1 rounded hover:bg-black/5 transition-colors">
            <CheckSquare size={18} style={{ color: '#5f6368' }} />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6368"><path d="M7 10l5 5 5-5H7z"/></svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <RefreshCw size={16} style={{ color: '#5f6368' }} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <MoreVertical size={16} style={{ color: '#5f6368' }} />
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span style={{ fontSize: '13px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>
            1–50 of 520
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <ChevronLeft size={16} style={{ color: '#5f6368' }} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
            <ChevronRight size={16} style={{ color: '#5f6368' }} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-shrink-0" style={{ borderBottom: '1px solid #e0e0e0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-5 h-12 text-sm relative transition-colors"
            style={{
              fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? tab.color : '#5f6368',
              borderBottom: activeTab === tab.id ? `3px solid ${tab.color}` : '3px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab.label}
            {tab.badge && (
              <span
                className="px-1.5 py-0.5 rounded text-xs font-medium"
                style={{ backgroundColor: '#188038', color: '#fff', fontSize: '11px' }}
              >
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {emails.map((email) => {
          const isHovered = hoveredId === email.id;
          const isStarred = starredIds.has(email.id);

          return (
            <div
              key={email.id}
              onClick={() => onEmailClick(email)}
              onMouseEnter={() => setHoveredId(email.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex items-center px-4 cursor-pointer transition-colors relative group"
              style={{
                height: '50px',
                backgroundColor: isHovered ? '#f2f6fc' : !email.isRead ? '#fff' : '#f2f6fc',
                borderBottom: '1px solid #f1f3f4',
                fontWeight: email.isRead ? 400 : 700,
              }}
            >
              {/* Checkbox (show on hover) */}
              <div className="flex items-center gap-1 mr-2 flex-shrink-0" style={{ width: '40px' }}>
                {isHovered ? (
                  <button
                    onClick={e => e.stopPropagation()}
                    className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: '#5f6368' }}
                  />
                ) : (
                  <div className="w-5 h-5" />
                )}
                <button
                  onClick={e => toggleStar(e, email.id)}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <Star
                    size={16}
                    fill={isStarred ? '#f4b400' : 'none'}
                    style={{ color: isStarred ? '#f4b400' : '#5f6368' }}
                  />
                </button>
              </div>

              {/* Forward/Category icon */}
              <div className="mr-3 flex-shrink-0">
                <ArrowRight size={14} style={{ color: '#5f6368' }} />
              </div>

              {/* Sender */}
              <div
                className="flex-shrink-0 truncate"
                style={{
                  width: '180px',
                  fontSize: '14px',
                  color: '#202124',
                  fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                  fontWeight: email.isRead ? 400 : 700,
                }}
              >
                {email.sender}
              </div>

              {/* Subject + Preview */}
              <div className="flex-1 flex items-center gap-1 overflow-hidden mx-4">
                <span
                  className="truncate"
                  style={{
                    fontSize: '14px',
                    color: '#202124',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    fontWeight: email.isRead ? 400 : 700,
                    flexShrink: 0,
                    maxWidth: '50%',
                  }}
                >
                  {email.subject}
                </span>
                <span
                  className="truncate"
                  style={{
                    fontSize: '14px',
                    color: '#5f6368',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    fontWeight: 400,
                  }}
                >
                  &nbsp;-&nbsp;{email.preview}
                </span>
              </div>

              {/* Right side: attachment + time */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {email.hasAttachment && (
                  <Paperclip size={14} style={{ color: '#5f6368' }} />
                )}
                <span
                  style={{
                    fontSize: '12px',
                    color: '#5f6368',
                    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
                    whiteSpace: 'nowrap',
                    minWidth: '56px',
                    textAlign: 'right',
                    fontWeight: email.isRead ? 400 : 700,
                  }}
                >
                  {email.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InboxView;
