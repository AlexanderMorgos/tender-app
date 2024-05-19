import { BaseModel } from '@core/base-model';
import { WeatherCondition } from './weather-condition';

export interface ForecastReadQuery {
  date: string;
  condition: WeatherCondition;
  dayParts: {
    morning: number;
    day: number;
    evening: number;
    night: number;
  };
}

export class ForecastReadModel extends BaseModel<ForecastReadQuery> {
  private date: string;
  private condition: WeatherCondition;
  private dayParts: {
    morning: number;
    day: number;
    evening: number;
    night: number;
  };

  constructor(data: ForecastReadQuery) {
    super();

    this.update(data);
  }

  get asJson(): ForecastReadQuery {
    return {
      date: this.date,
      condition: this.condition,
      dayParts: this.dayParts
    };
  }
}
