import { useState } from 'react';
import { X, Heading1, Heading2, AlignJustify, Scale, Image, Star, FileText, Building2 } from 'lucide-react';
import { AlertComponent, SectionType } from './types';

interface Preset {
  icon: React.ElementType;
  label: string;
  description: string;
  widget: SectionType;
  type: AlertComponent['type'];
  subType: AlertComponent['subType'];
  defaultText: string;
  accentClass: string;
}

const PRESETS: Preset[] = [
  {
    icon: Heading1,
    label: 'Header Title',
    description: 'Main page header with primary message',
    widget: 'Header',
    type: 'Alerts Text',
    subType: 'Pageheader',
    defaultText: 'Enter your primary heading here',
    accentClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400',
  },
  {
    icon: AlignJustify,
    label: 'Intro Copy',
    description: 'Short introductory body text',
    widget: 'Header',
    type: 'Alerts Text',
    subType: 'Body',
    defaultText: 'Enter introductory copy here',
    accentClass: 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600/50 text-slate-500 dark:text-slate-400',
  },
  {
    icon: Image,
    label: 'Brand Logos',
    description: 'Logo image block with alt text',
    widget: 'Header',
    type: 'Image',
    subType: 'logos',
    defaultText: 'Brand logo alt text',
    accentClass: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Star,
    label: 'Main Offer',
    description: 'Primary offer or call-to-action headline',
    widget: 'Body',
    type: 'Alerts Text',
    subType: 'Pageheader',
    defaultText: 'Your special offer headline here',
    accentClass: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 text-blue-600 dark:text-blue-400',
  },
  {
    icon: FileText,
    label: 'Supporting Text',
    description: 'Body copy with supporting information',
    widget: 'Body',
    type: 'Alerts Text',
    subType: 'Body',
    defaultText: 'Enter supporting copy here',
    accentClass: 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600/50 text-slate-500 dark:text-slate-400',
  },
  {
    icon: Building2,
    label: 'Dealer Info',
    description: 'Section heading for dealer details',
    widget: 'Body',
    type: 'Alerts Text',
    subType: 'Subheader',
    defaultText: 'Dealer Name',
    accentClass: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-700/50 text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: Image,
    label: 'Footer Icon',
    description: 'Small icon image in footer',
    widget: 'Footer',
    type: 'Image',
    subType: 'icons',
    defaultText: 'Icon description',
    accentClass: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700/50 text-rose-500 dark:text-rose-400',
  },
  {
    icon: Scale,
    label: 'Legal Footnote',
    description: 'Legal disclaimer or footnote text',
    widget: 'Footer',
    type: 'Alerts Text',
    subType: 'Footnote',
    defaultText: 'Enter legal disclaimer here.',
    accentClass: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50 text-amber-600 dark:text-amber-400',
  },
];

interface AddComponentModalProps {
  onAdd: (comp: AlertComponent) => void;
  onClose: () => void;
}

export default function AddComponentModal({ onAdd, onClose }: AddComponentModalProps) {
  const [selected, setSelected] = useState<Preset | null>(null);

  const handleAdd = () => {
    if (!selected) return;
    onAdd({
      widget: selected.widget,
      type: selected.type,
      subType: selected.subType,
      textList: [selected.defaultText],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 w-full max-w-lg border border-slate-200 dark:border-slate-700/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Add Component</h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Choose a preset to insert into your template</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 grid grid-cols-2 gap-2 max-h-[420px] overflow-y-auto">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isChosen = selected?.label === preset.label;
            return (
              <button
                key={preset.label}
                onClick={() => setSelected(preset)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                  isChosen
                    ? 'border-blue-400 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${preset.accentClass}`}>
                  <Icon size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 leading-tight">{preset.label}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 leading-tight">{preset.description}</p>
                  <span className="inline-block text-[9px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 rounded-full px-1.5 py-0.5 mt-1">{preset.widget}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selected}
            className="px-4 py-1.5 text-[11px] font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-700 dark:hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            Insert Component
          </button>
        </div>
      </div>
    </div>
  );
}
