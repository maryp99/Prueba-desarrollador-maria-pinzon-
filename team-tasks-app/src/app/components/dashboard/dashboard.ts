// team-tasks-app/src/app/components/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard';
import { 
  DeveloperWorkload, 
  ProjectHealth, 
  DeveloperDelayRisk 
} from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  // PROPIEDADES
  developerWorkload: DeveloperWorkload[] = [];
  projectHealth: ProjectHealth[] = [];
  developerDelayRisk: DeveloperDelayRisk[] = [];
  
  loading = {
    workload: false,
    projects: false,
    risks: false
  };
  
  error = {
    workload: '',
    projects: '',
    risks: ''
  };

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  
  /**
   * Cargar todos los datos del dashboard
   */
  loadAllData(): void {
    this.loadDeveloperWorkload();
    this.loadProjectHealth();
    this.loadDeveloperDelayRisk();
  }

  /**
   * Cargar carga de trabajo por desarrollador
   */
  loadDeveloperWorkload(): void {
    this.loading.workload = true;
    this.error.workload = '';
    
    this.dashboardService.getDeveloperWorkload().subscribe({
      next: (data) => {
        this.developerWorkload = data;
        this.loading.workload = false;
        console.log('✅ Developer Workload loaded:', data);
      },
      error: (err) => {
        this.error.workload = 'Error al cargar carga de desarrolladores';
        this.loading.workload = false;
        console.error('❌ Error loading developer workload:', err);
      }
    });
  }

  /**
   * Cargar estado de proyectos
   */
  loadProjectHealth(): void {
    this.loading.projects = true;
    this.error.projects = '';
    
    this.dashboardService.getProjectHealth().subscribe({
      next: (data) => {
        this.projectHealth = data;
        this.loading.projects = false;
        console.log('✅ Project Health loaded:', data);
      },
      error: (err) => {
        this.error.projects = 'Error al cargar estado de proyectos';
        this.loading.projects = false;
        console.error('❌ Error loading project health:', err);
      }
    });
  }

  /**
   * Cargar riesgo de retrasos
   */
  loadDeveloperDelayRisk(): void {
    this.loading.risks = true;
    this.error.risks = '';
    
    this.dashboardService.getDeveloperDelayRisk().subscribe({
      next: (data) => {
        this.developerDelayRisk = data;
        this.loading.risks = false;
        console.log('✅ Developer Delay Risk loaded:', data);
      },
      error: (err) => {
        this.error.risks = 'Error al cargar riesgo de retrasos';
        this.loading.risks = false;
        console.error('❌ Error loading developer delay risk:', err);
      }
    });
  }

  /**
   * Calcular porcentaje de completitud de un proyecto
   */
  getCompletionPercentage(project: ProjectHealth): number {
    if (project.totalTasks === 0) return 0;
    return Math.round((project.completedTasks / project.totalTasks) * 100);
  }

  /**
   * Obtener clase CSS según el riesgo
   */
  getRiskClass(risk: DeveloperDelayRisk): string {
    return risk.highRiskFlag === 1 ? 'high-risk' : 'low-risk';
  }
}