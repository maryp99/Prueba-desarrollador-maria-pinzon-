export interface TableColumn {
  key: string;
  label: string;
  pipe?: string; 
  format?: (value: any) => string;  
  cellClass?: (row: any) => string;  
}