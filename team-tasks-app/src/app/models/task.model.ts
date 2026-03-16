// src/app/models/task.model.ts
export interface ITask {
  id: number;
  projectId: number;
  title: string;
  description: string;
  assigneeId: number;
  assigneeName?: string;
  status: 'ToDo' | 'InProgress' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  estimatedComplexity: number;
  creationDate: string; 
  dueDate: string;     
}

export interface IDeveloperWorkload {
  developerName: string;
  openTasksCount: number;
  averageComplexity: number;
}

export interface IProjectHealth {
  projectName: string;
  clientName: string;
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
}

export interface IDelayRisk {
  developerName: string;
  projectName: string;
  riskScore: number;
  highRiskFlag: boolean;
}

export interface IPaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}