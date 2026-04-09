import { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Link, Palette, Tag, Server } from 'lucide-react';
import { TemplateSchema } from './types';

interface TemplateMetaCardProps {
  schema: TemplateSchema;
  onUpdate: (updated: Partial<TemplateSchema>) => void;
}

const BRANDING_OPTIONS = ['RETAIL', 'COMMERCIAL', 'WEALTH', 'MORTGAGE', 'AUTO'];
const LANGUAGE_OPTIONS = ['ENG', 'SPA', 'FRA', 'POR'];

export default function TemplateMetaCard({ schema, onUpdate }: TemplateMetaCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="mx-3 mb-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <Server size={11} className="text-slate-500 dark:text-slate-400" />
          </div>
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 tracking-wide uppercase">Template Settings</span>
        </div>
        <div className="text-slate-400 dark:text-slate-500">
          {collapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </div>
      </button>

      {!collapsed && (
        <div className="px-4 pb-3 space-y-3 border-t border-slate-100 dark:border-slate-700/40 pt-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Tag size={10} className="text-slate-400 dark:text-slate-500" />
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Branding</label>
              </div>
              <select
                value={schema.branding}
                onChange={e => onUpdate({ branding: e.target.value })}
                className="w-full text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
              >
                {BRANDING_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Globe size={10} className="text-slate-400 dark:text-slate-500" />
                <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Language</label>
              </div>
              <select
                value={schema.language}
                onChange={e => onUpdate({ language: e.target.value })}
                className="w-full text-[11px] font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all"
              >
                {LANGUAGE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Server size={10} className="text-slate-400 dark:text-slate-500" />
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Assets Path</label>
            </div>
            <input
              type="text"
              value={schema.angAssetsPath}
              onChange={e => onUpdate({ angAssetsPath: e.target.value })}
              className="w-full text-[11px] text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all font-mono"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Link size={10} className="text-slate-400 dark:text-slate-500" />
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Tracking URL</label>
            </div>
            <input
              type="text"
              value={schema.customerTrackingUrl}
              onChange={e => onUpdate({ customerTrackingUrl: e.target.value })}
              className="w-full text-[11px] text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 transition-all font-mono"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Palette size={10} className="text-slate-400 dark:text-slate-500" />
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Header BG Color</label>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-blue-400/30 focus-within:border-blue-400 transition-all">
              <input
                type="color"
                value={schema.headerBGColor}
                onChange={e => onUpdate({ headerBGColor: e.target.value })}
                className="w-5 h-5 rounded cursor-pointer border-0 outline-none bg-transparent"
              />
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-600" />
              <input
                type="text"
                value={schema.headerBGColor}
                onChange={e => onUpdate({ headerBGColor: e.target.value })}
                className="flex-1 text-[11px] text-slate-700 dark:text-slate-200 bg-transparent outline-none font-mono uppercase tracking-wider"
                maxLength={7}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
