import React from 'react';
import {
  Inbox,
  Star,
  Clock,
  Send,
  FileText,
  AlertOctagon,
  ShoppingBag,
  Plane,
  Users,
  Bell,
  MessageSquare,
  Tag,
  ChevronDown,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, count, active }) => (
  <button
    className={`flex items-center w-full gap-4 px-4 py-1.5 rounded-r-full text-sm transition-colors group ${
      active ? 'font-semibold' : 'hover:bg-black/5'
    }`}
    style={{
      backgroundColor: active ? '#d3e3fd' : undefined,
      color: active ? '#041e49' : '#202124',
      fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
      fontSize: '14px',
    }}
  >
    <span style={{ color: active ? '#041e49' : '#444746', flexShrink: 0 }}>{icon}</span>
    <span className="flex-1 text-left truncate">{label}</span>
    {count !== undefined && (
      <span
        style={{
          fontSize: '12px',
          color: active ? '#041e49' : '#444746',
          fontWeight: active ? 700 : 400,
          fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
        }}
      >
        {count.toLocaleString()}
      </span>
    )}
  </button>
);

const SectionLabel: React.FC<{ label: string }> = ({ label }) => (
  <div
    className="flex items-center justify-between px-4 mt-3 mb-1"
    style={{ color: '#444746', fontSize: '13px', fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
  >
    <span className="font-medium">{label}</span>
    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors">
      <Plus size={16} />
    </button>
  </div>
);

const GmailSidebar: React.FC = () => {
  return (
    <aside
      className="flex flex-col h-full py-2 overflow-y-auto"
      style={{ width: '256px', flexShrink: 0, fontFamily: 'Google Sans,Roboto,Arial,sans-serif' }}
    >
      {/* Compose */}
      <div className="px-3 pb-2">
        <button
          className="flex items-center gap-3 pl-4 pr-6 h-14 rounded-2xl shadow-md text-sm font-medium transition-shadow hover:shadow-lg active:shadow-sm"
          style={{
            backgroundColor: '#c2e7ff',
            color: '#041e49',
            fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            minWidth: '120px',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#041e49"/>
          </svg>
          Compose
        </button>
      </div>

      {/* Nav items */}
      <div className="flex flex-col gap-0.5 mt-1">
        <NavItem icon={<Inbox size={20} />} label="Inbox" count={519} active />
        <NavItem icon={<Star size={20} />} label="Starred" />
        <NavItem icon={<Clock size={20} />} label="Snoozed" />
        <NavItem icon={<Send size={20} />} label="Sent" />
        <NavItem icon={<FileText size={20} />} label="Drafts" count={3} />
        <button
          className="flex items-center gap-4 w-full px-4 py-1.5 rounded-r-full text-sm hover:bg-black/5 transition-colors"
          style={{ color: '#444746', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '14px' }}
        >
          <ChevronDown size={20} />
          <span>More</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-2 mx-4" style={{ borderTop: '1px solid #e0e0e0' }} />

      {/* Categories */}
      <div className="flex flex-col gap-0.5">
        <NavItem icon={<AlertOctagon size={20} />} label="Spam" />
        <NavItem icon={<ShoppingBag size={20} />} label="Purchases" />
        <NavItem icon={<Plane size={20} />} label="Travel" />
        <NavItem icon={<Users size={20} />} label="Social" />
        <NavItem icon={<Bell size={20} />} label="Updates" />
        <NavItem icon={<MessageSquare size={20} />} label="Forums" />
        <NavItem icon={<Tag size={20} />} label="Promotions" count={1167} />
      </div>

      {/* Labels */}
      <SectionLabel label="Labels" />
      <div className="flex flex-col gap-0.5">
        <button
          className="flex items-center gap-4 w-full px-4 py-1.5 rounded-r-full text-sm hover:bg-black/5 transition-colors"
          style={{ color: '#202124', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '14px' }}
        >
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#16a765', flexShrink: 0 }} />
          <span>Personal</span>
        </button>
        <button
          className="flex items-center gap-4 w-full px-4 py-1.5 rounded-r-full text-sm hover:bg-black/5 transition-colors"
          style={{ color: '#202124', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '14px' }}
        >
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#4a86e8', flexShrink: 0 }} />
          <span>Travel</span>
        </button>
        <button
          className="flex items-center gap-4 w-full px-4 py-1.5 rounded-r-full text-sm hover:bg-black/5 transition-colors"
          style={{ color: '#444746', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '14px' }}
        >
          <ChevronDown size={20} />
          <span>More</span>
        </button>
      </div>

      {/* Upgrade */}
      <div className="mt-auto pt-4 px-4">
        <button
          className="flex items-center gap-2 text-sm hover:underline"
          style={{ color: '#444746', fontFamily: 'Google Sans,Roboto,Arial,sans-serif', fontSize: '13px' }}
        >
          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
            <ArrowRight size={12} />
          </span>
          Upgrade
          <ArrowRight size={14} className="ml-auto" />
        </button>
      </div>
    </aside>
  );
};

export default GmailSidebar;
