import React, { useEffect, useState, useCallback } from 'react';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { AppWithStyles } from '@core/theme/types';

import { useStyles } from './notification.styles';

export type AppNotificationProps = AppWithStyles<typeof useStyles> & {
  type?: AlertColor;
  autoHideDuration?: number;
};

const defaultProps = {
  type: 'success' as AlertColor,
  autoHideDuration: 5000,
  className: '',
};

let showNotificationFn: (message: React.ReactNode, notificationProps?: Partial<AppNotificationProps>) => void;

export const showNotification = (message: React.ReactNode, notificationProps?: Partial<AppNotificationProps>) => {
  showNotificationFn(message, notificationProps);
};

export const Notification: React.FC<AppNotificationProps> = ({ classes: externalClasses }) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

  const [notificationMessage, setNotificationMessage] = useState<React.ReactNode>('');
  const [notificationProps, setNotificationProps] = useState(defaultProps);
  const [isOpen, setOpen] = useState(false);

  const open = useCallback((message: React.ReactNode, props?: Partial<AppNotificationProps>) => {
    setNotificationMessage(message);
    setNotificationProps({
      ...defaultProps,
      ...props,
    });
    setOpen(true);
  }, []);

  useEffect(() => {
    showNotificationFn = open;
  }, []);

  const close = useCallback(() => {
    setNotificationProps(defaultProps);
    setOpen(false);
  }, []);

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={Fade}
      autoHideDuration={notificationProps.autoHideDuration}
      classes={{ root: classes.root }}
      onClose={close}
    >
      <Alert elevation={6} onClose={close} severity={notificationProps.type}>
        {notificationMessage}
      </Alert>
    </Snackbar>
  );
};
