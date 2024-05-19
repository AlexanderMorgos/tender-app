import React, { forwardRef } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

export type FlexProps = Omit<GridProps, 'ref'> & {
  autoWidth?: boolean;
};

export const Flex: React.FC<FlexProps> = forwardRef<HTMLDivElement, FlexProps>(({ autoWidth, ...otherProps }, ref) => {
  return <Grid ref={ref} style={autoWidth ? { width: 'auto' } : {}} container {...otherProps} />;
});

Flex.defaultProps = {
  autoWidth: true,
};
