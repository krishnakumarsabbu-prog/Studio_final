import { Box, CheckCircle, Loader, XCircle, Clock } from 'lucide-react';
import { ComponentDispatchRow } from '../../types/pipeline';

interface PipelineStatsBarProps {
  rows: ComponentDispatchRow[];
}

export const PipelineStatsBar = ({ rows }: PipelineStatsBarProps) => {
  const total = rows.length;
  const created = rows.filter(r => r.status === 'created').length;
  const inProgress = rows.filter(r => r.status === 'processing').length;
  const failed = rows.filter(r => r.status === 'failed').length;
  const remaining = rows.filter(r => r.status === 'pending').length;
  const percent = total > 0 ? Math.round(((created) / total) * 100) : 0;

  const stats = [
    {
      label: 'Total Components',
      value: total,
      icon: <Box size={22} className="text-slate-500" />,
      iconBg: 'bg-slate-100',
    },
    {
      label: 'Created',
      value: created,
      icon: <CheckCircle size={22} className="text-emerald-500" />,
      iconBg: 'bg-emerald-50',
      valueColor: 'text-emerald-600',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: <Loader size={22} className="text-orange-400 animate-spin" />,
      iconBg: 'bg-orange-50',
      valueColor: 'text-orange-500',
    },
    {
      label: 'Failed',
      value: failed,
      icon: <XCircle size={22} className="text-red-500" />,
      iconBg: 'bg-red-50',
      valueColor: 'text-red-600',
    },
    {
      label: 'Remaining',
      value: remaining,
      icon: <Clock size={22} className="text-blue-400" />,
      iconBg: 'bg-blue-50',
      valueColor: 'text-slate-700',
    },
  ];

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 min-w-[130px] flex-1"
        >
          <div className={`${stat.iconBg} rounded-lg p-2`}>{stat.icon}</div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.valueColor || 'text-slate-800'}`}>{stat.value}</div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex items-center justify-center min-w-[100px]">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-slate-700">{percent}%</span>
          </div>
        </div>
        <div className="ml-2 text-xs text-slate-500 font-medium">Completed</div>
      </div>
    </div>
  );
};
