// src/app/components/projects-list/projects-list.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss']
})
export class ProjectsListComponent implements OnInit {
  
  projects: any[] = [];
  isLoading = false;

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;

    // Datos de ejemplo (luego conectarás con tu backend)
    setTimeout(() => {
      this.projects = [
        {
          id: 1,
          name: 'Sistema de Gestión',
          totalTasks: 45,
          completedTasks: 27,
          inProgressTasks: 12,
          pendingTasks: 6
        },
        {
          id: 2,
          name: 'Portal Web',
          totalTasks: 32,
          completedTasks: 20,
          inProgressTasks: 8,
          pendingTasks: 4
        },
        {
          id: 3,
          name: 'App Móvil',
          totalTasks: 28,
          completedTasks: 15,
          inProgressTasks: 10,
          pendingTasks: 3
        },
        {
          id: 4,
          name: 'API REST',
          totalTasks: 38,
          completedTasks: 30,
          inProgressTasks: 5,
          pendingTasks: 3
        },
        {
          id: 5,
          name: 'Dashboard Analytics',
          totalTasks: 22,
          completedTasks: 10,
          inProgressTasks: 8,
          pendingTasks: 4
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  getCompletionPercentage(project: any): number {
    if (project.totalTasks === 0) return 0;
    return Math.round((project.completedTasks / project.totalTasks) * 100);
  }
}
