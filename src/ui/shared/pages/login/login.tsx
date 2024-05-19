import React, { useCallback, useMemo } from 'react';

import { AppWithStyles } from '@core/theme/types';
import { LoginForm, FIELDS } from './login.form';
import { appInject } from '@core/di/utils';
import { IAuthViewModel } from '@shared/types/view-models/auth';
import { DI_TOKENS } from '@shared/constants/di';
import { TextField } from '@shared/components/text-field';
import { Flex } from '@shared/components/flex';
import { Button } from '@shared/components/button';

import { useStyles } from './login.styles';

export type LoginProps = AppWithStyles<typeof useStyles>;

const Login: React.FC<LoginProps> = () => {
  const { classes } = useStyles();
  const authViewModel = appInject<IAuthViewModel>(DI_TOKENS.authViewModel);
  const form = useMemo(() => new LoginForm(), []);

  const handleSubmit = useCallback(async () => {
    await form.validate();

    if (form?.hasError) {
      form?.showErrors();

      return;
    }

    authViewModel.login(form.values().email);
  }, [form]);

  return (
    <Flex 
      direction="column"
      justifyContent="center" 
      alignItems="center" 
      classes={{ root: classes.root }}
    >
      <Flex 
        direction="column"
        justifyContent="center" 
        alignItems="center" 
        classes={{ root: classes.formWrapper }}
      >
        <h3 className={classes.heading}>Login</h3>
        <form onSubmit={form.onSubmit}>
          <TextField
            placeholder='Enter first name...'
            field={form.$(FIELDS.email)} 
            classes={{ root: classes.emailInput }}
          />
          <TextField
            placeholder='Enter password...'
            field={form.$(FIELDS.password)} 
          />
          <Button
            text="Login"
            size="medium"
            onClick={handleSubmit}
            classes={{ root: classes.submitButton }}
          />
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
