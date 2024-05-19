import { ForecastReadModel } from "@shared/models/forecast/read-model";

export interface IForecastViewModel {
  forecast: Array<ForecastReadModel>;
  fetchForecast: () => Promise<void>;
}
