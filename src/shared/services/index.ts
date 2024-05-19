import { DiEntity, DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { ForecastService } from './forecast';

export const sharedAppServices: Array<{ diToken: DiEntityIdentifier; entity: DiEntity }> = [
  { diToken: DI_TOKENS.forecastService, entity: ForecastService },
];
