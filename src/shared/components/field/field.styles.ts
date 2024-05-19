import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(() => ({
  root: {
    position: 'relative',
  },
  label: {},
  errorText: {
    bottom: -16,
  },
}));
