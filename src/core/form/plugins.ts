import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs, { ValidatorStatic } from 'validatorjs';

export interface Validation {
  function: (value: any, attribute?: string) => boolean;
  message: string;
}

export const validationRegExpr = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

function createValidations<ClassKey extends string>(x: Record<ClassKey, Validation>) {
  return x;
}

export const baseValidations = createValidations({
  email: {
    function(value: string) {
      return validationRegExpr.email.test(value);
    },
    message: 'The format is invalid. (e.g email@example.com)',
  },
});

export function getPlugins(customValidations?: { [key: string]: Validation }) {
  const rules: {
    [key: string]: Validation;
  } = {
    ...baseValidations,
    ...customValidations,
  };

  return {
    dvr: dvr({
      package: validatorjs,
      extend: ({ validator }: { validator: ValidatorStatic }) => {
        validatorjs.setMessages('en', require('validatorjs/src/lang/en'));

        Object.keys(rules).forEach((key) =>
          validator.register(key, rules[key as keyof typeof rules]?.function as validatorjs.RegisterCallback, rules[key as keyof typeof rules]?.message)
        );
      },
    }),
  };
}
