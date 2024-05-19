import React from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { AppWithStyles } from '@core/theme/types';

import { Ellipsis } from '../ellipsis';

import { useStyles } from './button.styles';

export type ButtonProps = AppWithStyles<typeof useStyles> &
  Omit<MuiButtonProps, 'ref'> & {
    text?: React.ReactNode;
    loading?: boolean;
  };

export const Button: React.FC<ButtonProps> = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ text, loading, children, color = 'primary', classes: externalClasses, ...otherProps }, ref) => {
    const { classes } = useStyles(undefined, { props: { classes: externalClasses } });
    const baseProps: MuiButtonProps = {
      classes: {
        root: classes.root,
      },
      color,
      ref,
      variant: 'contained',
      size: 'small',
      disabled: loading,
      ...otherProps,
    };

    const spinner = React.useMemo(() => (loading ? <CircularProgress size={15} style={{ marginLeft: 8, height: 'unset' }} /> : null), [loading]);

    const content = () => {
      if (text) {
        if (typeof text === 'string') {
          return (
            <div className={classes.textWrapper}>
              <Ellipsis withTooltip={false} text={text} classes={{ root: classes.text }} />
            </div>
          );
        }

        return text;
      }

      return children;
    };

    return (
      <MuiButton {...baseProps}>
        {content()} {spinner}
      </MuiButton>
    );
  },
);
