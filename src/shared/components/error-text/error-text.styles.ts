import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ palette }) => ({
  root: {
    color: palette.error.main,
    fontSize: 12,
    fontWeight: 400,
    position: 'absolute',
  },
}));
