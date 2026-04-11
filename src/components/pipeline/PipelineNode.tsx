import { Handle, Position } from 'reactflow';
import { CheckCircle, XCircle, Clock, Loader, Flag } from 'lucide-react';
import { PipelineStatus } from '../../types/pipeline';
import { getStatusColors } from '../../lib/pipelineUtils';

interface PipelineNodeData {
  label: string;
  componentType: string;
  status: PipelineStatus;
  message?: string;
  durationSeconds?: number;
  stepNumber: number;
  isStart?: boolean;
  isDone?: boolean;
}

const StatusIcon = ({ status }: { status: PipelineStatus }) => {
  switch (status) {
    case 'created':
      return <CheckCircle size={14} className="text-emerald-600" />;
    case 'failed':
      return <XCircle size={14} className="text-red-600" />;
    case 'processing':
      return <Loader size={14} className="text-blue-600 animate-spin" />;
    default:
      return <Clock size={14} className="text-slate-400" />;
  }
};

const StatusBadge = ({ status }: { status: PipelineStatus }) => {
  const colors = getStatusColors(status);
  const label =
    status === 'created'
      ? 'Created'
      : status === 'failed'
      ? 'Failed'
      : status === 'processing'
      ? 'Processing...'
      : 'Pending';

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ background: colors.badge, color: colors.badgeText }}
    >
      <StatusIcon status={status} />
      {label}
    </span>
  );
};

const ComponentIcon = ({ stepNumber }: { stepNumber: number }) => {
  const colors = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
    '#10b981', '#06b6d4', '#6366f1', '#f97316', '#ef4444', '#14b8a6',
  ];
  const color = colors[(stepNumber - 1) % colors.length];

  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-1"
      style={{ background: color }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
        <rect x="3" y="3" width="8" height="8" rx="1" />
        <rect x="13" y="3" width="8" height="8" rx="1" />
        <rect x="3" y="13" width="8" height="8" rx="1" />
        <rect x="13" y="13" width="8" height="8" rx="1" />
      </svg>
    </div>
  );
};

export const PipelineNode = ({ data }: { data: PipelineNodeData }) => {
  const colors = getStatusColors(data.status);

  return (
    <div
      className="relative rounded-xl shadow-sm min-w-[160px] max-w-[180px] transition-all hover:shadow-md"
      style={{
        background: colors.bg,
        border: `2px solid ${colors.border}`,
        padding: '10px 12px',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#94a3b8', width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ background: '#94a3b8', width: 8, height: 8 }} />

      <div
        className="absolute -top-2.5 -left-2.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: colors.border, fontSize: '10px' }}
      >
        {data.stepNumber}
      </div>

      <div className="flex flex-col items-center text-center">
        <ComponentIcon stepNumber={data.stepNumber} />
        <div className="font-bold text-gray-900 text-sm leading-tight">{data.label}</div>
        <div className="text-xs text-gray-400 mb-2">{data.componentType || 'Component'}</div>
        <StatusBadge status={data.status} />
        {data.durationSeconds !== undefined && (
          <div className="text-xs text-gray-400 mt-1">{data.durationSeconds}s</div>
        )}
      </div>

      {data.status === 'processing' && (
        <div className="mt-2 h-1 bg-blue-200 rounded overflow-hidden">
          <div className="h-full bg-blue-500 rounded animate-pulse" style={{ width: '65%' }} />
        </div>
      )}
    </div>
  );
};

export const StartEndNode = ({ data }: { data: { label: string; isStart?: boolean; isDone?: boolean } }) => {
  return (
    <div
      className="w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-md"
      style={{
        background: data.isStart ? '#e9d5ff' : '#ede9fe',
        border: '3px solid #a78bfa',
      }}
    >
      <Handle type="source" position={Position.Right} style={{ background: '#a78bfa', width: 8, height: 8 }} />
      <Handle type="target" position={Position.Left} style={{ background: '#a78bfa', width: 8, height: 8 }} />

      {data.isDone ? (
        <Flag size={22} className="text-violet-600 mb-0.5" />
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="#7c3aed">
          <path d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93c-2.19 2.19-3.5 4.95-3.5 8.07 0 1.81.47 3.5 1.28 4.99L7 20l1.01-1.78C9.5 19.53 11.19 20 13 20c3.12 0 5.88-1.31 8.07-3.5C26.73 10.84 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63 18.15 8.68 17.37 9.46 15.32 10.24 14.54 9.46Z" />
        </svg>
      )}
      <span className="text-violet-700 font-bold text-xs mt-0.5">{data.label}</span>
    </div>
  );
};
