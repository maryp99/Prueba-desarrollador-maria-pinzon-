// src/app/project-tasks/project-tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../task.service';
import { ReusableTableComponent } from '../shared/components/reusable-table/reusable-table.component';
import { TaskDetailModalComponent } from '../shared/components/task-detail-modal/task-detail-modal.component';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../models/table.models';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReusableTableComponent,
    TaskDetailModalComponent
  ],
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {
  
  tasks: any[] = [];
  projectId: number = 0;
  projectName: string = '';

  // PAGINACIÓN
  page: number = 1;
  pageSize: number = 10;
  totalTasks: number = 0;

  // FILTROS
  selectedStatus: string = '';
  selectedDeveloper: number | null = null;

  // DATOS DE REFERENCIA
  availableStatuses: string[] = ['TODO', 'InProgress', 'Done', 'Blocked'];
  availableDevelopers: any[] = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos López' },
    { id: 4, name: 'Ana Martínez' },
    { id: 5, name: 'Pedro Sánchez' }
  ];

  // MODAL
  showTaskDetailModal = false;
  selectedTaskDetail: any = null;

  // ESTADO
  isLoading = false;

  // CONFIGURACIÓN DE COLUMNAS 
  projectTasksColumns: TableColumn[] = [
    {
      key: 'title',
      label: 'TÍTULO'
    },
    {
      key: 'assignedName',
      label: 'ASIGNADO A'
    },
    {
      key: 'status',
      label: 'ESTADO',
      cellClass: (row: any) => {
        if (row.status === 'Blocked') return 'status-blocked';
        if (row.status === 'Done') return 'status-done';
        if (row.status === 'InProgress') return 'status-inprogress';
        if (row.status === 'TODO') return 'status-todo';
        return '';
      }
    },
    {
      key: 'priority',
      label: 'PRIORIDAD',
      cellClass: (row: any) => {
        if (row.priority === 'High') return 'high-priority';
        if (row.priority === 'Medium') return 'medium-priority';
        if (row.priority === 'Low') return 'low-priority';
        return '';
      }
    },
    {
      key: 'complexity',
      label: 'COMPLEJIDAD ESTIMADA'
    },
    {
      key: 'creationDate',
      label: 'FECHA DE CREACIÓN',
      format: (value: any) => {
        if (!value) return 'N/A';
        const date = new Date(value);
        return date.toLocaleDateString('es-ES');
      }
    },
    {
      key: 'dueDate',
      label: 'FECHA DE VENCIMIENTO',
      format: (value: any) => {
        if (!value) return 'N/A';
        const date = new Date(value);
        return date.toLocaleDateString('es-ES');
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.loadProjectName();
      this.loadTasks();
    });
  }

  loadProjectName(): void {
    const projectNames: { [key: number]: string } = {
      1: 'Sistema de Gestión',
      2: 'Portal Web',
      3: 'App Móvil',
      4: 'API REST',
      5: 'Dashboard Analytics'
    };
    this.projectName = projectNames[this.projectId] || `Proyecto ${this.projectId}`;
  }

  loadTasks(): void {
    this.isLoading = true;

    this.taskService.getProjectTasks(
      this.projectId,
      this.page,
      this.pageSize,
      this.selectedStatus,
      this.selectedDeveloper
    ).subscribe({
      next: (data: any) => {
        if (data && typeof data === 'object' && 'items' in data && 'total' in data) {
          this.tasks = data.items || [];
          this.totalTasks = data.total || 0;
        } else if (Array.isArray(data)) {
          this.tasks = data;
          this.totalTasks = data.length;
        } else {
          this.tasks = [];
          this.totalTasks = 0;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading tasks:', error);
        this.tasks = [];
        this.totalTasks = 0;
        this.isLoading = false;
      }
    });
  }

  onStatusChange(): void {
    this.page = 1;
    this.loadTasks();
  }

  onDeveloperChange(): void {
    this.page = 1;
    this.loadTasks();
  }

  onPageChange(newPage: number): void {
    if (newPage < 1 || newPage > this.getTotalPages()) {
      return;
    }
    this.page = newPage;
    this.loadTasks();
  }

  onPageSizeChange(): void {
    this.page = 1;
    this.loadTasks();
  }

  showDetail(task: any): void {
    this.taskService.getTaskDetails(task.id).subscribe({
      next: (detail: any) => {
        this.selectedTaskDetail = detail;
        this.showTaskDetailModal = true;
      },
      error: (error: any) => {
        console.error('Error loading task details:', error);
      }
    });
  }

  closeDetailModal(): void {
    this.showTaskDetailModal = false;
    this.selectedTaskDetail = null;
  }

  getTotalPages(): number {
    return Math.ceil(this.totalTasks / this.pageSize) || 1;
  }

  getPageRange(): { from: number; to: number } {
    if (this.totalTasks === 0) {
      return { from: 0, to: 0 };
    }
    const from = (this.page - 1) * this.pageSize + 1;
    const to = Math.min(this.page * this.pageSize, this.totalTasks);
    return { from, to };
  }

  getRowClass = (row: any): string => {
    if (row.priority === 'High') return 'high-priority-row';
    if (row.status === 'Done') return 'completed-row';
    if (row.status === 'Blocked') return 'blocked-row';
    return '';
  };

  hasResults(): boolean {
    return !this.isLoading && this.tasks.length > 0;
  }

  shouldShowPagination(): boolean {
    return !this.isLoading && this.totalTasks > this.pageSize;
  }
}