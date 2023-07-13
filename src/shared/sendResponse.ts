import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};

export const sendResponse = <T>(res: Response, obj: IApiResponse<T>) => {
  res.status(obj.statusCode).json({
    success: obj.success,
    message: obj.message || null,
    data: obj.data || null,
  });
};
