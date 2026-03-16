// team-tasks-app/src/app/components/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard';
import { 
  DeveloperWorkload, 
  ProjectHealth, 
  DeveloperDelayRisk 
} 
//from '../../app/models/dashboard.models';  
from '../models/dashboard.models'; 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  developerWorkload: DeveloperWorkload[] = [];
  projectHealth: ProjectHealth[] = [];
  developerDelayRisk: DeveloperDelayRisk[] = [];
  
  // Variables de loading (CORREGIDO)
  isLoadingWorkload = false;
  isLoadingProjects = false;
  isLoadingRisk = false;
  
  // Variables de error
  errorWorkload = '';
  errorProjects = '';
  errorRisk = '';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadDeveloperWorkload();
    this.loadProjectHealth();
    this.loadDeveloperDelayRisk();
  }

  loadDeveloperWorkload(): void {
    this.isLoadingWorkload = true;
    this.errorWorkload = '';
    
    this.dashboardService.getDeveloperWorkload().subscribe({
      next: (data: DeveloperWorkload[]) => {
        this.developerWorkload = data;
        this.isLoadingWorkload = false;
        console.log('✅ Developer Workload loaded:', data);
      },
      error: (err: Error) => {
        this.errorWorkload = 'Error al cargar carga de desarrolladores';
        this.isLoadingWorkload = false;
        console.error('❌ Error loading developer workload:', err);
      }
    });
  }

  loadProjectHealth(): void {
    this.isLoadingProjects = true;
    this.errorProjects = '';
    
    this.dashboardService.getProjectHealth().subscribe({
      next: (data: ProjectHealth[]) => {
        this.projectHealth = data;
        this.isLoadingProjects = false;
        console.log('✅ Project Health loaded:', data);
      },
      error: (err: Error) => {
        this.errorProjects = 'Error al cargar estado de proyectos';
        this.isLoadingProjects = false;
        console.error('❌ Error loading project health:', err);
      }
    });
  }

  loadDeveloperDelayRisk(): void {
    this.isLoadingRisk = true;
    this.errorRisk = '';
    
    this.dashboardService.getDeveloperDelayRisk().subscribe({
      next: (data: DeveloperDelayRisk[]) => {
        this.developerDelayRisk = data;
        this.isLoadingRisk = false;
        console.log('✅ Developer Delay Risk loaded:', data);
      },
      error: (err: Error) => {
        this.errorRisk = 'Error al cargar riesgo de retrasos';
        this.isLoadingRisk = false;
        console.error('❌ Error loading developer delay risk:', err);
      }
    });
  }

  getCompletionPercentage(project: ProjectHealth): number {
    if (project.totalTasks === 0) return 0;
    return Math.round((project.completedTasks / project.totalTasks) * 100);
  }

  getRiskClass(risk: DeveloperDelayRisk): string {
    return risk.highRiskFlag === 1 ? 'high-risk' : 'low-risk';
  }
}
