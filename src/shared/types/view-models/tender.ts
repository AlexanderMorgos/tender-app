import { TenderReadQuery } from "@shared/models/tender/read-model";

export interface ITenderViewModel {
  list: Array<TenderReadQuery>;
  delete: (id: TenderReadQuery['id']) => Promise<void>;
  getList: (title?: string) => Promise<void>;
}
