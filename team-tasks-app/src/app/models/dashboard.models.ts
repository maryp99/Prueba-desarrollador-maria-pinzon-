// team-tasks-app/src/app/models/dashboard.models.ts

export interface DeveloperWorkload {
  developerId: string;
  developerName: string;
  openTasksCount: number;
  avgEstimatedComplexity: number;
}

export interface ProjectHealth {
  projectId: string;
  projectName: string;
  clientName: string;
  totalTasks: number;
  openTasks: number;
  completedTasks: number;
}

export interface DeveloperDelayRisk {
  developerId: string;
  developerName: string;
  openTasksCount: number;
  avgDelayDays: number;
  nearestDueDate: string;
  latestDueDate: string;
  predictedCompletionDate: string;
  highRiskFlag: number;
}