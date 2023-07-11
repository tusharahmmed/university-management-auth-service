import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const statusCode = 400;
  const errorMessages: IGenericErrorMessage[] = error.errors.map(
    (el: ZodIssue) => {
      const path = el?.path?.slice(-1)?.toString();
      return {
        path,
        message: el?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleZodError;
