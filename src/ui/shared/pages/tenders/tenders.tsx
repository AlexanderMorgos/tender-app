import React, { useCallback, useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';

import { AppWithStyles } from '@core/theme/types';
import { Table } from '@shared/components/table/table';
import { TextField } from '@shared/components/text-field';
import { Flex } from '@shared/components/flex';
import { Button } from '@shared/components/button';
import { Column } from '@shared/components/table/table.types';
import { formatDate } from '@shared/utils/date';
import { appObserver } from '@core/state-management/utils';
import { TenderReadQuery } from '@shared/models/tender/read-model';
import { ITenderViewModel } from '@shared/types/view-models/tender';
import { DI_TOKENS } from '@shared/constants/di';
import { appInject } from '@core/di/utils';
import { showConfirmation } from '@shared/components/confirmation';
import { showNotification } from '@shared/components/notification';

import { useStyles } from './tenders.styles';

export type TendersProps = AppWithStyles<typeof useStyles>;

const Tenders: React.FC<TendersProps> = appObserver(() => {
  const $tenderViewModel = appInject<ITenderViewModel>(DI_TOKENS.tenderViewModel);
  const { classes } = useStyles();
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [loading, setLoading] = React.useState(true);

  const initialize = useCallback(async() => {
    try {
      await $tenderViewModel.getList();
    } finally {
      setLoading(false);
    }
  }, []); 

  const handleDelete = useCallback((id: TenderReadQuery['id']) => {
    $tenderViewModel.delete(id);

    const callback = async (isConfirmed: boolean) => {
      if (isConfirmed) {
        try {
          await $tenderViewModel.delete(id);


          showNotification('Tender has been successfully deleted');
        } catch (err) {
          showNotification('Something went wrong', { type: 'error' });

          console.error(err);
        }
      }
    };

    return showConfirmation(
      {
        title: 'Delete tender',
        question: 'Are you sure that you want to delete this tender?',
        buttonsConfig: { confirm: { text: 'Delete' }},
      },
      callback,
    );
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  const columns: Array<Column<TenderReadQuery>> = [
    {
      name: 'Tender ID',
      field: 'id',
    },
    {
      name: 'Title',
      field: 'title',
    },
    {
      name: 'Opening date',
      field: 'openingDate',
      renderBodyCell: ({ openingDate }) => formatDate(openingDate, 'DD MMM YYYY'),
    },
    {
      name: 'Closing date',
      field: 'closingDate',
      renderBodyCell: ({ closingDate }) => formatDate(closingDate, 'DD MMM YYYY'),
    },
    {
      name: 'Status',
      field: 'status',
    },
    {
      name: 'Award amount',
      field: 'awardAmount',
      renderBodyCell: ({ awardAmount }) => awardAmount ? `${awardAmount}$` : '-'
    },
    {
      name: '',
      field: 'id',
      renderBodyCell: ({ id }) => {
        return (
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteForeverIcon />
          </IconButton>
        )
      }
    }
  ];

  return (
    <div className={classes.root}>
      <Flex alignItems="center" justifyContent="space-between" autoWidth={false} classes={{ root: classes.header }}>
        <TextField 
          size="small"
          placeholder='Search...'
        />
        <Button 
          text="Create"
          size="medium"
        />
      </Flex>
      <Table
        withBackground
        loading={loading}
        internalPagination
        columns={columns as unknown as Array<Column>}
        data={$tenderViewModel.list as unknown as Array<Item>}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        classes={{ root: classes.table }}
      />
    </div>
  );
});

export default Tenders;