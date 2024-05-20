import { TenderReadModel } from "@shared/models/tender/read-model";

export interface ITenderService {
  getList: () => Promise<Array<TenderReadModel>>;
}
