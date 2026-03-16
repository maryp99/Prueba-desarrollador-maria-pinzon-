// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component'; 
import { NewTaskComponent } from './new-task/new-task.component';
import { ProjectsListComponent} from './components/projects-list/projects-list';
import { AllTasksComponent } from './components/all-tasks/all-tasks';

export const routes: Routes = [
  // Ruta por defecto
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },

  // Dashboard
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    title: 'Dashboard - Team Tasks'
  },

  // Nueva tarea 
  { 
    path: 'nueva-tarea',  
    component: NewTaskComponent,
    title: 'Nueva Tarea - Team Tasks'
  },

  // Alias en inglés para nueva tarea
  { 
    path: 'new-task', 
    redirectTo: '/nueva-tarea',
    pathMatch: 'full'
  },

  // Alias alternativo para nueva tarea
  { 
    path: 'tasks/new', 
    redirectTo: '/nueva-tarea',
    pathMatch: 'full'
  },

  // ✅ LISTA DE TODAS LAS TAREAS (general)
  { 
    path: 'tasks',  
    component: AllTasksComponent,
    title: 'Todas las Tareas - Team Tasks'
  },

  // ✅ LISTA DE TODOS LOS PROYECTOS (general)
  { 
    path: 'projects',  
    component: ProjectsListComponent,
    title: 'Proyectos - Team Tasks'
  },
  
  // Tareas de un proyecto específico (ya existente)
  { 
    path: 'projects/:id/tasks',  
    component: ProjectTasksComponent,
    title: 'Tareas del Proyecto - Team Tasks'
  },

  // Redirigir cualquier ruta no encontrada al dashboard
  { 
    path: '**', 
    redirectTo: '/dashboard' 
  }
];