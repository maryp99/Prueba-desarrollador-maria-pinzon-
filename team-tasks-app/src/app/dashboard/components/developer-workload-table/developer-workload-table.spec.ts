import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperWorkloadTable } from './developer-workload-table';

describe('DeveloperWorkloadTable', () => {
  let component: DeveloperWorkloadTable;
  let fixture: ComponentFixture<DeveloperWorkloadTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperWorkloadTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DeveloperWorkloadTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
