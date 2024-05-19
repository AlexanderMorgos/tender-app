import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing }) => ({
  root: {},
  header: {
    marginBottom: spacing(2)
  }
}));
