import { Form as BaseForm, FormEntityOptions } from 'mobx-react-form';

import { getPlugins } from './plugins';

export abstract class Form<T = any> extends BaseForm<T> {
  protected plugins() {
    return getPlugins();
  }

  protected options(): FormEntityOptions {
    return {
      autoParseNumbers: true,
      validateOnChange: false,
      validateOnBlur: true,
      validationDebounceWait: 0,
      showErrorsOnReset: false,
    };
  }
}
