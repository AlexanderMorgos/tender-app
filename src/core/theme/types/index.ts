import { ThemeOptions } from '@mui/material/styles/createTheme';

export type AppSpacingOptions = ThemeOptions['spacing'];
export type AppShapeOptions = ThemeOptions['shape'];
export type AppBreakpointsOptions = ThemeOptions['breakpoints'];
export type AppWithStyles<T extends () => { classes: unknown }> = {
  classes?: Partial<ReturnType<T>['classes']>;
};
