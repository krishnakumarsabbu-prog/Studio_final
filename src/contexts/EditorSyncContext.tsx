import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { SelectionInfo, Variable, ConditionDefinition } from '../types/template';

export interface EditorSelectionState {
  selection: SelectionInfo | null;
  selectedText: string;
  matchedComponentIndex: number | null;
}

export interface EditorSyncContextValue {
  selectionState: EditorSelectionState;
  setEditorSelection: (selection: SelectionInfo | null) => void;
  activeComponentIndex: number | null;
  setActiveComponentIndex: (index: number | null) => void;
  highlightTextInEditor: (text: string) => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  variables: Variable[];
  conditions: ConditionDefinition[];
  onMakeVariable: (name: string) => void;
  onWrapCondition: (name: string) => void;
  onCreateAndWrapCondition: (cond: ConditionDefinition) => void;
  onInsertLink: (url: string, text: string) => void;
  onInsertCTA: (text: string, url: string) => void;
}

const EditorSyncContext = createContext<EditorSyncContextValue | null>(null);

export function useEditorSync() {
  const ctx = useContext(EditorSyncContext);
  if (!ctx) throw new Error('useEditorSync must be used within EditorSyncProvider');
  return ctx;
}

interface EditorSyncProviderProps {
  children: ReactNode;
  variables: Variable[];
  conditions: ConditionDefinition[];
  onMakeVariable: (name: string) => void;
  onWrapCondition: (name: string) => void;
  onCreateAndWrapCondition: (cond: ConditionDefinition) => void;
  onInsertLink: (url: string, text: string) => void;
  onInsertCTA: (text: string, url: string) => void;
}

function findBestMatchingComponentIndex(selectedText: string, components: { textList: string[] }[]): number | null {
  if (!selectedText.trim()) return null;
  const lower = selectedText.toLowerCase().trim();
  let bestIdx: number | null = null;
  let bestScore = 0;

  components.forEach((comp, idx) => {
    const joined = comp.textList.join(' ').toLowerCase();
    if (joined.includes(lower)) {
      const score = lower.length / joined.length;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    }
  });

  return bestIdx;
}

export function EditorSyncProvider({
  children,
  variables,
  conditions,
  onMakeVariable,
  onWrapCondition,
  onCreateAndWrapCondition,
  onInsertLink,
  onInsertCTA,
}: EditorSyncProviderProps) {
  const [selectionState, setSelectionState] = useState<EditorSelectionState>({
    selection: null,
    selectedText: '',
    matchedComponentIndex: null,
  });
  const [activeComponentIndex, setActiveComponentIndex] = useState<number | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const setEditorSelection = useCallback((selection: SelectionInfo | null) => {
    const selectedText = selection?.content?.trim() || '';
    setSelectionState(prev => ({
      selection,
      selectedText,
      matchedComponentIndex: selectedText
        ? findBestMatchingComponentIndex(selectedText, [])
        : null,
    }));
  }, []);

  const setEditorSelectionWithComponents = useCallback(
    (selection: SelectionInfo | null, components: { textList: string[] }[]) => {
      const selectedText = selection?.content?.trim() || '';
      const matchedComponentIndex = selectedText
        ? findBestMatchingComponentIndex(selectedText, components)
        : null;
      setSelectionState({ selection, selectedText, matchedComponentIndex });
      if (matchedComponentIndex !== null) {
        setActiveComponentIndex(matchedComponentIndex);
      }
    },
    []
  );

  const highlightTextInEditor = useCallback((text: string) => {
    if (!editorRef.current || !text.trim()) return;
    const editor = editorRef.current;

    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
    let node: Text | null;
    const lower = text.toLowerCase();

    while ((node = walker.nextNode() as Text | null)) {
      const nodeText = node.textContent || '';
      const idx = nodeText.toLowerCase().indexOf(lower);
      if (idx !== -1) {
        try {
          const range = document.createRange();
          range.setStart(node, idx);
          range.setEnd(node, idx + text.length);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
          const rect = range.getBoundingClientRect();
          const editorRect = editor.getBoundingClientRect();
          if (rect.top < editorRect.top || rect.bottom > editorRect.bottom) {
            node.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } catch {
        }
        break;
      }
    }
  }, []);

  return (
    <EditorSyncContext.Provider value={{
      selectionState,
      setEditorSelection: (sel) => setEditorSelectionWithComponents(sel, []),
      activeComponentIndex,
      setActiveComponentIndex,
      highlightTextInEditor,
      editorRef,
      variables,
      conditions,
      onMakeVariable,
      onWrapCondition,
      onCreateAndWrapCondition,
      onInsertLink,
      onInsertCTA,
    }}>
      {children}
    </EditorSyncContext.Provider>
  );
}

export { findBestMatchingComponentIndex };
