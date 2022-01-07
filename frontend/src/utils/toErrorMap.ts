import { FieldError } from '../generated/graphql';

export const toErrorMap = (errors: FieldError[]) =>
  Object.fromEntries(errors.map(({ field, message }) => [field, message]));
