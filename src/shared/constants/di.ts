import { DiEntityIdentifier } from '@core/di/types';

function createTokens<Key extends string>(x: Record<Key, DiEntityIdentifier>) {
  return x;
}

export const DI_TOKENS = createTokens({
  storageService: 'storage-service',
  authViewModel: 'auth-view-model',
  tenderService: 'tender-service',
  tenderViewModel: 'tender-view-model'
});
