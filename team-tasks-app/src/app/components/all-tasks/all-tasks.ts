// src/app/components/all-tasks/all-tasks.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './all-tasks.html',
  styleUrls: ['./all-tasks.scss']
})
export class AllTasksComponent implements OnInit {
  
  allTasks: any[] = [];
  filteredTasks: any[] = [];
  isLoading = false;

  // Filtros
  selectedStatus = '';
  selectedPriority = '';
  selectedProject = '';

  availableProjects = [
    { id: 1, name: 'Sistema de Gestión' },
    { id: 2, name: 'Portal Web' },
    { id: 3, name: 'App Móvil' },
    { id: 4, name: 'API REST' },
    { id: 5, name: 'Dashboard Analytics' }
  ];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;

    // Datos de ejemplo
    setTimeout(() => {
      this.allTasks = [
        {
          id: 1,
          title: 'Implementar autenticación JWT',
          description: 'Desarrollar sistema de autenticación con tokens JWT',
          status: 'InProgress',
          priority: 'High',
          complexity: 8,
          projectId: 1,
          projectName: 'Sistema de Gestión',
          assignedName: 'Juan Pérez',
          dueDate: '2025-03-25'
        },
        {
          id: 2,
          title: 'Diseñar interfaz de usuario',
          description: 'Crear mockups y prototipos de la interfaz',
          status: 'TODO',
          priority: 'Medium',
          complexity: 6,
          projectId: 2,
          projectName: 'Portal Web',
          assignedName: 'María García',
          dueDate: '2025-03-30'
        },
        {
          id: 3,
          title: 'Optimizar consultas SQL',
          description: 'Mejorar rendimiento de las consultas a la base de datos',
          status: 'Done',
          priority: 'High',
          complexity: 7,
          projectId: 4,
          projectName: 'API REST',
          assignedName: 'Carlos López',
          dueDate: '2025-03-20'
        },
        {
          id: 4,
          title: 'Configurar CI/CD',
          description: 'Implementar pipeline de integración continua',
          status: 'Blocked',
          priority: 'Medium',
          complexity: 9,
          projectId: 1,
          projectName: 'Sistema de Gestión',
          assignedName: 'Ana Martínez',
          dueDate: '2025-04-05'
        },
        {
          id: 5,
          title: 'Desarrollar módulo de reportes',
          description: 'Crear sistema de generación de reportes',
          status: 'InProgress',
          priority: 'Low',
          complexity: 5,
          projectId: 5,
          projectName: 'Dashboard Analytics',
          assignedName: 'Pedro Sánchez',
          dueDate: '2025-04-10'
        }
      ];
      
      this.filteredTasks = [...this.allTasks];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredTasks = this.allTasks.filter(task => {
      const matchesStatus = !this.selectedStatus || task.status === this.selectedStatus;
      const matchesPriority = !this.selectedPriority || task.priority === this.selectedPriority;
      const matchesProject = !this.selectedProject || task.projectId === Number(this.selectedProject);
      
      return matchesStatus && matchesPriority && matchesProject;
    });
  }

  getTaskClass(task: any): string {
    if (task.status === 'Blocked') return 'task-blocked';
    if (task.priority === 'High') return 'task-high-priority';
    if (task.status === 'Done') return 'task-completed';
    return '';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'TODO': 'Pendiente',
      'InProgress': 'En Progreso',
      'Done': 'Completada',
      'Blocked': 'Bloqueada'
    };
    return labels[status] || status;
  }
}