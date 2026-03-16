// team-tasks-app/src/app/services/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  DeveloperWorkload, 
  ProjectHealth, 
  DeveloperDelayRisk 
} from '../../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'http://localhost:4200/api/dashboard';

  constructor(private http: HttpClient) { }

  /**
   * Obtener carga de trabajo por desarrollador
   */
  getDeveloperWorkload(): Observable<DeveloperWorkload[]> {
    return this.http.get<DeveloperWorkload[]>(`${this.apiUrl}/workload`);
  }

  /**
   * Obtener estado de salud de proyectos
   */
  getProjectHealth(): Observable<ProjectHealth[]> {
    return this.http.get<ProjectHealth[]>(`${this.apiUrl}/project-health`);
  }

  /**
   * Obtener riesgo de retraso por desarrollador
   */
  getDeveloperDelayRisk(): Observable<DeveloperDelayRisk[]> {
    return this.http.get<DeveloperDelayRisk[]>(`${this.apiUrl}/developer-delay-risk`);
  }
}