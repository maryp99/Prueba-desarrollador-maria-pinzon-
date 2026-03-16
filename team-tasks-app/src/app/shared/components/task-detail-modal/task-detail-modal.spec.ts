// src/app/shared/components/task-detail-modal/task-detail-modal.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailModalComponent } from './task-detail-modal.component';

describe('TaskDetailModalComponent', () => {
  let component: TaskDetailModalComponent;
  let fixture: ComponentFixture<TaskDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailModalComponent] // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have task input property', () => {
    expect(component.task).toBeUndefined(); // Inicialmente undefined
    
    const testTask = { id: 1, name: 'Test Task', description: 'This is a test task' };
    component.task = testTask;
    
    expect(component.task).toEqual(testTask);
  });

  it('should emit onClose event when close() is called', (done) => {
    component.onClose.subscribe(() => {
      expect(true).toBe(true); // Verifica que se llamó
      done(); // Indica que el test asíncrono terminó
    });

    component.close();
  });

  it('should have onClose as EventEmitter', () => {
    expect(component.onClose).toBeDefined();
    expect(component.onClose.observers.length).toBe(0); // Sin suscriptores inicialmente
  });
});