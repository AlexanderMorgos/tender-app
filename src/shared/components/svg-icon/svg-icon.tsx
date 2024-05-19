import React from 'react';

import CoreSvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export type { SvgIconProps as AppSvgIconProps };

export const AppSvgIcon: React.FC<SvgIconProps> = (props) => {
  return <CoreSvgIcon {...props} />;
};
