import { Field } from "mobx-react-form";

export const joinRules = (...args: Array<string>) => {
  return args.join('|');
};

export const getFieldBindings = (field?: Field) => {
  if (field) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...otherBinds } = field.bind();

    return otherBinds;
  }

  return {};
};
