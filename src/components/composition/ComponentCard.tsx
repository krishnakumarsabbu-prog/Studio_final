import { useState, useRef, useEffect } from 'react';
import {
  GripVertical, Image as ImageIcon, ChevronDown, ChevronUp,
  CreditCard as Edit3, Copy, Trash2, ArrowUp, ArrowDown,
  CheckCircle, AlertTriangle, XCircle, Heading1, Heading2,
  AlignJustify, Scale, Type, ToggleLeft, ToggleRight, Zap
} from 'lucide-react';
import { AlertComponent, InspectorTab, AlertTextType, getComponentLabel, getValidationState } from './types';

interface ComponentCardProps {
  component: AlertComponent;
  index: number;
  globalIndex: number;
  isSelected: boolean;
  isHighlighted: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onUpdate: (updated: AlertComponent) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onHighlightInEditor: (text: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

function getTypeIcon(comp: AlertComponent) {
  if (comp.type === 'Image') return ImageIcon;
  if (comp.subType === 'Pageheader') return Heading1;
  if (comp.subType === 'Subheader') return Heading2;
  if (comp.subType === 'Body') return AlignJustify;
  if (comp.subType === 'Footnote') return Scale;
  return Type;
}

function getSubTypeBadgeColor(subType: string): string {
  switch (subType) {
    case 'Pageheader': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    case 'Subheader': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300';
    case 'Body': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    case 'Footnote': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    case 'logos': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    case 'icons': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300';
    default: return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
  }
}

function ValidationBadge({ comp }: { comp: AlertComponent }) {
  const v = getValidationState(comp);
  if (v.status === 'valid') return (
    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
      <CheckCircle size={10} /> Valid
    </span>
  );
  if (v.status === 'warning') return (
    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
      <AlertTriangle size={10} /> Warning
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
      <XCircle size={10} /> Issue
    </span>
  );
}

function TypeToggle({ comp, onUpdate }: { comp: AlertComponent; onUpdate: (c: AlertComponent) => void }) {
  if (comp.type === 'Image') return null;
  const isPlain = comp.type === 'Alerts Plain Text';

  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
      <div className="flex-1">
        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Alert Type</p>
        <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">
          {isPlain ? 'Alerts Plain Text — no HTML formatting' : 'Alerts Text — supports HTML markup'}
        </p>
      </div>
      <button
        onClick={() => {
          const newType: AlertTextType = isPlain ? 'Alerts Text' : 'Alerts Plain Text';
          onUpdate({ ...comp, type: newType });
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
          isPlain
            ? 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
        }`}
      >
        {isPlain ? <ToggleLeft size={12} /> : <ToggleRight size={12} />}
        {isPlain ? 'Plain' : 'HTML'}
      </button>
    </div>
  );
}

function ContentPreview({ comp }: { comp: AlertComponent }) {
  const text = comp.textList[0] || '';
  const extra = comp.textList.length - 1;

  if (comp.type === 'Image') {
    return (
      <div className="flex items-center gap-2 mt-1.5">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-600">
          <ImageIcon size={16} className="text-slate-400 dark:text-slate-500" />
        </div>
        <div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{text}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide">{comp.subType}</span>
        </div>
      </div>
    );
  }

  if (comp.subType === 'Pageheader') {
    return (
      <div className="mt-1.5">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">{text}</p>
        {extra > 0 && <span className="text-[10px] text-slate-400 dark:text-slate-500">+{extra} more</span>}
      </div>
    );
  }

  if (comp.subType === 'Subheader') {
    return (
      <div className="mt-1.5">
        <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-snug line-clamp-1">{text}</p>
        {extra > 0 && <span className="text-[10px] text-slate-400 dark:text-slate-500">+{extra} more</span>}
      </div>
    );
  }

  if (comp.subType === 'Footnote') {
    return (
      <div className="mt-1.5">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2 italic">{text}</p>
        {extra > 0 && <span className="text-[10px] text-slate-400 dark:text-slate-500">+{extra} more</span>}
      </div>
    );
  }

  return (
    <div className="mt-1.5">
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{text}</p>
      {extra > 0 && <span className="text-[10px] text-slate-400 dark:text-slate-500">+{extra} more</span>}
    </div>
  );
}

function InspectorPanel({ comp, onUpdate }: { comp: AlertComponent; onUpdate: (c: AlertComponent) => void }) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('content');
  const validation = getValidationState(comp);

  const tabs: { key: InspectorTab; label: string }[] = [
    { key: 'content', label: 'Content' },
    { key: 'style', label: 'Style' },
    { key: 'metadata', label: 'Meta' },
    { key: 'validation', label: 'Validate' },
  ];

  return (
    <div className="mt-2 border-t border-slate-100 dark:border-slate-700/60 pt-2">
      <div className="flex gap-0.5 mb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 text-[10px] font-semibold py-1 rounded-md transition-all ${
              activeTab === t.key
                ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'content' && (
        <div className="space-y-2">
          <TypeToggle comp={comp} onUpdate={onUpdate} />
          {comp.textList.map((text, i) => (
            <div key={i} className="flex gap-1.5">
              <textarea
                value={text}
                onChange={e => {
                  const newList = [...comp.textList];
                  newList[i] = e.target.value;
                  onUpdate({ ...comp, textList: newList });
                }}
                className="flex-1 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-2 resize-none outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all leading-relaxed"
                rows={2}
              />
              {comp.textList.length > 1 && (
                <button
                  onClick={() => {
                    const newList = comp.textList.filter((_, idx) => idx !== i);
                    onUpdate({ ...comp, textList: newList });
                  }}
                  className="self-start p-1 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded transition-colors"
                >
                  <XCircle size={12} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => onUpdate({ ...comp, textList: [...comp.textList, ''] })}
            className="w-full text-[10px] text-blue-600 dark:text-blue-400 hover:text-blue-700 border border-dashed border-blue-300 dark:border-blue-700 rounded-lg py-1.5 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors font-medium"
          >
            + Add row
          </button>
        </div>
      )}

      {activeTab === 'style' && (
        <div className="space-y-2">
          {(['emphasis', 'alignment', 'spacing', 'display'] as const).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize font-medium">{key}</span>
              <select className="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-400 transition-all">
                {key === 'emphasis' && ['Normal', 'Bold', 'Italic'].map(o => <option key={o}>{o}</option>)}
                {key === 'alignment' && ['Left', 'Center', 'Right'].map(o => <option key={o}>{o}</option>)}
                {key === 'spacing' && ['Compact', 'Normal', 'Relaxed'].map(o => <option key={o}>{o}</option>)}
                {key === 'display' && ['Inline', 'Block', 'Hidden'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'metadata' && (
        <div className="space-y-1.5">
          {[
            { label: 'Widget', value: comp.widget },
            { label: 'Type', value: comp.type },
            { label: 'SubType', value: comp.subType },
            { label: 'Render Role', value: getComponentLabel(comp) },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-1 border-b border-slate-50 dark:border-slate-700/40 last:border-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{row.label}</span>
              <span className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'validation' && (
        <div className="space-y-2">
          <div className={`flex items-start gap-2 p-2 rounded-lg text-[10px] font-medium ${
            validation.status === 'valid' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' :
            validation.status === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' :
            'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
          }`}>
            {validation.status === 'valid' && <CheckCircle size={12} className="mt-0.5 flex-shrink-0" />}
            {validation.status === 'warning' && <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />}
            {validation.status === 'error' && <XCircle size={12} className="mt-0.5 flex-shrink-0" />}
            <span>{validation.message || 'Component looks good'}</span>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
            {comp.textList.join(' ').length} chars · {comp.textList.length} rows
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComponentCard({
  component, index, globalIndex, isSelected, isHighlighted, isDragging,
  onSelect, onUpdate, onDuplicate, onDelete, onMoveUp, onMoveDown,
  onDragStart, onDragOver, onDrop, onHighlightInEditor, canMoveUp, canMoveDown,
}: ComponentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = getTypeIcon(component);
  const label = getComponentLabel(component);

  useEffect(() => {
    if ((isHighlighted || isSelected) && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isHighlighted, isSelected]);

  const handleLocateInEditor = (e: React.MouseEvent) => {
    e.stopPropagation();
    const firstText = component.textList[0];
    if (firstText) onHighlightInEditor(firstText);
  };

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={e => onDragStart(e, globalIndex)}
      onDragOver={e => onDragOver(e, globalIndex)}
      onDrop={e => onDrop(e, globalIndex)}
      className={`group relative rounded-xl border transition-all duration-200 cursor-pointer select-none ${
        isDragging ? 'opacity-40 scale-95' : ''
      } ${
        isHighlighted && !isSelected
          ? 'border-amber-400 dark:border-amber-500 bg-amber-50/40 dark:bg-amber-900/10 shadow-md shadow-amber-100 dark:shadow-amber-900/20 ring-2 ring-amber-300/50 dark:ring-amber-700/40'
          : isSelected
          ? 'border-blue-400 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-900/10 shadow-md shadow-blue-100 dark:shadow-blue-900/20'
          : 'border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:shadow-slate-100 dark:hover:shadow-slate-900/20'
      }`}
      onClick={onSelect}
    >
      {isHighlighted && !isSelected && (
        <div className="absolute -top-px left-0 right-0 h-0.5 bg-amber-400 dark:bg-amber-500 rounded-t-xl" />
      )}

      <div className="p-3">
        <div className="flex items-start gap-2">
          <div
            className="mt-0.5 cursor-grab active:cursor-grabbing text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <GripVertical size={14} />
          </div>

          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
            component.type === 'Image'
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
              : component.subType === 'Pageheader'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : component.subType === 'Subheader'
              ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
              : component.subType === 'Footnote'
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            <Icon size={13} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate">{label}</span>
              <ValidationBadge comp={component} />
            </div>
            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">{component.widget}</span>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${getSubTypeBadgeColor(component.subType)}`}>{component.subType}</span>
              {component.type === 'Alerts Plain Text' && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900">Plain</span>
              )}
            </div>
            <ContentPreview comp={component} />
          </div>

          <button
            onClick={e => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
            className="mt-0.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {(isSelected || isExpanded) && (
          <InspectorPanel comp={component} onUpdate={onUpdate} />
        )}

        <div className={`flex items-center gap-0.5 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/40 transition-all ${
          isSelected || isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors font-medium"
          >
            <Edit3 size={10} /> Edit
          </button>
          <button
            onClick={handleLocateInEditor}
            title="Highlight in editor"
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-md transition-colors font-medium"
          >
            <Zap size={10} /> Locate
          </button>
          <button
            onClick={onDuplicate}
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors font-medium"
          >
            <Copy size={10} /> Dupe
          </button>
          <button
            disabled={!canMoveUp}
            onClick={onMoveUp}
            className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowUp size={10} />
          </button>
          <button
            disabled={!canMoveDown}
            onClick={onMoveDown}
            className="p-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowDown size={10} />
          </button>
          <div className="flex-1" />
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-2 py-1 text-[10px] text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors font-medium"
          >
            <Trash2 size={10} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
