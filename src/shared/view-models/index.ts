import { DiEntity, DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { AuthViewModel } from './auth';
import { TenderViewModel } from './tender';

export const sharedAppViewModels: Array<{ diToken: DiEntityIdentifier; entity: DiEntity }> = [
  { diToken: DI_TOKENS.authViewModel, entity: AuthViewModel },
  { diToken: DI_TOKENS.tenderViewModel, entity: TenderViewModel },
];
