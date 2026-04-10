import React from 'react';
import { Search, HelpCircle, Settings, Grid3x3 as Grid3X3 } from 'lucide-react';

const GmailHeader: React.FC = () => {
  return (
    <header
      className="flex items-center h-16 px-4 gap-4"
      style={{ backgroundColor: '#f6f8fc', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
    >
      {/* Hamburger + Logo */}
      <div className="flex items-center gap-2 min-w-[200px]">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <div className="flex flex-col gap-1.5">
            <span className="block w-4.5 h-0.5 bg-gray-600" style={{ width: '18px', height: '2px', backgroundColor: '#5f6368' }} />
            <span className="block w-4.5 h-0.5 bg-gray-600" style={{ width: '18px', height: '2px', backgroundColor: '#5f6368' }} />
            <span className="block w-4.5 h-0.5 bg-gray-600" style={{ width: '18px', height: '2px', backgroundColor: '#5f6368' }} />
          </div>
        </button>
        <div className="flex items-center gap-0.5 ml-1">
          <GmailLogo />
          <span style={{ fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '22px', color: '#5f6368', fontWeight: 400, marginLeft: '4px' }}>
            Gmail
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div
          className="flex items-center gap-3 px-4 h-12 rounded-full transition-all"
          style={{ backgroundColor: '#eaf1fb', cursor: 'text' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dce3f1')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#eaf1fb')}
        >
          <Search size={20} style={{ color: '#5f6368', flexShrink: 0 }} />
          <span style={{ fontSize: '16px', color: '#5f6368', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}>
            Search mail
          </span>
          <div className="ml-auto">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M6 12h12M10 18h4" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <HelpCircle size={20} style={{ color: '#5f6368' }} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Settings size={20} style={{ color: '#5f6368' }} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Grid3X3 size={20} style={{ color: '#5f6368' }} />
        </button>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center ml-1 text-white text-sm font-medium"
          style={{ backgroundColor: '#6c5ce7', fontSize: '15px', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
        >
          K
        </button>
      </div>
    </header>
  );
};

const GmailLogo: React.FC = () => (
  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5.5L20 18L37 5.5" stroke="#EA4335" strokeWidth="0.5" fill="none" />
    <rect x="1" y="4" width="38" height="22" rx="2" stroke="none" fill="none" />
    <path d="M1 6.5L20 19.5L39 6.5V26H1V6.5Z" fill="#fff" />
    <path d="M1 6.5L20 19.5L39 6.5" stroke="none" fill="none" />
    <path fillRule="evenodd" clipRule="evenodd"
      d="M5 4H35C36.1 4 37 4.9 37 6V24C37 25.1 36.1 26 35 26H5C3.9 26 3 25.1 3 24V6C3 4.9 3.9 4 5 4Z"
      fill="white" />
    <path d="M5 4L20 16.5L35 4" fill="none" stroke="none" />
    <g>
      <path d="M3 5L3 25C3 25.55 3.45 26 4 26H8V10.5L20 19.5L32 10.5V26H36C36.55 26 37 25.55 37 25V5L20 17L3 5Z"
        fill="none" />
      <path d="M3.5 5.5L20 17.5L36.5 5.5V24.5C36.5 24.78 36.28 25 36 25H32.5V11L20 19.5L7.5 11V25H4C3.72 25 3.5 24.78 3.5 24.5V5.5Z"
        fill="none" />
    </g>
    {/* M letter */}
    <path d="M3 5.5C3 4.67 3.67 4 4.5 4H35.5C36.33 4 37 4.67 37 5.5V7.5L20 19L3 7.5V5.5Z" fill="#EA4335" />
    <path d="M3 7.5V24.5C3 25.33 3.67 26 4.5 26H8.5V13L3 7.5Z" fill="#C5221F" />
    <path d="M37 7.5V24.5C37 25.33 36.33 26 35.5 26H31.5V13L37 7.5Z" fill="#C5221F" />
    <path d="M8.5 26V13L20 21.5L31.5 13V26H8.5Z" fill="#FF4131" />
    <path d="M3 7.5L8.5 13L20 21.5L31.5 13L37 7.5L20 19L3 7.5Z" fill="#FF4131" />
  </svg>
);

export default GmailHeader;
