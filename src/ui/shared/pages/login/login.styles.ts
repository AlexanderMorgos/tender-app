import { BREAKPOINT } from '@core/theme/constants';
import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing, breakpoints }) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  formWrapper: {
    background: 'radial-gradient(100% 100% at 0 0, hsla(0, 0%, 100%, .6) 0, hsla(0, 0%, 100%, .2) 100%)',
    borderRadius: '6px',
    boxShadow: '14px 12px 41px rgba(0, 0, 0, .25), inset -5px -5px 250px hsla(0, 0%, 100%, .02), inset 5px 5px 4px hsla(0, 0%, 100%, .1)',
    padding: spacing(8),

    [breakpoints.down(BREAKPOINT.mobile)]: {
      margin: spacing(0, 4),
      width: '100%',
      minHeight: '420px',
    },
  },
  heading: {
    fontSize: 32,
    color: '#000000',
    marginBottom: spacing(8)
  },
  emailInput: {
    marginBottom: spacing(2)
  },
  submitButton: {
    width: '100%',
    marginTop: spacing(4)
  }
}));
