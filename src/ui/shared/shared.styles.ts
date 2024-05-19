import { BREAKPOINT } from '@core/theme/constants';
import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ spacing, breakpoints }) => {
  const HEADER_HEIGHT = 50;
  const CONTENT_MARGIN = 24;

  return {
    root: {
      width: '100%',
      height: '100%',
      overflow: 'auto',
      background: 'linear-gradient(273.93deg, rgba(1, 74, 144, .6), rgba(4, 144, 121, .6) 47.41%, rgba(62, 171, 53, .6) 99.23%)'
    },
    loader: {
      width: '100%',
      height: '100%',
    },
    header: {
      height: HEADER_HEIGHT,
      padding: spacing(1, 4),


      [breakpoints.down(BREAKPOINT.mobile)]: {
        padding: spacing(1, 2),
      },
    },
    avatar: {
      marginRight: spacing(3)
    },
    logoutButton: {
      color: 'white'
    },
    content: {
      padding: spacing(0, 4),
      marginTop: CONTENT_MARGIN,
      height: `calc(100% - ${HEADER_HEIGHT + CONTENT_MARGIN})`
    },
    authContent: {
      height: '100%',
      marginTop: 0
    }
  };
});
