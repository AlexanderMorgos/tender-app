import { useTheme } from '@mui/material/styles';
import { createMakeStyles } from 'tss-react';

export const { makeStyles: appMakeStyles, useStyles: appUseStyles } = createMakeStyles({ useTheme });
