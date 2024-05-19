import React from 'react';

import { AppWithStyles } from '@core/theme/types';
import { Ellipsis, EllipsisProps } from '@shared/components/ellipsis';

import { useStyles } from './error-text.styles';

export type ErrorTextProps = AppWithStyles<typeof useStyles> & EllipsisProps;

export const ErrorText: React.FC<ErrorTextProps> = ({ classes: externalClasses, ...otherProps }) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  return <Ellipsis {...otherProps} classes={{ root: classes.root }} />;
};
