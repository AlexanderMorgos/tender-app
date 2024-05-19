import React from 'react';

import { ErrorText } from '@shared/components/error-text';
import { AppWithStyles } from '@core/theme/types';

import { useStyles } from './field.styles';

export type FieldProps = AppWithStyles<typeof useStyles> & {
  label?: React.ReactNode;
  optional?: boolean;
  hasError?: boolean;
  errorText?: React.ReactNode;
};

export const Field: React.FC<React.PropsWithChildren<FieldProps>> = ({ classes: externalClasses, children, label, optional, errorText, hasError, ...otherProps }) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  return (
    <div className={classes.root} {...otherProps}>
      {children}
      {hasError && <ErrorText withTooltip={false} text={errorText} classes={{ root: classes.errorText }} />}
    </div>
  );
};
