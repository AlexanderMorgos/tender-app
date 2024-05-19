import React, { forwardRef, useCallback } from 'react';
import { Field as FormField } from 'mobx-react-form';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import cx from 'classnames';

import { AppWithStyles } from '@core/theme/types';
import { Field } from '@shared/components/field';
import { appObserver } from '@core/state-management/utils';
import { getFieldBindings } from '@shared/utils/form';

import { useStyles } from './text-field.styles';

export type TextFieldProps = AppWithStyles<typeof useStyles> &
  Partial<Omit<MuiTextFieldProps, 'variant' | 'ref'>> & {
    className?: string;
    label?: React.ReactNode;
    field?: FormField;
    errorText?: string;
    optional?: boolean;
    maxSymbols?: number;
  };

export const TextField: React.FC<TextFieldProps> = appObserver(
  forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
    const {
      classes: externalClasses,
      className,
      label,
      errorText,
      field,
      optional,
      error,
      value,
      onChange,
      onBlur,
      maxSymbols,
      ...otherProps
    } = props;
    const { classes } = useStyles(undefined, { props: { classes: externalClasses } });
    const inputErrorText = errorText || field?.error;
    const hasError = Boolean(error || field?.error);
    const bindings = getFieldBindings(field);

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
          onBlur(e);
        }

        if (field) {
          field.set('value', e.target.value);
          field.onBlur(e);
        }
      },
      [field, onBlur],
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(e);
        }

        if (field) {
          field.onChange(e.target.value);
        }
      },
      [field, onChange],
    );

    return (
      <Field label={label} optional={optional} hasError={hasError} errorText={inputErrorText} classes={{ root: cx(classes.root, className) }}>
        <MuiTextField
          {...bindings}
          ref={ref}
          error={hasError}
          value={field?.value || value}
          InputProps={{
            classes: {
              root: classes.input,
            },
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cx(classes.root, className)}
          {...otherProps}
        />
      </Field>
    );
  }),
);

TextField.defaultProps = {
  value: '',
  type: 'text'
};
