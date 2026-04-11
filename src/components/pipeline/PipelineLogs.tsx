import { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, Loader, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { PipelineLog, PipelineStatus } from '../../types/pipeline';

interface PipelineLogsProps {
  logs: PipelineLog[];
}

const LogIcon = ({ status }: { status: PipelineStatus }) => {
  switch (status) {
    case 'created':
      return <CheckCircle size={16} className="text-emerald-500 shrink-0" />;
    case 'failed':
      return <XCircle size={16} className="text-red-500 shrink-0" />;
    case 'processing':
      return <Loader size={16} className="text-blue-500 animate-spin shrink-0" />;
    default:
      return <div className="w-4 h-4 rounded-full bg-slate-300 shrink-0" />;
  }
};

const barColor = (status: PipelineStatus) => {
  switch (status) {
    case 'created': return 'bg-emerald-500';
    case 'failed': return 'bg-red-500';
    case 'processing': return 'bg-blue-500';
    default: return 'bg-slate-300';
  }
};

export const PipelineLogs = ({ logs }: PipelineLogsProps) => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [displayLogs, setDisplayLogs] = useState<PipelineLog[]>(logs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayLogs(logs);
  }, [logs]);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayLogs, autoScroll]);

  const clearLogs = () => setDisplayLogs([]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#22c55e">
            <path d="M2 2h2v20H2V2zm4 0h2v20H6V2zm4 4h8v2H10V6zm0 4h8v2H10v-2zm0 4h8v2H10v-2z" />
          </svg>
          <span className="font-bold text-slate-800 text-sm">Live Execution Logs</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Trash2 size={12} />
            Clear Logs
          </button>
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              autoScroll
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {autoScroll ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
            Auto-scroll {autoScroll ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {displayLogs.length === 0 && (
          <div className="flex items-center justify-center h-20 text-slate-400 text-sm">No logs yet</div>
        )}
        {displayLogs.map((log, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors">
            <div className={`w-1 h-8 rounded-full ${barColor(log.status)} shrink-0`} />
            <span className="text-xs text-slate-400 font-mono w-16 shrink-0">{log.timestamp}</span>
            <LogIcon status={log.status} />
            <span className="text-xs text-slate-700 flex-1 truncate">{log.message}</span>
            {log.durationSeconds !== undefined && (
              <>
                <span
                  className={`text-xs font-bold w-12 text-right ${
                    log.status === 'failed' ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  {log.durationSeconds}s
                </span>
                {log.status === 'processing' && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-semibold">
                    In Progress
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
