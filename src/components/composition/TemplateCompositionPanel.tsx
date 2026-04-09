import { useState, useEffect } from 'react';
import {
  Search, Plus, ChevronDown, ChevronRight,
  Maximize2, Minimize2, CheckCircle, AlertTriangle, XCircle,
  Code2, Layers, LayoutTemplate, RefreshCw
} from 'lucide-react';
import ComponentCard from './ComponentCard';
import TemplateMetaCard from './TemplateMetaCard';
import AddComponentModal from './AddComponentModal';
import SelectionActionsPanel from './SelectionActionsPanel';
import { AlertComponent, TemplateSchema, SectionType, DEFAULT_SCHEMA, getValidationState } from './types';
import { useEditorSync, findBestMatchingComponentIndex } from '../../contexts/EditorSyncContext';

const SECTION_CONFIG: Record<SectionType, {
  label: string;
  color: string;
  headerBg: string;
  borderColor: string;
  iconBg: string;
  badgeBg: string;
}> = {
  Header: {
    label: 'Header',
    color: 'text-amber-700 dark:text-amber-400',
    headerBg: 'bg-amber-50/80 dark:bg-amber-900/10',
    borderColor: 'border-amber-200/60 dark:border-amber-800/40',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  Body: {
    label: 'Body',
    color: 'text-blue-700 dark:text-blue-400',
    headerBg: 'bg-blue-50/80 dark:bg-blue-900/10',
    borderColor: 'border-blue-200/60 dark:border-blue-800/40',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  },
  Footer: {
    label: 'Footer',
    color: 'text-slate-600 dark:text-slate-400',
    headerBg: 'bg-slate-100/80 dark:bg-slate-800/60',
    borderColor: 'border-slate-200/60 dark:border-slate-700/40',
    iconBg: 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400',
    badgeBg: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  },
};

function ValidationSummary({ schema }: { schema: TemplateSchema }) {
  const issues = schema.alertComponents.filter(c => getValidationState(c).status !== 'valid');
  const warnings = schema.alertComponents.filter(c => getValidationState(c).status === 'warning');
  const errors = schema.alertComponents.filter(c => getValidationState(c).status === 'error');

  if (issues.length === 0) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
        <CheckCircle size={11} className="text-emerald-500 dark:text-emerald-400" />
        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">All Valid</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {errors.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-1 bg-rose-50 dark:bg-rose-900/20 rounded-lg border border-rose-200/60 dark:border-rose-800/40">
          <XCircle size={11} className="text-rose-500 dark:text-rose-400" />
          <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400">{errors.length}</span>
        </div>
      )}
      {warnings.length > 0 && (
        <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
          <AlertTriangle size={11} className="text-amber-500 dark:text-amber-400" />
          <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">{warnings.length}</span>
        </div>
      )}
    </div>
  );
}

interface SectionGroupProps {
  section: SectionType;
  components: { comp: AlertComponent; globalIndex: number }[];
  isCollapsed: boolean;
  onToggle: () => void;
  selectedIndex: number | null;
  highlightedIndex: number | null;
  onSelect: (globalIndex: number) => void;
  onUpdate: (globalIndex: number, updated: AlertComponent) => void;
  onDuplicate: (globalIndex: number) => void;
  onDelete: (globalIndex: number) => void;
  onMoveUp: (globalIndex: number) => void;
  onMoveDown: (globalIndex: number) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onHighlightInEditor: (text: string) => void;
  dragIndex: number | null;
  totalComponents: number;
  onAddToSection: (section: SectionType) => void;
}

