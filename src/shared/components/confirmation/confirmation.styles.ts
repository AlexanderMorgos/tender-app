import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ palette, spacing }) => {
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 600,
      color: palette.text.primary,
    },
    wrapper: {
      maxWidth: 640,
      width: '100%',
    },
    header: {
      padding: spacing(6, 6, 4),
    },
    footer: {
      borderTop: `1px solid ${palette.grey[100]}`,
      padding: spacing(2, 4),

      '& > button:first-of-type': {
        marginRight: spacing(5),
      },
    },
    body: {
      color: palette.text.secondary,
      fontSize: 14,
      fontWeight: 400,
      padding: spacing(0, 6, 6),
    },
    cancelButton: {},
    confirmButton: {},
  };
});
