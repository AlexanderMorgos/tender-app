import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useAppWidth = () => {
  const theme = useTheme();

  const isUp = (breakpoint: Breakpoint | number) => {
    return useMediaQuery(theme.breakpoints.up(breakpoint));
  };

  const isDown = (breakpoint: Breakpoint | number) => {
    return useMediaQuery(theme.breakpoints.down(breakpoint));
  };

  return { isUp, isDown };
};
