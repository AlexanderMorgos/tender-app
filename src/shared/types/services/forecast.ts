import { ForecastReadModel } from "@shared/models/forecast/read-model";

export interface IForecastService {
  fetchForecast: () => Promise<Array<ForecastReadModel>>;
}
