import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import cx from 'classnames';

import { AppWithStyles } from '@core/theme/types';
import { Flex } from '@shared/components/flex';

import { useStyles } from './loading.styles';

export type LoadingProps = AppWithStyles<typeof useStyles> &
  Omit<CircularProgressProps, 'classes'> & {
    margin?: 'none' | 'small' | 'normal' | 'big';
    absolute?: boolean;
    height?: number | string;
    label?: React.ReactNode;
  };

export const Loading: React.FC<LoadingProps> = ({
  classes: externalClasses,
  margin = 'none',
  size = 40,
  absolute,
  height,
  className,
  label,
  ...otherProps
}) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  return (
    <div style={{ height }} className={cx(classes.root, className, classes[margin], { [classes.rootAbsolute]: absolute })}>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <CircularProgress size={size} classes={{ svg: classes.svg }} {...otherProps} />
        <h5 className={classes.label}>{label}</h5>
      </Flex>
    </div>
  );
};
