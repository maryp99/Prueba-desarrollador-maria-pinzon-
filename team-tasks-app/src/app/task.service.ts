// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { API_BASE_URL } from './constants/api.constants';

// INTERFAZ PARA RESPUESTA PAGINADA
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = API_BASE_URL;
  private tasksEndpoint = `${this.apiUrl}/api/tasks`;
  private projectsEndpoint = `${this.apiUrl}/api/projects`;

  //  MODO DE DESARROLLO: Cambia a false cuando el backend esté listo
  private useMockData = true;

  //  DATOS DE PRUEBA
  private mockTasks = [
    {
      id: 1,
      projectId: 1,
      title: 'Implementar autenticación',
      description: 'Desarrollar sistema de login con JWT',
      assignedTo: 1,
      assignedName: 'Juan Pérez',
      status: 'InProgress',
      priority: 'High',
      complexity: 8,
      creationDate: '2026-02-28',
      dueDate: '2026-03-19',
      estimatedHours: 40,
      actualHours: 25
    },
    {
      id: 2,
      projectId: 1,
      title: 'Diseñar dashboard',
      description: 'Crear interfaz de usuario para el dashboard principal',
      assignedTo: 2,
      assignedName: 'María García',
      status: 'Done',
      priority: 'Medium',
      complexity: 5,
      creationDate: '2026-03-01',
      dueDate: '2026-03-14',
      estimatedHours: 30,
      actualHours: 28
    },
    {
      id: 3,
      projectId: 1,
      title: 'Optimizar base de datos',
      description: 'Mejorar rendimiento de consultas SQL',
      assignedTo: 3,
      assignedName: 'Carlos López',
      status: 'Blocked',
      priority: 'High',
      complexity: 9,
      creationDate: '2026-03-02',
      dueDate: '2026-03-17',
      estimatedHours: 50,
      actualHours: 10
    },
    {
      id: 4,
      projectId: 1,
      title: 'Crear API REST',
      description: 'Desarrollar endpoints para gestión de tareas',
      assignedTo: 4,
      assignedName: 'Ana Martínez',
      status: 'TODO',
      priority: 'Medium',
      complexity: 7,
      creationDate: '2026-03-03',
      dueDate: '2026-03-24',
      estimatedHours: 35,
      actualHours: 0
    },
    {
      id: 5,
      projectId: 1,
      title: 'Implementar tests unitarios',
      description: 'Crear suite de pruebas automatizadas',
      assignedTo: 5,
      assignedName: 'Pedro Sánchez',
      status: 'InProgress',
      priority: 'Low',
      complexity: 6,
      creationDate: '2026-03-04',
      dueDate: '2026-03-29',
      estimatedHours: 20,
      actualHours: 8
    },
    {
      id: 6,
      projectId: 2,
      title: 'Configurar CI/CD',
      description: 'Implementar pipeline de integración continua',
      assignedTo: 1,
      assignedName: 'Juan Pérez',
      status: 'InProgress',
      priority: 'High',
      complexity: 7,
      creationDate: '2026-03-05',
      dueDate: '2026-03-21',
      estimatedHours: 30,
      actualHours: 15
    },
    {
      id: 7,
      projectId: 2,
      title: 'Documentar API',
      description: 'Crear documentación con Swagger',
      assignedTo: 2,
      assignedName: 'María García',
      status: 'TODO',
      priority: 'Medium',
      complexity: 4,
      creationDate: '2026-03-06',
      dueDate: '2026-03-27',
      estimatedHours: 15,
      actualHours: 0
    },
    {
      id: 8,
      projectId: 3,
      title: 'Migrar a Angular 18',
      description: 'Actualizar el proyecto a la última versión de Angular',
      assignedTo: 3,
      assignedName: 'Carlos López',
      status: 'InProgress',
      priority: 'High',
      complexity: 8,
      creationDate: '2026-03-07',
      dueDate: '2026-03-24',
      estimatedHours: 45,
      actualHours: 20
    }
  ];

  constructor(private http: HttpClient) {
    if (this.useMockData) {
      console.log('⚠️ MODO DESARROLLO: Usando datos de prueba');
      console.log('✅ TaskService inicializado con', this.mockTasks.length, 'tareas de prueba');
    } else {
      console.log('✅ TaskService inicializado con backend real:', this.apiUrl);
    }
  }
  getProjectTasks(
    projectId: number,
    page: number = 1,
    pageSize: number = 10,
    status?: string,
    developerId?: number | null
  ): Observable<PaginatedResponse<any>> {
    console.log('📡 getProjectTasks llamado:', { 
      projectId, 
      page, 
      pageSize, 
      status: status || 'Todos', 
      developerId: developerId || 'Todos' 
    });

    if (this.useMockData) {
      return this.getMockProjectTasks(projectId, page, pageSize, status, developerId);
    }


    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (status && status !== '') {
      params = params.set('status', status);
    }

    if (developerId !== null && developerId !== undefined) {
      params = params.set('developerId', developerId.toString());
    }

    console.log('📡 Llamando a API con parámetros:', params.toString());

    return this.http.get<PaginatedResponse<any>>(`${this.projectsEndpoint}/${projectId}/tasks`, { params })
      .pipe(
        catchError(error => {
          console.error('❌ Error al obtener tareas del backend:', error);
          console.warn('⚠️ Cambiando a datos de prueba...');
          this.useMockData = true;
          return this.getMockProjectTasks(projectId, page, pageSize, status, developerId);
        })
      );
  }

  getTaskDetails(taskId: number): Observable<any> {
    console.log('📡 getTaskDetails llamado para tarea:', taskId);

    if (this.useMockData) {
      return this.getMockTaskDetails(taskId);
    }

    return this.http.get<any>(`${this.tasksEndpoint}/${taskId}`)
      .pipe(
        catchError(error => {
          console.error('❌ Error al obtener detalle de tarea:', error);
          console.warn('⚠️ Cambiando a datos de prueba...');
          this.useMockData = true;
          return this.getMockTaskDetails(taskId);
        })
      );
  }
  createTask(task: any): Observable<any> {
    console.log('📡 createTask llamado:', task);

    if (this.useMockData) {
      return this.createMockTask(task);
    }

    return this.http.post<any>(this.tasksEndpoint, task)
      .pipe(
        catchError(error => {
          console.error('❌ Error al crear tarea:', error);
          console.warn('⚠️ Cambiando a datos de prueba...');
          this.useMockData = true;
          return this.createMockTask(task);
        })
      );
  }

  updateTask(taskId: number, updates: any): Observable<any> {
    console.log('📡 updateTask llamado:', { taskId, updates });

    if (this.useMockData) {
      return this.updateMockTask(taskId, updates);
    }

    return this.http.put<any>(`${this.tasksEndpoint}/${taskId}`, updates)
      .pipe(
        catchError(error => {
          console.error('❌ Error al actualizar tarea:', error);
          console.warn('⚠️ Cambiando a datos de prueba...');
          this.useMockData = true;
          return this.updateMockTask(taskId, updates);
        })
      );
  }

  deleteTask(taskId: number): Observable<boolean> {
    console.log('📡 deleteTask llamado para tarea:', taskId);

    if (this.useMockData) {
      return this.deleteMockTask(taskId);
    }

    return this.http.delete<boolean>(`${this.tasksEndpoint}/${taskId}`)
      .pipe(
        catchError(error => {
          console.error('❌ Error al eliminar tarea:', error);
          console.warn('⚠️ Cambiando a datos de prueba...');
          this.useMockData = true;
          return this.deleteMockTask(taskId);
        })
      );
  }

  private getMockProjectTasks(
    projectId: number,
    page: number,
    pageSize: number,
    status?: string,
    developerId?: number | null
  ): Observable<PaginatedResponse<any>> {
    console.log('🔍 Filtrando tareas mock:', { projectId, status, developerId });

    //  PASO 1: Filtrar por proyecto
    let filteredTasks = this.mockTasks.filter(task => task.projectId === projectId);
    console.log('   - Después de filtrar por proyecto:', filteredTasks.length);

    //  PASO 2: Filtrar por estado (solo si se proporciona)
    if (status && status !== '') {
      filteredTasks = filteredTasks.filter(task => task.status === status);
      console.log('   - Después de filtrar por estado "' + status + '":', filteredTasks.length);
    }

    // PASO 3: Filtrar por desarrollador (solo si se proporciona)
    if (developerId !== null && developerId !== undefined) {
      filteredTasks = filteredTasks.filter(task => task.assignedTo === developerId);
      console.log('   - Después de filtrar por desarrollador ' + developerId + ':', filteredTasks.length);
    }

    // PASO 4: Calcular paginación
    const total = filteredTasks.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    console.log('✅ Tareas paginadas (mock):', {
      total: total,
      page: page,
      pageSize: pageSize,
      showing: paginatedTasks.length,
      from: startIndex + 1,
      to: Math.min(endIndex, total)
    });

    // PASO 5: Devolver respuesta paginada
    const response: PaginatedResponse<any> = {
      items: paginatedTasks,
      total: total,
      page: page,
      pageSize: pageSize
    };

    // Simular delay de red (500ms)
    return of(response).pipe(delay(500));
  }

  private getMockTaskDetails(taskId: number): Observable<any> {
    const task = this.mockTasks.find(t => t.id === taskId);

    if (task) {
      console.log('✅ Tarea encontrada (mock):', task);
      return of(task).pipe(delay(200));
    } else {
      console.warn('⚠️ Tarea no encontrada (mock):', taskId);
      return of(null).pipe(delay(200));
    }
  }

  private createMockTask(task: any): Observable<any> {
    const newTask = {
      ...task,
      id: Math.max(...this.mockTasks.map(t => t.id)) + 1,
      creationDate: new Date().toISOString().split('T')[0]
    };

    this.mockTasks.push(newTask);
    console.log('✅ Tarea creada (mock):', newTask);

    return of(newTask).pipe(delay(300));
  }

  private updateMockTask(taskId: number, updates: any): Observable<any> {
    const index = this.mockTasks.findIndex(t => t.id === taskId);

    if (index !== -1) {
      this.mockTasks[index] = { ...this.mockTasks[index], ...updates };
      console.log('✅ Tarea actualizada (mock):', this.mockTasks[index]);
      return of(this.mockTasks[index]).pipe(delay(300));
    } else {
      console.warn('⚠️ Tarea no encontrada para actualizar (mock):', taskId);
      return of(null).pipe(delay(300));
    }
  }

  private deleteMockTask(taskId: number): Observable<boolean> {
    const index = this.mockTasks.findIndex(t => t.id === taskId);

    if (index !== -1) {
      this.mockTasks.splice(index, 1);
      console.log('✅ Tarea eliminada (mock):', taskId);
      return of(true).pipe(delay(300));
    } else {
      console.warn('⚠️ Tarea no encontrada para eliminar (mock):', taskId);
      return of(false).pipe(delay(300));
    }
  }
}