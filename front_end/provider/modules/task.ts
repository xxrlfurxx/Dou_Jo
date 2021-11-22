export interface TaskItem {
  id: number;
  projectId: number;
  milestoneId: number;
  statusId: number;
  // statusIndex: number;
  reporterId: number;
  summary: string;
  description?: string;
  estimatedTime: number;
  usageTime?: number;
  priority: number;
}
