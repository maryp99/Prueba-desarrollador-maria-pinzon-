import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelayRiskTable } from './delay-risk-table';

describe('DelayRiskTable', () => {
  let component: DelayRiskTable;
  let fixture: ComponentFixture<DelayRiskTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelayRiskTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DelayRiskTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
