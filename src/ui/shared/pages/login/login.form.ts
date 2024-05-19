import { Form } from '@core/form/base';
import { FORM_VALIDATIONS } from '@core/form/constants';
import { FormFields } from './login.types';
import { joinRules } from '@shared/utils/form';

export const FIELDS = {
  email: 'email',
  password: 'password'
};

export class LoginForm extends Form<FormFields> {
  protected setup() {
    return {
      fields: [
        {
          name: FIELDS.email,
          type: 'text',
          rules: joinRules(FORM_VALIDATIONS.required),
        },
        {
          name: FIELDS.password,
          type: 'text',
          rules: joinRules(FORM_VALIDATIONS.required),
        },
      ],
    };
  }
}