function SectionGroup({
  section, components, isCollapsed, onToggle, selectedIndex, highlightedIndex, onSelect,
  onUpdate, onDuplicate, onDelete, onMoveUp, onMoveDown,
  onDragStart, onDragOver, onDrop, onHighlightInEditor, dragIndex, totalComponents, onAddToSection
}: SectionGroupProps) {
  const cfg = SECTION_CONFIG[section];
  const hasHighlight = components.some(({ globalIndex }) => globalIndex === highlightedIndex);

  return (
    <div className={`mx-3 mb-2 rounded-xl border overflow-hidden shadow-sm transition-all ${
      hasHighlight ? 'border-amber-300/60 dark:border-amber-700/40' : cfg.borderColor
    }`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 transition-colors ${cfg.headerBg} hover:brightness-95 dark:hover:brightness-110`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-5 h-5 rounded-md flex items-center justify-center ${cfg.iconBg}`}>
            <LayoutTemplate size={11} />
          </div>
          <span className={`text-[11px] font-bold tracking-wide uppercase ${cfg.color}`}>{cfg.label}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${cfg.badgeBg}`}>{components.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={e => { e.stopPropagation(); onAddToSection(section); }}
            className="p-1 rounded-md hover:bg-white/60 dark:hover:bg-black/20 transition-colors"
          >
            <Plus size={12} className={cfg.color} />
          </button>
          {isCollapsed
            ? <ChevronRight size={13} className={cfg.color} />
            : <ChevronDown size={13} className={cfg.color} />
          }
        </div>
      </button>

      {!isCollapsed && (
        <div className="bg-white dark:bg-slate-900/20 p-2 space-y-1.5">
          {components.length === 0 ? (
            <div className="text-center py-4 text-[11px] text-slate-400 dark:text-slate-500">
              No components yet
            </div>
          ) : (
            components.map(({ comp, globalIndex }, localIdx) => (
              <ComponentCard
                key={`${section}-${globalIndex}`}
                component={comp}
                index={localIdx}
                globalIndex={globalIndex}
                isSelected={selectedIndex === globalIndex}
                isHighlighted={highlightedIndex === globalIndex}
                isDragging={dragIndex === globalIndex}
                onSelect={() => onSelect(globalIndex)}
                onUpdate={(updated) => onUpdate(globalIndex, updated)}
                onDuplicate={() => onDuplicate(globalIndex)}
                onDelete={() => onDelete(globalIndex)}
                onMoveUp={() => onMoveUp(globalIndex)}
                onMoveDown={() => onMoveDown(globalIndex)}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onHighlightInEditor={onHighlightInEditor}
                canMoveUp={globalIndex > 0}
                canMoveDown={globalIndex < totalComponents - 1}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function TemplateCompositionPanel() {
  const { selectionState, activeComponentIndex, setActiveComponentIndex, highlightTextInEditor } = useEditorSync();

  const [schema, setSchema] = useState<TemplateSchema>(DEFAULT_SCHEMA);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSection, setFilterSection] = useState<'All' | SectionType>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [collapsedSections, setCollapsedSections] = useState<Set<SectionType>>(new Set());
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToSection, setAddToSection] = useState<SectionType | null>(null);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const highlightedIndex = selectionState.selectedText
    ? findBestMatchingComponentIndex(selectionState.selectedText, schema.alertComponents)
    : null;

  useEffect(() => {
    if (highlightedIndex !== null) {
      const section = schema.alertComponents[highlightedIndex]?.widget as SectionType;
      if (section && collapsedSections.has(section)) {
        setCollapsedSections(prev => {
          const next = new Set(prev);
          next.delete(section);
          return next;
        });
      }
    }
  }, [highlightedIndex]);

  const toggleSection = (section: SectionType) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const expandAll = () => setCollapsedSections(new Set());
  const collapseAll = () => setCollapsedSections(new Set(['Header', 'Body', 'Footer'] as SectionType[]));

  const handleUpdateComponent = (index: number, updated: AlertComponent) => {
    setSchema(prev => {
      const comps = [...prev.alertComponents];
      comps[index] = updated;
      return { ...prev, alertComponents: comps };
    });
  };

  const handleDuplicateComponent = (index: number) => {
    setSchema(prev => {
      const comps = [...prev.alertComponents];
      comps.splice(index + 1, 0, { ...comps[index], textList: [...comps[index].textList] });
      return { ...prev, alertComponents: comps };
    });
  };

  const handleDeleteComponent = (index: number) => {
    setSchema(prev => {
      const comps = prev.alertComponents.filter((_, i) => i !== index);
      return { ...prev, alertComponents: comps };
    });
    if (selectedIndex === index) setSelectedIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setSchema(prev => {
      const comps = [...prev.alertComponents];
      [comps[index - 1], comps[index]] = [comps[index], comps[index - 1]];
      return { ...prev, alertComponents: comps };
    });
  };

  const handleMoveDown = (index: number) => {
    setSchema(prev => {
      if (index >= prev.alertComponents.length - 1) return prev;
      const comps = [...prev.alertComponents];
      [comps[index], comps[index + 1]] = [comps[index + 1], comps[index]];
      return { ...prev, alertComponents: comps };
    });
  };

  const handleAddComponent = (comp: AlertComponent) => {
    setSchema(prev => {
      const comps = [...prev.alertComponents];
      if (addToSection) {
        const lastIdx = comps.map((c, i) => c.widget === addToSection ? i : -1).filter(i => i >= 0).pop();
        const insertAt = lastIdx !== undefined ? lastIdx + 1 : comps.length;
        comps.splice(insertAt, 0, { ...comp, widget: addToSection });
      } else {
        comps.push(comp);
      }
      return { ...prev, alertComponents: comps };
    });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) {
      setDragIndex(null);
      return;
    }
    setSchema(prev => {
      const comps = [...prev.alertComponents];
      const [dragged] = comps.splice(dragIndex, 1);
      comps.splice(dropIndex, 0, dragged);
      return { ...prev, alertComponents: comps };
    });
    setDragIndex(null);
  };

  const handleJsonToggle = () => {
    if (!jsonMode) {
      setJsonText(JSON.stringify(schema, null, 2));
      setJsonError('');
    }
    setJsonMode(!jsonMode);
  };

  const handleJsonApply = () => {
    try {
      const parsed = JSON.parse(jsonText) as TemplateSchema;
      if (!parsed.alertComponents || !Array.isArray(parsed.alertComponents)) {
        setJsonError('Invalid schema: alertComponents must be an array');
        return;
      }
      setSchema(parsed);
      setJsonError('');
      setJsonMode(false);
    } catch {
      setJsonError('Invalid JSON syntax');
    }
  };

  const filteredComponents = schema.alertComponents.map((comp, i) => ({ comp, globalIndex: i })).filter(({ comp }) => {
    const matchesFilter = filterSection === 'All' || comp.widget === filterSection;
    const matchesSearch = !searchQuery || comp.textList.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) || comp.subType.toLowerCase().includes(searchQuery.toLowerCase()) || comp.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sections: SectionType[] = ['Header', 'Body', 'Footer'];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="flex-shrink-0 px-3 pt-3 pb-2 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 flex items-center justify-center shadow-sm">
                <Layers size={12} className="text-white dark:text-slate-900" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Template Composition</h2>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 ml-8 leading-tight">Build and organize your notification structure</p>
          </div>
          <ValidationSummary schema={schema} />
        </div>

        <div className="relative mb-2">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search components..."
            className="w-full text-[11px] pl-7 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 dark:focus:border-blue-500 transition-all text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <select
            value={filterSection}
            onChange={e => setFilterSection(e.target.value as typeof filterSection)}
            className="text-[10px] font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-400 transition-all text-slate-600 dark:text-slate-300"
          >
            <option value="All">All Sections</option>
            <option value="Header">Header</option>
            <option value="Body">Body</option>
            <option value="Footer">Footer</option>
          </select>

          <div className="flex items-center gap-0.5 ml-auto">
            <button
              onClick={expandAll}
              title="Expand all"
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Maximize2 size={12} />
            </button>
            <button
              onClick={collapseAll}
              title="Collapse all"
              className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Minimize2 size={12} />
            </button>
            <button
              onClick={handleJsonToggle}
              title={jsonMode ? 'Visual mode' : 'JSON view'}
              className={`p-1.5 rounded-lg transition-colors ${
                jsonMode
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Code2 size={12} />
            </button>
          </div>

          <button
            onClick={() => { setAddToSection(null); setShowAddModal(true); }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-[10px] font-bold hover:bg-slate-700 dark:hover:bg-white transition-all shadow-sm"
          >
            <Plus size={11} /> Add
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {jsonMode ? (
          <div className="p-3 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Raw JSON</span>
              <button
                onClick={handleJsonApply}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <RefreshCw size={10} /> Apply
              </button>
            </div>
            {jsonError && (
              <div className="mb-2 px-2.5 py-1.5 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                {jsonError}
              </div>
            )}
            <textarea
              value={jsonText}
              onChange={e => setJsonText(e.target.value)}
              className="flex-1 text-[10px] font-mono text-slate-700 dark:text-slate-200 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400/30 resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="pt-3">
            <SelectionActionsPanel />

            <TemplateMetaCard
              schema={schema}
              onUpdate={updates => setSchema(prev => ({ ...prev, ...updates }))}
            />

            {sections.map(section => {
              const sectionComps = filteredComponents.filter(({ comp }) => comp.widget === section);
              return (
                <SectionGroup
                  key={section}
                  section={section}
                  components={sectionComps}
                  isCollapsed={collapsedSections.has(section)}
                  onToggle={() => toggleSection(section)}
                  selectedIndex={selectedIndex}
                  highlightedIndex={highlightedIndex}
                  onSelect={idx => { setSelectedIndex(idx); setActiveComponentIndex(idx); }}
                  onUpdate={handleUpdateComponent}
                  onDuplicate={handleDuplicateComponent}
                  onDelete={handleDeleteComponent}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onHighlightInEditor={highlightTextInEditor}
                  dragIndex={dragIndex}
                  totalComponents={schema.alertComponents.length}
                  onAddToSection={(sec) => { setAddToSection(sec); setShowAddModal(true); }}
                />
              );
            })}

            <div className="h-6" />
          </div>
        )}
      </div>

      {showAddModal && (
        <AddComponentModal
          onAdd={handleAddComponent}
          onClose={() => { setShowAddModal(false); setAddToSection(null); }}
        />
      )}
    </div>
  );
}
