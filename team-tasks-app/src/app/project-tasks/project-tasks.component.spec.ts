import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTasksComponent } from './project-tasks.component';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { of } from 'rxjs';

describe('ProjectTasksComponent', () => {
  let component: ProjectTasksComponent;
  let fixture: ComponentFixture<ProjectTasksComponent>;
  let mockTaskService: any;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getProjectTasks', 'getTaskDetails']);
    
    mockTaskService.getProjectTasks.and.returnValue(
      of({ items: [], totalCount: 0 })
    );
    
    mockTaskService.getTaskDetails.and.returnValue(
      of({ id: 1, title: 'Test Task', status: 'ToDo' })
    );

    await TestBed.configureTestingModule({
      imports: [ProjectTasksComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        },
        {
          provide: TaskService,
          useValue: mockTaskService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    expect(mockTaskService.getProjectTasks).toHaveBeenCalled();
  });

  it('should calculate total pages correctly', () => {
    component.totalTasks = 25;
    component.pageSize = 10;
    expect(component.getTotalPages()).toBe(3);
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('ToDo')).toBe('status-todo');
    expect(component.getStatusClass('InProgress')).toBe('status-inprogress');
    expect(component.getStatusClass('Done')).toBe('status-done');
    expect(component.getStatusClass('Blocked')).toBe('status-blocked');
  });
});