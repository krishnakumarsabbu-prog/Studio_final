import { Node, Edge } from 'reactflow';
import { ComponentDispatchRow, PipelineStatus } from '../types/pipeline';

export const getStatusColors = (status: PipelineStatus) => {
  switch (status) {
    case 'created':
      return {
        bg: '#f0fdf4',
        border: '#4ade80',
        text: '#166534',
        badge: '#dcfce7',
        badgeText: '#166534',
        dot: '#22c55e',
      };
    case 'failed':
      return {
        bg: '#fef2f2',
        border: '#f87171',
        text: '#991b1b',
        badge: '#fee2e2',
        badgeText: '#991b1b',
        dot: '#ef4444',
      };
    case 'processing':
      return {
        bg: '#eff6ff',
        border: '#60a5fa',
        text: '#1e40af',
        badge: '#dbeafe',
        badgeText: '#1e40af',
        dot: '#3b82f6',
      };
    default:
      return {
        bg: '#f8fafc',
        border: '#94a3b8',
        text: '#475569',
        badge: '#f1f5f9',
        badgeText: '#475569',
        dot: '#94a3b8',
      };
  }
};

const ROW_SIZE = 5;
const H_GAP = 260;
const V_GAP = 180;
const NODE_Y_BASE = 80;

export const buildFlowFromDispatch = (rows: ComponentDispatchRow[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const startNode: Node = {
    id: 'start',
    position: { x: -160, y: NODE_Y_BASE + 40 },
    data: { label: 'START', isStart: true },
    type: 'startEnd',
  };
  nodes.push(startNode);

  rows.forEach((row, index) => {
    const col = index % ROW_SIZE;
    const rowNum = Math.floor(index / ROW_SIZE);
    const isEvenRow = rowNum % 2 === 0;
    const x = isEvenRow ? col * H_GAP : (ROW_SIZE - 1 - col) * H_GAP;
    const y = NODE_Y_BASE + rowNum * V_GAP;

    nodes.push({
      id: row.stepId,
      position: { x, y },
      data: {
        label: row.stepName,
        componentType: row.componentType,
        status: row.status,
        message: row.message,
        durationSeconds: row.durationSeconds,
        stepNumber: row.stepNumber,
      },
      type: 'custom',
    });

    if (index === 0) {
      edges.push({
        id: `e-start-${row.stepId}`,
        source: 'start',
        target: row.stepId,
        animated: row.status === 'processing',
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        type: 'smoothstep',
      });
    } else {
      const prev = rows[index - 1];
      const prevCol = (index - 1) % ROW_SIZE;
      const prevRowNum = Math.floor((index - 1) / ROW_SIZE);
      const currentRowNum = Math.floor(index / ROW_SIZE);
      const isRowTransition = prevRowNum !== currentRowNum;

      edges.push({
        id: `e-${prev.stepId}-${row.stepId}`,
        source: prev.stepId,
        target: row.stepId,
        animated: row.status === 'processing',
        style: {
          stroke: row.status === 'failed' ? '#ef4444' : row.status === 'processing' ? '#3b82f6' : '#4ade80',
          strokeWidth: 2,
        },
        type: isRowTransition ? 'smoothstep' : 'smoothstep',
      });
    }
  });

  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    const lastIndex = rows.length - 1;
    const col = lastIndex % ROW_SIZE;
    const rowNum = Math.floor(lastIndex / ROW_SIZE);
    const isEvenRow = rowNum % 2 === 0;
    const doneX = isEvenRow
      ? (rows.length % ROW_SIZE === 0 ? 0 : (rows.length % ROW_SIZE) * H_GAP)
      : (ROW_SIZE - 1 - (rows.length % ROW_SIZE === 0 ? ROW_SIZE - 1 : (rows.length % ROW_SIZE) - 1) - 1) * H_GAP;

    const adjustedDoneX = isEvenRow
      ? (col + 1) * H_GAP
      : (ROW_SIZE - 1 - col - 1) * H_GAP;

    const doneNode: Node = {
      id: 'done',
      position: { x: adjustedDoneX, y: NODE_Y_BASE + rowNum * V_GAP + 40 },
      data: { label: 'DONE', isDone: true },
      type: 'startEnd',
    };
    nodes.push(doneNode);

    edges.push({
      id: `e-${lastRow.stepId}-done`,
      source: lastRow.stepId,
      target: 'done',
      animated: lastRow.status === 'processing',
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      type: 'smoothstep',
    });
  }

  return { nodes, edges };
};

export const buildLogsFromRows = (rows: ComponentDispatchRow[]) => {
  return rows
    .filter(r => r.status !== 'pending')
    .map(r => ({
      timestamp: r.timestamp || '12:30:00',
      componentName: r.stepName,
      status: r.status,
      message:
        r.status === 'created'
          ? `${r.stepName} created successfully`
          : r.status === 'failed'
          ? `${r.stepName} failed - ${r.message || 'Unknown error'}`
          : `${r.stepName} is being created...`,
      durationSeconds: r.durationSeconds,
    }));
};
