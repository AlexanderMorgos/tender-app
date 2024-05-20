import { appMakeStyles } from '@core/theme/utils/make-styles';

export const useStyles = appMakeStyles()(({ palette, spacing }) => ({
  root: {
    width: '100%',
    padding: spacing(3, 6),
  },
  tableBackground: {
    background: palette.common.white,
    border: `1px solid ${palette.grey[100]}`,
    boxShadow: '0px 4px 12px rgba(20, 20, 52, 0.08)',
  },
  title: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: 24,
    marginBottom: spacing(6),
  },
  headerContent: {
    marginBottom: spacing(4),
  },
  noData: {
    color: palette.text.secondary,
    fontSize: 14,
    fontWeight: 600,
    padding: spacing(8),
  },
  noDataIcon: {
    borderRadius: '50%',
    background: palette.background.default,
    padding: spacing(5.5, 6),
    marginBottom: spacing(3),
  },
  loading: {
    padding: spacing(6),
  },
  headerCell: {
    color: palette.text.secondary,
    fontSize: 14,
    fontWeight: 600,
    background: palette.background.default,
  },
  bodyCell: {
    color: palette.text.secondary,
    fontSize: 14,
    fontWeight: 400,
  },
  pagination: {},
  paginationDisabled: {
    opacity: 0.8,
    pointerEvents: 'none',
  },
}));
