import React, { useEffect, useState, useCallback } from 'react';
import MuiModal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import cx from 'classnames';

import { Flex } from '@shared/components/flex';
import { Button } from '@shared/components/button';
import { AppWithStyles } from '@core/theme/types';

import { useStyles } from './confirmation.styles';

export type ConfirmationProps = AppWithStyles<typeof useStyles>;

export type ButtonConfig = { text: string; className?: string };

type ConfirmationState = {
  open: boolean;
  title: React.ReactNode;
  question: React.ReactNode;
  buttonsConfig?: {
    confirm?: ButtonConfig;
    reject?: ButtonConfig;
  };
  callback: (isConfirmed?: boolean) => void;
};

let showConfirmationFn: ({ title, question, buttonsConfig }: Partial<ConfirmationState>, callback: (isConfirmed: boolean) => void) => void;

export function showConfirmation({ title, question, buttonsConfig }: Partial<ConfirmationState>, callback: (isConfirmed: boolean) => void): void {
  showConfirmationFn({ title, question, buttonsConfig }, callback);
}

export const Confirmation: React.FC<ConfirmationProps> = ({ classes: externalClasses }) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<React.ReactNode>('Confirmation');
  const [question, setQuestion] = useState<React.ReactNode>('');
  const [callback, setCallback] = useState<(isConfirmed: boolean) => void>(() => {});
  const [buttonsConfig, setButtonsConfig] = useState<{ confirm?: ButtonConfig; reject?: ButtonConfig } | undefined>();

  const show = useCallback(({ title, question, buttonsConfig }: Partial<ConfirmationState>, callback: (isConfirmed: boolean) => void): void => {
    setTitle(title);
    setQuestion(question);
    setCallback(() => callback);
    setButtonsConfig(buttonsConfig);
    setOpen(true);
  }, []);

  useEffect(() => {
    showConfirmationFn = show;
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
  }, []);

  const terminate = useCallback(() => {
    callback(false);
    hide();
  }, [callback, hide]);

  const handleYes = useCallback(() => {
    callback(true);
    hide();
  }, [callback, hide]);

  return (
    <MuiModal classes={{ root: classes.root }} open={open} onClose={hide}>
      <Paper classes={{ root: classes.wrapper }}>
        <Flex classes={{ root: classes.header }} justifyContent="space-between" alignItems="center">
          <div className={classes.title}>{title}</div>
        </Flex>
        <div className={classes.body}>{question}</div>
        <Flex classes={{ root: classes.footer }} justifyContent="flex-end">
          <Button
            size="large"
            variant="text"
            onClick={terminate}
            text={buttonsConfig?.reject?.text || 'Cancel'}
            classes={{ root: cx(classes.cancelButton, buttonsConfig?.reject?.className) }}
          />
          <Button
            size="large"
            onClick={handleYes}
            text={buttonsConfig?.confirm?.text}
            classes={{ root: cx(classes.confirmButton, buttonsConfig?.confirm?.className) }}
          />
        </Flex>
      </Paper>
    </MuiModal>
  );
};
