import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleValidationEroor = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  // return simplify error message
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationEroor;
