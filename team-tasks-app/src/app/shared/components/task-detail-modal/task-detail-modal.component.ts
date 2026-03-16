// src/app/shared/components/task-detail-modal/task-detail-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail-modal.component.html',
  styleUrls: ['./task-detail-modal.component.scss']
})
export class TaskDetailModalComponent {
  @Input() task: any; 
  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }

 
  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'status-pending',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled',
      'ToDo': 'status-todo',
      'InProgress': 'status-inprogress',
      'Done': 'status-done',
      'Blocked': 'status-blocked'
    };
    return statusMap[status] || 'status-default';
  }
}