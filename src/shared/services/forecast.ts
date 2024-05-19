import { appInjectable } from '@core/di/utils';
import { ForecastReadModel, ForecastReadQuery } from '@shared/models/forecast/read-model';
import { WeatherCondition } from '@shared/models/forecast/weather-condition';
import { IForecastService } from '@shared/types/services/forecast';
import { addDate } from '@shared/utils/date';

@appInjectable()
export class ForecastService implements IForecastService {
  fetchForecast = async () => {
    const data = await new Promise<Array<ForecastReadQuery>>((resolve) => {
      resolve([
        {
          date: new Date().toString(),
          condition: WeatherCondition.SNOWY,
          dayParts: {
            morning: -3,
            day: 3,
            evening: -2,
            night: -5
          },
        },
        {
          date: addDate(new Date().toString(), 1, 'd'),
          condition: WeatherCondition.CLOUDY,
          dayParts: {
            morning: 1,
            day: 4,
            evening: 2,
            night: -1
          },
        }
      ]);
    });

    return data.map((forecast) => new ForecastReadModel(forecast));
  };
}
