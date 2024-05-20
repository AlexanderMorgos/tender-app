import { BaseModel } from '@core/base-model';
import { TenderStatus } from './status';

export interface TenderReadQuery {
  id: string;
  title: string;
  openingDate: string;
  closingDate: string;
  status: TenderStatus;
  awardAmount?: number | null;
}

export class TenderReadModel extends BaseModel<TenderReadQuery> {
  private id: string;
  private title: string;
  private openingDate: string;
  private closingDate: string;
  private status: TenderStatus;
  private awardAmount?: number | null;

  constructor(data: TenderReadQuery) {
    super();

    this.update(data);
  }

  get asJson(): TenderReadQuery {
    return {
      id: this.id,
      title: this.title,
      openingDate: this.openingDate,
      closingDate: this.closingDate,
      status: this.status,
      awardAmount: this.awardAmount
    };
  }
}
