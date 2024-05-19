import { Container } from 'inversify';

import { sharedAppServices } from '@shared/services';
import { sharedAppViewModels } from '@shared/view-models';
import { DI_TOKENS } from '@shared/constants/di';
import { DiEntity, DiEntityIdentifier } from './types';
import { StorageService } from '@core/services/storage';

const diContainer = new Container();

const entitiesConfig: Array<{ diToken: DiEntityIdentifier; entity: DiEntity }> = [
  { diToken: DI_TOKENS.storageService, entity: StorageService },
  ...sharedAppServices,
  ...sharedAppViewModels,
];

entitiesConfig.forEach(({ diToken, entity }) => {
  diContainer.bind(diToken).to(entity).inSingletonScope();
});

export { diContainer };
