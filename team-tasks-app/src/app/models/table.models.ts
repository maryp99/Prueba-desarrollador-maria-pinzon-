// src/app/shared/models/table.models.ts

export interface TableColumn {
  key: string;
  label: string;
  pipe?: string;
  format?: (value: any) => string;
  cellClass?: (row: any) => string;
}

export interface TableConfig {
  data: any[];
  columns: TableColumn[];
  isLoading?: boolean;
  getRowClass?: (row: any) => string;
}