import React, { useCallback, useMemo } from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination, { LabelDisplayedRowsArgs } from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import cx from 'classnames';

import { AppWithStyles } from '@core/theme/types';
import { Loading } from '@shared/components/loading';
import { Flex } from '@shared/components/flex';
import { Column } from './table.types';
import { EmptyIcon } from '@shared/icons/empty';

import { useStyles } from './table.styles';

export type TableProps = AppWithStyles<typeof useStyles> & {
  withPagination?: boolean;
  internalPagination?: boolean;
  title?: React.ReactNode;
  headerContent?: React.ReactNode;
  columns: Array<Column>;
  data: Array<Item>;
  loading?: boolean;
  disableForward?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  withBackground: boolean;
};

export const Table: React.FC<TableProps> = ({
  classes: externalClasses,
  internalPagination,
  columns,
  data,
  loading,
  headerContent,
  title,
  disableForward,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  withPagination,
  withBackground,
}) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  const handleChangePage = useCallback(
    (event: unknown, page: number) => {
      onPageChange(page);
    },
    [onPageChange],
  );

  const handleChangePageSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onPageChange(0);
      onPageSizeChange(Number(event.target.value));
    },
    [onPageSizeChange],
  );

  const processedData = useMemo(() => {
    if (internalPagination || !withPagination) {
      return data.slice(page * pageSize, page * pageSize + pageSize);
    }

    return data;
  }, [internalPagination, data, page, pageSize, withPagination]);

  const body = useMemo(() => {
    if (!loading && data.length) {
      return (
        <TableBody>
          {processedData.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column, i) => {
                  const value = column.renderBodyCell ? column.renderBodyCell(row) : row[column.field] || '-';

                  return (
                    <TableCell key={i} classes={{ root: classes.bodyCell }}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      );
    }

    return null;
  }, [loading, data, processedData, columns, classes]);

  const emptyState = useMemo(() => {
    if (loading) {
      return <Loading height={200} classes={{ root: classes.loading }} />;
    }

    if (!data.length) {
      return (
        <Flex
          classes={{
            root: classes.noData,
          }}
          alignItems="center"
          flexDirection="column"
        >
          <Flex className={classes.noDataIcon} alignItems="center" justifyContent="center">
            <EmptyIcon />
          </Flex>
          <span>No results found</span>
        </Flex>
      );
    }

    return null;
  }, [classes, data, loading]);

  const renderPaginationLabel = useCallback(
    (label: LabelDisplayedRowsArgs) => {
      return `${label.from} - ${label.from + data.length - 1}`;
    },
    [data],
  );

  const disableForwardButtonProps = useMemo(() => {
    if (disableForward != null) {
      return {
        nextIconButtonProps: {
          disabled: disableForward,
        },
      };
    }

    return {};
  }, [disableForward]);

  return (
    <div className={cx(classes.root, { [classes.tableBackground]: withBackground })}>
      {title && <h5 className={classes.title}>{title}</h5>}
      {headerContent && <div className={classes.headerContent}>{headerContent}</div>}
      <TableContainer>
        <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell key={i} classes={{ root: classes.headerCell }}>
                  {column.name}
                  {column.icon && column.icon}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {body}
        </MuiTable>
      </TableContainer>
      {emptyState}
      {!loading && Boolean(data.length) && withPagination && (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={data.length}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangePageSize}
          labelDisplayedRows={internalPagination ? undefined : renderPaginationLabel}
          classes={{ root: cx(classes.pagination, { [classes.paginationDisabled]: loading }) }}
          {...disableForwardButtonProps}
        />
      )}
    </div>
  );
};

Table.defaultProps = {
  withPagination: true,
};
