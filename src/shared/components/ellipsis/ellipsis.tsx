import React, { CSSProperties, useState, useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';

import { AppWithStyles } from '@core/theme/types';
import { useAppWidth } from '@shared/hooks/responsive';
import { BREAKPOINT } from '@core/theme/constants';

import { useStyles } from './ellipsis.styles';

export type EllipsisProps = AppWithStyles<typeof useStyles> & {
  text: string | number | React.ReactNode;
  tooltipText?: string;
  component?: React.ElementType;
  componentProps?: ObjectLike;
  width?: string | number;
  maxWidth?: string | number;
  withTooltip?: boolean;
  style?: CSSProperties;
};

export const Ellipsis: React.FC<EllipsisProps> = ({
  classes: externalClasses,
  width,
  maxWidth,
  text,
  tooltipText,
  withTooltip,
  component: Component,
  componentProps,
  style,
}) => {
  const { classes } = useStyles(undefined, { props: { classes: externalClasses } });
  const contentStyles = Component ? { maxWidth: '100%' } : { width, maxWidth };
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const appWidth = useAppWidth();

  const handleTooltipStateChange = useCallback(() => {
    setTooltipOpen(!isTooltipOpen);
  }, [isTooltipOpen]);

  const content = (
    <>
      {withTooltip ? (
        <Tooltip
          open={appWidth.isDown(BREAKPOINT.desktop) ? isTooltipOpen : undefined}
          onClose={handleTooltipStateChange}
          placement="top-start"
          title={tooltipText || String(text) || ''}
        >
          <div
            style={{ ...contentStyles, ...style }}
            className={classes.root}
            onClick={appWidth.isDown(BREAKPOINT.desktop) ? handleTooltipStateChange : undefined}
          >
            {text}
          </div>
        </Tooltip>
      ) : (
        <div style={{ ...contentStyles, ...style }} className={classes.root}>
          {text}
        </div>
      )}
    </>
  );

  if (Component) {
    return (
      <Component style={{ width, maxWidth: maxWidth || '100%', ...style }} {...componentProps}>
        {content}
      </Component>
    );
  }

  return content;
};

Ellipsis.defaultProps = {
  withTooltip: true,
};
