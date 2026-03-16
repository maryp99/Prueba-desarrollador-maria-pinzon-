// src/app/shared/components/reusable-table/reusable-table.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../models/table.models';

@Component({
  selector: 'app-reusable-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-table.component.html',
  styleUrls: ['./reusable-table.component.scss']
})
export class ReusableTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() isLoading: boolean = false;
  @Input() getRowClass?: (row: any) => string;
  
  @Output() rowClick = new EventEmitter<any>();

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  getRowCssClass(row: any): string {
    if (this.getRowClass) {
      return this.getRowClass(row);
    }
    return '';
  }

  getCellClass(column: TableColumn, row: any): string {
    if (column.cellClass && typeof column.cellClass === 'function') {
      return column.cellClass(row);
    }
    return '';
  }

  getCellValue(row: any, column: TableColumn): any {
    const value = row[column.key];
    
    if (column.format && typeof column.format === 'function') {
      return column.format(value);
    }
    
    return value;
  }
}