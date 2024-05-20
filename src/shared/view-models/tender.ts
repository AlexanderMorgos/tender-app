import { appInject, appInjectable } from '@core/di/utils';
import { appMakeObservable, appObservable } from '@core/state-management/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { TenderReadQuery } from '@shared/models/tender/read-model';
import { ITenderService } from '@shared/types/services/tender';
import { ITenderViewModel } from '@shared/types/view-models/tender';

@appInjectable()
export class TenderViewModel implements ITenderViewModel {
  private $tenderService = appInject<ITenderService>(DI_TOKENS.tenderService);
  private _list: Array<TenderReadQuery> = [];

  constructor() {
    appMakeObservable(this, {
      _list: appObservable,
    });
  }

  get list() {
    return this._list;
  }

  delete: ITenderViewModel['delete'] = async (id) => {
    this._list = this.list.filter((item) => item.id !== id);
  };

  getList: ITenderViewModel['getList'] = async () => {
    const data = await this.$tenderService.getList();

    this._list = data.map((item) => item.asJson);
  }
}
