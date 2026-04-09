import { useState, useEffect } from 'react';
import {
  Variable as VariableIcon, GitBranch, Repeat, Link2, Square, Wand2,
  ChevronRight, X, MousePointer2, CheckCircle
} from 'lucide-react';
import { useEditorSync } from '../../contexts/EditorSyncContext';
import WrapInConditionModal from '../WrapInConditionModal';
import { ConditionDefinition } from '../../types/template';

type ActionMode = 'idle' | 'variable' | 'loop' | 'link' | 'cta' | 'condition';

export default function SelectionActionsPanel() {
  const {
    selectionState,
    variables,
    conditions,
    onMakeVariable,
    onWrapCondition,
    onCreateAndWrapCondition,
    onInsertLink,
    onInsertCTA,
  } = useEditorSync();

  const [mode, setMode] = useState<ActionMode>('idle');
  const [variableName, setVariableName] = useState('');
  const [loopVar, setLoopVar] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaUrl, setCtaUrl] = useState('');
  const [showConditionModal, setShowConditionModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { selection, selectedText } = selectionState;
  const hasSelection = !!selectedText;

  useEffect(() => {
    if (!hasSelection) {
      setMode('idle');
      setSuccessMessage('');
    } else {
      setLinkText(selectedText);
      setCtaText(selectedText);
    }
  }, [selectedText, hasSelection]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setMode('idle');
    setTimeout(() => setSuccessMessage(''), 2500);
  };

  const handleMakeVariable = () => {
    if (!variableName.trim()) return;
    onMakeVariable(variableName.trim());
    setVariableName('');
    showSuccess(`Variable "{{${variableName.trim()}}}" created`);
  };

  const handleWrapLoop = () => {
    if (!loopVar.trim()) return;
    onInsertLink(loopVar.trim(), loopVar.trim());
    setLoopVar('');
    showSuccess('Loop applied');
  };

  const handleInsertLink = () => {
    if (!linkUrl.trim()) return;
    onInsertLink(linkUrl.trim(), linkText.trim() || linkUrl.trim());
    setLinkUrl('');
    setLinkText('');
    showSuccess('Hyperlink inserted');
  };

  const handleInsertCTA = () => {
    if (!ctaText.trim() || !ctaUrl.trim()) return;
    onInsertCTA(ctaText.trim(), ctaUrl.trim());
    setCtaText('');
    setCtaUrl('');
    showSuccess('CTA Button inserted');
  };

  const inputCls = 'w-full text-[11px] bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400';

  if (!hasSelection) {
    return (
      <div className="mx-3 mb-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
        <div className="px-4 py-3 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <MousePointer2 size={12} className="text-slate-400 dark:text-slate-500" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Text Actions</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Select text in the editor to see actions</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showConditionModal && (
        <WrapInConditionModal
          selectedContent={selectedText}
          variables={variables}
          conditions={conditions}
          onWrapCondition={(name) => {
            onWrapCondition(name);
            setShowConditionModal(false);
            showSuccess(`Condition "${name}" applied`);
          }}
          onCreateAndWrapCondition={(cond: ConditionDefinition) => {
            onCreateAndWrapCondition(cond);
            setShowConditionModal(false);
            showSuccess(`Condition "${cond.name}" created`);
          }}
          onClose={() => setShowConditionModal(false)}
        />
      )}

      <div className="mx-3 mb-3 rounded-xl border border-blue-300/60 dark:border-blue-700/50 bg-white dark:bg-slate-800/60 shadow-sm shadow-blue-100/40 dark:shadow-blue-900/10 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-blue-100 dark:border-blue-900/30 bg-blue-50/60 dark:bg-blue-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <MousePointer2 size={11} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Text Actions</span>
            </div>
            {mode !== 'idle' && (
              <button
                onClick={() => setMode('idle')}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
          <div className="mt-1.5 px-1 py-1 bg-blue-100/60 dark:bg-blue-900/20 rounded-lg">
            <p className="text-[10px] text-blue-700 dark:text-blue-300 font-medium leading-tight truncate">
              "{selectedText.length > 50 ? selectedText.slice(0, 50) + '…' : selectedText}"
            </p>
          </div>
        </div>

        {successMessage && (
          <div className="px-3 py-2 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-800/40">
            <CheckCircle size={12} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">{successMessage}</span>
          </div>
        )}

        <div className="p-2">
          {mode === 'idle' && (
            <div className="space-y-0.5">
              {[
                {
                  key: 'variable' as ActionMode,
                  icon: VariableIcon,
                  label: 'Make Variable',
                  desc: 'Convert to template variable',
                  color: 'text-blue-600',
                  hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
                },
                {
                  key: 'condition' as ActionMode,
                  icon: GitBranch,
                  label: 'Wrap in Condition',
                  desc: 'Add conditional logic',
                  color: 'text-emerald-600',
                  hoverBg: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
                },
                {
                  key: 'loop' as ActionMode,
                  icon: Repeat,
                  label: 'Wrap in Loop',
                  desc: 'Repeat over array data',
                  color: 'text-cyan-600',
                  hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
                },
                {
                  key: 'link' as ActionMode,
                  icon: Link2,
                  label: 'Insert Hyperlink',
                  desc: 'Add a clickable link',
                  color: 'text-rose-600',
                  hoverBg: 'hover:bg-rose-50 dark:hover:bg-rose-900/20',
                },
                {
                  key: 'cta' as ActionMode,
                  icon: Square,
                  label: 'Insert CTA Button',
                  desc: 'Add a call-to-action button',
                  color: 'text-amber-600',
                  hoverBg: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
                },
              ].map(item => {
                const Icon = item.icon;
                const isCondition = item.key === 'condition';
                return (
                  <button
                    key={item.key}
                    onClick={() => isCondition ? setShowConditionModal(true) : setMode(item.key)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors text-left group ${item.hoverBg}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">{item.label}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">{item.desc}</p>
                    </div>
                    <ChevronRight size={12} className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 flex-shrink-0 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}

          {mode === 'variable' && (
            <div className="space-y-2 p-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Variable name</label>
              <input
                type="text"
                placeholder="e.g. customerName"
                value={variableName}
                onChange={e => setVariableName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleMakeVariable()}
                className={inputCls}
                autoFocus
              />
              <div className="flex gap-1.5">
                <button
                  onClick={handleMakeVariable}
                  disabled={!variableName.trim()}
                  className="flex-1 text-[11px] font-bold py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Create Variable
                </button>
                <button onClick={() => setMode('idle')} className="px-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {mode === 'loop' && (
            <div className="space-y-2 p-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Array variable</label>
              <input
                type="text"
                placeholder="e.g. items"
                value={loopVar}
                onChange={e => setLoopVar(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleWrapLoop()}
                className={inputCls}
                autoFocus
              />
              <div className="flex gap-1.5">
                <button
                  onClick={handleWrapLoop}
                  disabled={!loopVar.trim()}
                  className="flex-1 text-[11px] font-bold py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Apply Loop
                </button>
                <button onClick={() => setMode('idle')} className="px-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {mode === 'link' && (
            <div className="space-y-2 p-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">URL</label>
              <input
                type="text"
                placeholder="https://wellsfargo.com"
                value={linkUrl}
                onChange={e => setLinkUrl(e.target.value)}
                className={inputCls}
                autoFocus
              />
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Link text</label>
              <input
                type="text"
                placeholder="Click here"
                value={linkText}
                onChange={e => setLinkText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInsertLink()}
                className={inputCls}
              />
              <div className="flex gap-1.5">
                <button
                  onClick={handleInsertLink}
                  disabled={!linkUrl.trim()}
                  className="flex-1 text-[11px] font-bold py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Insert Link
                </button>
                <button onClick={() => setMode('idle')} className="px-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {mode === 'cta' && (
            <div className="space-y-2 p-1">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Button text</label>
              <input
                type="text"
                placeholder="Get Started"
                value={ctaText}
                onChange={e => setCtaText(e.target.value)}
                className={inputCls}
                autoFocus
              />
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Button URL</label>
              <input
                type="text"
                placeholder="https://wellsfargo.com"
                value={ctaUrl}
                onChange={e => setCtaUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInsertCTA()}
                className={inputCls}
              />
              <div className="flex gap-1.5">
                <button
                  onClick={handleInsertCTA}
                  disabled={!ctaText.trim() || !ctaUrl.trim()}
                  className="flex-1 text-[11px] font-bold py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Insert CTA
                </button>
                <button onClick={() => setMode('idle')} className="px-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
