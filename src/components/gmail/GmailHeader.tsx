import React from 'react';
import { Search, HelpCircle, Settings, Grid3x3 as Grid3X3 } from 'lucide-react';

const GmailLogo: React.FC = () => (
  <svg width="109" height="40" viewBox="0 0 109 40" xmlns="http://www.w3.org/2000/svg">
    {/* Gmail 'M' envelope icon */}
    <g transform="translate(0, 4)">
      <path d="M2 6C2 4.9 2.9 4 4 4h34c1.1 0 2 .9 2 2v24c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z" fill="#fff" stroke="#dadce0" strokeWidth="1"/>
      <path d="M2 6l19 13L40 6" fill="none" stroke="#dadce0" strokeWidth="1"/>
      <path d="M4 4h34L21 18 4 4z" fill="#EA4335"/>
      <path d="M2 6l7 8v12L2 30V6z" fill="#C5221F"/>
      <path d="M40 6l-7 8v12l7-6V6z" fill="#C5221F"/>
      <path d="M9 14v12h24V14l-12 8-12-8z" fill="#FF4131"/>
      <path d="M9 14l12 8 12-8" fill="none"/>
    </g>
    {/* Gmail text */}
    <text x="52" y="28" fontFamily="Product Sans,Google Sans,Arial,sans-serif" fontSize="22" fontWeight="400" fill="#5f6368">
      Gmail
    </text>
  </svg>
);

const GmailHeader: React.FC = () => {
  return (
    <header
      className="flex items-center h-16 px-2 gap-2 flex-shrink-0"
      style={{ backgroundColor: '#f6f8fc', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', zIndex: 10 }}
    >
      {/* Hamburger */}
      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors flex-shrink-0">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect y="0" width="18" height="2" rx="1" fill="#5f6368"/>
          <rect y="5" width="18" height="2" rx="1" fill="#5f6368"/>
          <rect y="10" width="18" height="2" rx="1" fill="#5f6368"/>
        </svg>
      </button>

      {/* Logo */}
      <div className="flex-shrink-0 ml-1" style={{ width: '109px' }}>
        <GmailLogo />
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4 max-w-2xl">
        <div
          className="flex items-center gap-3 px-4 h-12 rounded-full transition-colors cursor-text"
          style={{ backgroundColor: '#eaf1fb' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#dce3f1')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#eaf1fb')}
        >
          <Search size={20} style={{ color: '#444746', flexShrink: 0 }} />
          <span
            style={{ fontSize: '16px', color: '#444746', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', flex: 1 }}
          >
            Search mail
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M6 12h12M10 18h4" stroke="#444746" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-1 ml-auto flex-shrink-0">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <HelpCircle size={22} style={{ color: '#444746' }} />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Settings size={22} style={{ color: '#444746' }} />
        </button>
        {/* Gemini / sparkle icon */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 13.5 7 17 8.5C13.5 10 12 15 12 15C12 15 10.5 10 7 8.5C10.5 7 12 2 12 2Z" fill="#444746"/>
            <path d="M12 15C12 15 13 18 15 19C13 20 12 23 12 23C12 23 11 20 9 19C11 18 12 15 12 15Z" fill="#444746"/>
          </svg>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
          <Grid3X3 size={22} style={{ color: '#444746' }} />
        </button>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center ml-2 text-white font-medium"
          style={{ backgroundColor: '#6c5ce7', fontSize: '15px', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
        >
          K
        </button>
      </div>
    </header>
  );
};

export default GmailHeader;
