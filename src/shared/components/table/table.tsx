import React from 'react';
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { AppWithStyles } from '@core/theme/types';

import { useStyles } from './table.styles';

export type TableProps = AppWithStyles<typeof useStyles> & {
  columns: Array<string>;
  data: Array<{ id: string; values: Array<React.ReactNode> }>;
}
export const Table: React.FC<TableProps> = ({ columns, data, classes: externalClasses, }) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  return (
    <TableContainer component={Paper} classes={{ root: classes.root }}>
      <MuiTable aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {row.values.map((value, index) => (
                <TableCell key={index}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
