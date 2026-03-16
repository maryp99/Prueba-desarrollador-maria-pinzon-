import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHealthTable } from './project-health-table';

describe('ProjectHealthTable', () => {
  let component: ProjectHealthTable;
  let fixture: ComponentFixture<ProjectHealthTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectHealthTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectHealthTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
