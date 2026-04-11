import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ComponentDispatchRow } from '../../types/pipeline';
import { buildFlowFromDispatch, buildLogsFromRows } from '../../lib/pipelineUtils';
import { PipelineNode, StartEndNode } from './PipelineNode';
import { PipelineStatsBar } from './PipelineStatsBar';
import { PipelineLogs } from './PipelineLogs';
import { ComponentDetails } from './ComponentDetails';

const nodeTypes = {
  custom: PipelineNode,
  startEnd: StartEndNode,
};

interface DispatchPipelineProps {
  dispatchRows: ComponentDispatchRow[];
  pipelineName?: string;
  onClose?: () => void;
}

export const DispatchPipeline = ({ dispatchRows, pipelineName, onClose }: DispatchPipelineProps) => {
  const [selectedRow, setSelectedRow] = useState<ComponentDispatchRow | null>(null);
  const { nodes, edges } = buildFlowFromDispatch(dispatchRows);
  const logs = buildLogsFromRows(dispatchRows);

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.type === 'startEnd') return;
      const row = dispatchRows.find(r => r.stepId === node.id);
      if (row) setSelectedRow(row);
    },
    [dispatchRows]
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93c-2.19 2.19-3.5 4.95-3.5 8.07 0 1.81.47 3.5 1.28 4.99L7 20l1.01-1.78C9.5 19.53 11.19 20 13 20c3.12 0 5.88-1.31 8.07-3.5C26.73 10.84 21.61 2.39 21.61 2.39Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {pipelineName || 'Components'}{' '}
                <span className="text-blue-500">Creation</span>{' '}
                Pipeline
              </h2>
              <p className="text-xs text-slate-500">
                Creating {dispatchRows.length} components with real-time tracking
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 border-r border-slate-200">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M4 6h2v2H4V6zm0 5h2v2H4v-2zm0 5h2v2H4v-2zm4-10h12v2H8V6zm0 5h12v2H8v-2zm0 5h12v2H8v-2z"/>
              </svg>
              Sequential Mode
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 3v-3h3v-3h3v3h-3v3z"/>
              </svg>
              Parallel Mode
            </button>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            Start Pipeline
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 px-3 py-2 text-xs text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="px-6 pt-4 pb-3 shrink-0">
        <PipelineStatsBar rows={dispatchRows} />
      </div>

      <div className="px-6 pb-3 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#6366f1">
                <path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 3v-3h3v-3h3v3h-3v3z"/>
              </svg>
              <span className="font-bold text-slate-800 text-sm">Pipeline Flow</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Created</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Processing</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" /> Pending</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Failed</span>
            </div>
          </div>
          <div style={{ height: '340px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              onNodeClick={handleNodeClick}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#e2e8f0" gap={20} />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
      </div>

      <div className="px-6 pb-5 flex gap-4 flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          <PipelineLogs logs={logs} />
        </div>
        <div className="w-80 shrink-0 min-h-0">
          <ComponentDetails row={selectedRow} />
        </div>
      </div>
    </div>
  );
};
