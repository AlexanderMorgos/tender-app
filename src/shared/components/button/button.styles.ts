import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(() => ({
  root: {
    maxWidth: '100%',
    fontFamily: 'inherit',
  },
  textWrapper: {
    width: '100%',
    fontSize: 'inherit',
  },
  text: {
    marginTop: -3,
    fontSize: 'inherit',
    lineHeight: 1.7,
  },
}));
