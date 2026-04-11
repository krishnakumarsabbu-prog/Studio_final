export type PipelineStatus = 'created' | 'processing' | 'pending' | 'failed';

export interface ComponentDispatchRow {
  stepId: string;
  stepNumber: number;
  stepName: string;
  componentType: string;
  status: PipelineStatus;
  message?: string;
  durationSeconds?: number;
  timestamp?: string;
  requestPayload?: Record<string, unknown>;
  responsePayload?: Record<string, unknown>;
  parentStepId?: string;
}

export interface PipelineData {
  pipelineName: string;
  totalComponents: number;
  rows: ComponentDispatchRow[];
}

export interface PipelineLog {
  timestamp: string;
  componentName: string;
  status: PipelineStatus;
  message: string;
  durationSeconds?: number;
}
