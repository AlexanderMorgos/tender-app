import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(() => ({
  root: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 14,
  },
}));
