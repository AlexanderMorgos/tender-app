import React from 'react';

import { AppWithStyles } from '@core/theme/types';
import { Table } from '@shared/components/table/table';
import { TextField } from '@shared/components/text-field';
import { Flex } from '@shared/components/flex';
import { Button } from '@shared/components/button';

import { useStyles } from './tenders.styles';

export type TendersProps = AppWithStyles<typeof useStyles>;

const Tenders: React.FC<TendersProps> = () => {
  const { classes } = useStyles();

  const columns = ['Tender ID', 'Title', 'Opening Date', 'Closing Date', 'Status', 'Award Amount', ''];

  const data = [
    { id: '1', values: ["T001", "Road Construction", "2024-05-01", "2024-06-15", "Open", null] },
    { id: '2', values: ["T002", "School Renovation", "2024-04-15", "2024-05-20", "Under Review", null] },
    { id: '3', values: ["T003", "IT Infrastructure Setup", "2024-01-10", "2024-03-01", "Awarded", 500000] },
    { id: '4', values: ["T004", "Water Supply System", "2024-02-20", "2024-04-30", "Closed", null] },
    { id: '5', values: ["T005", "Solar Panels Installation", "2024-03-25", "2024-05-25", "Open", null] }
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
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Tenders;