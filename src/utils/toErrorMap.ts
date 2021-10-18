import { FieldError } from '../generated/graphql';

// this function is used to destructure the errors. In the errors returned from back end, 
// two attributes, field and message, are used for display. 

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};
