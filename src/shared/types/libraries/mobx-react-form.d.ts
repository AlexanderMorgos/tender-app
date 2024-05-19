module 'mobx-react-form' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export abstract class Form<T> {
    constructor(props?: FormConfig);
    protected abstract setup(): FormSetup;
    get hasError(): boolean;
    $: <T = unknown>(fieldName: string) => Field<T>;
    values: () => T;
    validate: () => Promise<void>;
    showErrors: () => void;
    update: (data: { [key: string]: unknown }) => void;
    reset: () => void;
    del: (fieldName: string) => void;
    onSubmit: (args: unknown) => void;
    validator;
    fields: Map<string, Field>;
  }

  export interface Hooks {
    onSuccess?: (form: Form<T>) => void;
    onSubmit?: (form: Form<T>) => void;
    onClear?: (form: Form<T>) => void;
    onReset?: (form: Form<T>) => void;
  }

  export interface FormEntityOptions {
    fallback?: boolean;
    defaultGenericError?: string;
    submitThrowsError?: boolean;
    showErrorsOnInit?: boolean;
    showErrorsOnSubmit?: boolean;
    showErrorsOnBlur?: boolean;
    showErrorsOnChange?: boolean;
    showErrorsOnClear?: boolean;
    showErrorsOnReset?: boolean;
    validateOnInit?: boolean;
    validateOnBlur?: boolean;
    validateOnChange?: boolean;
    validateOnChangeAfterSubmit?: boolean;
    validateOnChangeAfterInitialBlur?: boolean;
    validateDeletedFields?: boolean;
    validateDisabledFields?: boolean;
    validatePristineFields?: boolean;
    strictUpdate?: boolean;
    strictDelete?: boolean;
    softDelete?: boolean;
    retrieveOnlyDirtyValues?: boolean;
    retrieveOnlyEnabledFields?: boolean;
    autoParseNumbers?: boolean;
    validationDebounceWait?: number;
    validationDebounceOptions?: {
      leading: boolean;
      trailing: boolean;
    };
    allowRequired?: boolean;
  }

  export interface FieldConfig<T> {
    name: string;
    type?: string;
    rules?: string;
    options?: FormEntityOptions;
    value?: T;
    role?: string;
    fields?: Array<FieldConfig>;
  }

  type FieldUpdateProperty = 'value' | 'rules';

  export interface FieldBindings {
    autoFocus: Field['autoFocus'];
    id: Field['id'];
    name: Field['name'];
    disabled: Field['disabled'];
    label: Field['label'];
    value: Field['value'];
    placeholder: Field['placeholder'];
    type: Field['type'];
    onChange: Field['onChange'];
    onBlur: Field['onBlur'];
    onFocus: Field['onFocus'];
  }

  export interface Field<T = unknown> {
    autoFocus: boolean;
    error: string;
    errorAsync?: string;
    fields: Map<string, Field>;
    hasError: boolean;
    id: string;
    name: string;
    options: FormEntityOptions;
    role: string;
    rules: string;
    type: string;
    value: T;
    bind: () => FieldBindings;
    onBlur: (e) => void;
    onChange: (e) => void;
    onFocus: (e) => void;
    set: <K>(property: FieldUpdateProperty, value: K) => void;
    validate: () => Promise<void>;
    reset: () => void;
    resetValidation: () => void;
    container: () => Form<T>;
    showErrors: () => void;
    $: (fieldName: string) => Field;
  }

  export interface FormSetup {
    fields: Array<FieldConfig>;
  }

  export interface FormConfig {
    fields?: Array<FieldConfig>;
    hooks?: Hooks;
  }
}

module 'mobx-react-form/lib/validators/DVR' {
  export = function ({
    package, // eslint-disable-line @typescript-eslint/no-unused-vars
    extend, // eslint-disable-line @typescript-eslint/no-unused-vars
  }: {
    package: import('validatorjs').ValidatorStatic;
    extend: ({ validator: ValidatorStatic }) => void;
  }) { };
}
