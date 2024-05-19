import React from 'react';

import { appObserver } from '@core/state-management/utils';
import { LazyLoad } from '@shared/components/lazy-load';
import { AppWithStyles } from '@core/theme/types';

import { useStyles } from './app.styles';

const SharedModule = React.lazy(() => import('./ui/shared'));

export type AppProps = AppWithStyles<typeof useStyles>;

const App: React.FC<AppProps> = appObserver(({ classes: initialClasses }) => {
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  return (
    <LazyLoad classes={{ root: classes.root }}>
      <SharedModule />
    </LazyLoad>
  );
});

export default App;
