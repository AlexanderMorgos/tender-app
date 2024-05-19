import React from 'react';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import cx from 'classnames';

import { AppWithStyles } from '@core/theme/types';
import { appObserver } from '@core/state-management/utils';

import { useStyles } from './select.styles';

export type SelectOption = { id: string | number; label: React.ReactNode; disabled?: boolean };

export type SelectProps = AppWithStyles<typeof useStyles> &
  MuiSelectProps & {
    className?: string;
    options: Array<SelectOption>;
  };

export const Select: React.FC<SelectProps> = appObserver(
  ({ classes: externalClasses, className, error, value, onChange, options, ...otherProps }) => {
    const { classes } = useStyles(undefined, { props: { classes: externalClasses } });

    return (
      <MuiSelect
        value={value}
        onChange={onChange}
        className={cx(classes.root, className)}
        {...otherProps}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.id} disabled={option.disabled} value={String(option.id)}>
              {option.label}
            </MenuItem>
          );
        })}
      </MuiSelect>
    );
  },
);

Select.defaultProps = {
  value: '',
};
