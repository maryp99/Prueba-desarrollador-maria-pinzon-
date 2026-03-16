// team-tasks-app/src/app/services/dashboard.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  DeveloperWorkload, 
  ProjectHealth, 
  DeveloperDelayRisk 
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'http://localhost:3000/api/dashboard';

  // Headers para deshabilitar caché
  // private noCacheHeaders = new HttpHeaders({
  //   'Cache-Control': 'no-cache, no-store, must-revalidate',
  //   'Pragma': 'no-cache',
  //   'Expires': '0'
  // });

  constructor(private http: HttpClient) { }

  getDeveloperWorkload(): Observable<DeveloperWorkload[]> {
    return this.http.get<DeveloperWorkload[]>(`${this.apiUrl}/workload`);
  }

  getProjectHealth(): Observable<ProjectHealth[]> {
    return this.http.get<ProjectHealth[]>(`${this.apiUrl}/project-health`);
  }

  getDeveloperDelayRisk(): Observable<DeveloperDelayRisk[]> {
    return this.http.get<DeveloperDelayRisk[]>(`${this.apiUrl}/developer-delay-risk`);
  }
}