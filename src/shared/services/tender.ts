import { appInjectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';
import { TenderReadModel, TenderReadQuery } from '@shared/models/tender/read-model';
import { TenderStatus } from '@shared/models/tender/status';
import { ITenderService } from '@shared/types/services/tender';

@appInjectable()
export class TenderService extends BaseService implements ITenderService {

  getList: ITenderService['getList'] = async () => {
    const data = await new Promise<Array<TenderReadQuery>>((resolve) => {
      resolve([
        {
          id: "T001",
          title: "Road Construction",
          openingDate: "2024-05-01",
          closingDate: "2024-06-15",
          status: TenderStatus.OPEN,
          awardAmount: null
        },
        {
          id: "T002",
          title: "School Renovation",
          openingDate: "2024-04-15",
          closingDate: "2024-05-20",
          status: TenderStatus.UNDER_REVIEW,
          awardAmount: null
        },
        {
          id: "T003",
          title: "IT Infrastructure Setup",
          openingDate: "2024-01-10",
          closingDate: "2024-03-01",
          status: TenderStatus.AWARDED,
          awardAmount: 500000
        },
        {
          id: "T004",
          title: "Water Supply System",
          openingDate: "2024-02-20",
          closingDate: "2024-04-30",
          status: TenderStatus.CLOSED,
          awardAmount: null
        },
        {
          id: "T005",
          title: "Solar Panels Installation",
          openingDate: "2024-03-25",
          closingDate: "2024-05-25",
          status: TenderStatus.OPEN,
          awardAmount: null
        }
      ]);
    });

    return data.map((item) => new TenderReadModel(item));
  };
}
