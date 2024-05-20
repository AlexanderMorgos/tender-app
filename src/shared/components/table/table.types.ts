import { TableCellProps } from '@mui/material/TableCell';

export type Column<T = Item> = TableCellProps & {
  name: string;
  field: string;
  icon?: React.ReactNode;
  renderBodyCell?: (item: T) => React.ReactNode;
  condition?: boolean;
}
