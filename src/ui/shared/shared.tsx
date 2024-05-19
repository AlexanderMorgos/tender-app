import React, { useCallback, useMemo } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import cx from 'classnames';

import { LazyLoad } from '@shared/components/lazy-load';
import { ROUTES } from '@shared/constants/routes';
import { AppWithStyles } from '@core/theme/types';
import { Flex } from '@shared/components/flex';
import { IAuthViewModel } from '@shared/types/view-models/auth';
import { appInject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { appObserver } from '@core/state-management/utils';
import { Button } from '@shared/components/button';

import { useStyles } from './shared.styles';

const Login = React.lazy(() => import('./pages/login'));
const Tenders = React.lazy(() => import('./pages/tenders'));

export type PrivateProps = AppWithStyles<typeof useStyles>;

export const Private: React.FC<PrivateProps> = appObserver(({ classes: initialClasses }) => {
  const $authViewModel = appInject<IAuthViewModel>(DI_TOKENS.authViewModel);
  const navigate = useNavigate();
  const { classes } = useStyles(undefined, { props: { classes: initialClasses } });

  const login = useCallback(() => {
    navigate(ROUTES.public.login);
  }, []);

  const name = useMemo(
    () =>
      $authViewModel.userEmail
        ?.split(' ')
        .map((x) => x[0])
        .join('')
        .substr(0, 2),
    [$authViewModel.userEmail]
  );

  const routes = useMemo((): Array<RouteConfig> => {
    return [
      {
        path: ROUTES.shared.tenders.root,
        element: <Tenders />,
      },
      {
        path: ROUTES.public.login,
        element: <Login />,
        shouldRender: !$authViewModel.loggedIn
      },
    ];
  }, [$authViewModel.loggedIn]);

  const renderRoutes = ({ nestedRoutes, ...otherRouteConfig }: RouteConfig) => {
    return (
      <>
        <Route {...otherRouteConfig} />
        {nestedRoutes?.map((x) => (
          <React.Fragment key={x.path}>{renderRoutes(x)}</React.Fragment>
        ))}
      </>
    );
  };

  const authRoutes = useMemo(() => {
    return [ROUTES.public.login];
  }, []);

  return (
    <LazyLoad classes={{ root: classes.loader }}>
      <div className={classes.root}>
        {!authRoutes.includes(location.pathname) && (
          <Flex autoWidth={false} justifyContent="flex-end" classes={{ root: classes.header }}>
            {$authViewModel.loggedIn ? 
              ( 
                <>
                  <Avatar classes={{ root: classes.avatar }}>
                    {name}
                  </Avatar>
                  <IconButton classes={{ root: classes.logoutButton }} onClick={$authViewModel.logout}>
                    <LogoutIcon fill="white" />
                  </IconButton>
                </>
              ) : (
                <Button
                  text="Login"
                  size="medium"
                  onClick={login} 
                />
              )
            }
          </Flex>
        )}
        <div className={cx(classes.content, !$authViewModel.loggedIn && classes.authContent)}>
          <Routes>
            {routes.map(({ shouldRender = true, ...routeProps }) => {
              if (shouldRender) {
                return <React.Fragment key={String(routeProps.path)}>{renderRoutes(routeProps)}</React.Fragment>;
              }
            })}
            <Route path="*" element={<Navigate to={ROUTES.shared.tenders.root} />} />
          </Routes>
        </div>
      </div>
    </LazyLoad>
  );
});

export default Private;
