// src/app/new-task/new-task.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true, // ¡Importante!
  imports: [CommonModule, ReactiveFormsModule], // Importa ReactiveFormsModule
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  taskForm: FormGroup;
  projects: any[] = [
    { id: 1, name: 'Proyecto Alpha' },
    { id: 2, name: 'Proyecto Beta' }
  ];
  assignees: any[] = [
    { id: 1, name: 'Desarrollador A' },
    { id: 2, name: 'Desarrollador B' }
  ];
  statuses: string[] = ['ToDo', 'InProgress', 'Done', 'Blocked'];
  priorities: string[] = ['Low', 'Medium', 'High', 'Urgent'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      projectId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      assigneeId: ['', Validators.required],
      status: ['ToDo', Validators.required],
      priority: ['Medium', Validators.required],
      estimatedComplexity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar projects y assignees desde la API
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (response) => {
          alert('Tarea creada exitosamente!');
          this.taskForm.reset({
            projectId: '', title: '', description: '', assigneeId: '',
            status: 'ToDo', priority: 'Medium', estimatedComplexity: 3, dueDate: ''
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al crear tarea:', error);
          alert('Error al crear tarea: ' + (error.error?.message || error.message));
        }
      });
    } else {
      this.taskForm.markAllAsTouched();
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}