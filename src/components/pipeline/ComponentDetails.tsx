import { useState } from 'react';
import { Loader, Info } from 'lucide-react';
import { ComponentDispatchRow, PipelineStatus } from '../../types/pipeline';

interface ComponentDetailsProps {
  row: ComponentDispatchRow | null;
}

type Tab = 'request' | 'response' | 'info';

const StatusBadge = ({ status }: { status: PipelineStatus }) => {
  const config = {
    created: { label: 'CREATED', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    failed: { label: 'FAILED', bg: 'bg-red-100', text: 'text-red-700' },
    processing: { label: 'PROCESSING', bg: 'bg-blue-100', text: 'text-blue-700' },
    pending: { label: 'PENDING', bg: 'bg-slate-100', text: 'text-slate-600' },
  };
  const c = config[status];
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded-md ${c.bg} ${c.text} flex items-center gap-1`}>
      {status === 'processing' && <Loader size={10} className="animate-spin" />}
      {c.label}
    </span>
  );
};

const JsonDisplay = ({ data }: { data: Record<string, unknown> | undefined }) => {
  if (!data) return <div className="text-slate-400 text-xs p-4">No data available</div>;

  const lines = JSON.stringify(data, null, 2).split('\n');
  return (
    <div className="bg-slate-50 rounded-lg p-3 font-mono text-xs overflow-auto max-h-48">
      {lines.map((line, i) => {
        const lineNum = i + 1;
        const isKey = line.includes('":');
        const isString = line.trim().startsWith('"') && !isKey;
        return (
          <div key={i} className="flex gap-3">
            <span className="text-slate-300 select-none w-4 text-right shrink-0">{lineNum}</span>
            <span className={isKey ? 'text-blue-600' : isString ? 'text-emerald-600' : 'text-slate-700'}>
              {line}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const ComponentDetails = ({ row }: ComponentDetailsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('request');

  if (!row) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center h-full">
        <div className="text-center text-slate-400">
          <Info size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Click a node to view details</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'request', label: 'Request Payload', icon: '</>' },
    { id: 'response', label: 'Response', icon: '{}' },
    { id: 'info', label: 'Info', icon: 'ℹ' },
  ];

  const defaultPayload = {
    name: row.stepName,
    componentType: row.componentType || 'Component',
    schema: `${row.stepName.toLowerCase()}Schema.json`,
    template: `${row.stepName}.ftl`,
    status: row.status,
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="px-5 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#3b82f6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          <span className="font-bold text-slate-800 text-sm">Component Details</span>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
            {row.stepNumber}
          </div>
          <span className="font-bold text-slate-800 text-sm">{row.stepName} Component</span>
        </div>
        <StatusBadge status={row.status} />
      </div>

      <div className="flex border-b border-slate-100">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span className="font-mono">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'request' && (
          <JsonDisplay data={row.requestPayload || defaultPayload} />
        )}
        {activeTab === 'response' && (
          <JsonDisplay data={row.responsePayload || (row.status === 'pending' ? undefined : { status: row.status, message: row.message || 'OK', timestamp: row.timestamp })} />
        )}
        {activeTab === 'info' && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Step Number</span>
              <span className="font-semibold text-slate-700">{row.stepNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Component Name</span>
              <span className="font-semibold text-slate-700">{row.stepName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Type</span>
              <span className="font-semibold text-slate-700">{row.componentType || 'Component'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Status</span>
              <StatusBadge status={row.status} />
            </div>
            {row.durationSeconds !== undefined && (
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-700">{row.durationSeconds}s</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="#94a3b8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>
          Started: {row.timestamp || 'N/A'}
        </div>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="#94a3b8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z"/></svg>
          Duration: {row.durationSeconds !== undefined ? `${row.durationSeconds}s` : 'N/A'}
        </div>
      </div>
    </div>
  );
};
