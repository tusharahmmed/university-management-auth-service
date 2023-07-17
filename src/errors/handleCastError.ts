import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  // error messages
  const errorMessages: IGenericErrorMessage[] = [
    {
      path: error?.path || '',
      message: 'Invalid _id',
    },
  ];

  // return simplify error message
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: error.name,
    errorMessages,
  };
};

export default handleCastError;
