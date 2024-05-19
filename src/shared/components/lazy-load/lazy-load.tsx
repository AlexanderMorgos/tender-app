import React from 'react';

import { AppWithStyles } from '@core/theme/types';
import { Loading } from '@shared/components/loading';

import { useStyles } from './lazy-load.styles';

export type LazyLoadProps = AppWithStyles<typeof useStyles> & {
  withFallback?: boolean;
  component?: React.ElementType;
};

export const LazyLoad: React.FC<React.PropsWithChildren<LazyLoadProps>> = (props) => {
  const { component: Component, children, classes: externalClasses, withFallback, ...otherProps } = props;
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  return (
    <React.Suspense fallback={withFallback ? <Loading classes={{ root: classes.root }} size={40} /> : null}>
      {Component ? <Component {...otherProps} /> : children}
    </React.Suspense>
  );
};

LazyLoad.defaultProps = {
  withFallback: true,
};
