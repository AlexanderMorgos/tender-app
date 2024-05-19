import { appInject, appInjectable } from '@core/di/utils';
import { appMakeObservable, appObservable } from '@core/state-management/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { ForecastReadModel } from '@shared/models/forecast/read-model';
import { IForecastService } from '@shared/types/services/forecast';
import { IForecastViewModel } from '@shared/types/view-models/forecast';

@appInjectable()
export class ForecastViewModel implements IForecastViewModel {
  private forecastService = appInject<IForecastService>(DI_TOKENS.forecastService);
  private _forecast: Array<ForecastReadModel> = [];

  constructor() {
    appMakeObservable(this, {
      _forecast: appObservable,
    });
  }

  get forecast() {
    return this._forecast;
  }

  fetchForecast = async () => {
    this._forecast = await this.forecastService.fetchForecast();
  }
}
