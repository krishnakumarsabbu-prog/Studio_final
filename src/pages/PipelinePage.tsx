import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DispatchPipeline } from '../components/pipeline/DispatchPipeline';
import { ComponentDispatchRow } from '../types/pipeline';
import NavigationBar from '../components/NavigationBar';

const generateMockPipelineRows = (alertId: string): ComponentDispatchRow[] => {
  const componentNames = [
    { name: 'DocumentPage', type: 'Component', status: 'created' as const, duration: 2.1, ts: '12:30:45' },
    { name: 'NavigationMenu', type: 'Component', status: 'created' as const, duration: 1.8, ts: '12:30:47' },
    { name: 'Header', type: 'Component', status: 'created' as const, duration: 1.9, ts: '12:30:49' },
    { name: 'Folder', type: 'Component', status: 'created' as const, duration: 1.9, ts: '12:30:51' },
    { name: 'Section', type: 'Component', status: 'created' as const, duration: 2.0, ts: '12:30:53' },
    { name: 'ContentList', type: 'Component', status: 'created' as const, duration: 1.7, ts: '12:30:54' },
    { name: 'ContentTitle', type: 'Component', status: 'created' as const, duration: 1.5, ts: '12:30:55' },
    { name: 'RichText', type: 'Component', status: 'processing' as const, duration: 0.8, ts: '12:30:55' },
    { name: 'Breadcrumb', type: 'Component', status: 'failed' as const, duration: 1.2, ts: '12:30:56', msg: 'Validation error in schema' },
    { name: 'Author', type: 'Component', status: 'pending' as const, duration: undefined, ts: undefined },
  ];

  return componentNames.map((c, i) => ({
    stepId: `step-${alertId}-${i + 1}`,
    stepNumber: i + 1,
    stepName: c.name,
    componentType: c.type,
    status: c.status,
    message: c.msg,
    durationSeconds: c.duration,
    timestamp: c.ts,
    requestPayload: {
      name: c.name,
      componentType: c.type,
      schema: `${c.name.toLowerCase()}Schema.json`,
      template: `${c.name}.ftl`,
      status: c.status,
    },
    responsePayload: c.status !== 'pending' ? {
      status: c.status,
      message: c.msg || 'OK',
      timestamp: c.ts,
    } : undefined,
  }));
};

export default function PipelinePage() {
  const { alertId } = useParams<{ alertId: string }>();
  const navigate = useNavigate();

  const rows = generateMockPipelineRows(alertId || 'default');

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <NavigationBar />
      <div className="bg-white border-b border-gray-200 shadow-sm shrink-0">
        <div className="px-6 py-3">
          <button
            onClick={() => navigate(alertId ? `/legacy-alerts/${alertId}` : '/legacy-alerts')}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Alert {alertId}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <DispatchPipeline
          dispatchRows={rows}
          pipelineName={`Alert ${alertId || ''} Tridion`}
          onClose={() => navigate(alertId ? `/legacy-alerts/${alertId}` : '/legacy-alerts')}
        />
      </div>
    </div>
  );
}
