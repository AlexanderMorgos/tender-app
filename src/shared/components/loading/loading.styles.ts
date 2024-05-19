import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rootAbsolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    backgroundColor: '#FFFFFF',
  },
  none: {
    margin: 0,
  },
  small: {
    margin: spacing(2),
  },
  normal: {
    margin: spacing(4),
  },
  big: {
    margin: spacing(6),
  },
  svg: {},
  label: {
    fontSize: 16,
    fontWeight: 400,
    color: palette.primary.main,
    marginTop: spacing(3),
  },
}));
