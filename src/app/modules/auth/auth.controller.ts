import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await AuthService.loginUser(payload);
  // set cookie
  const { refreshToken, ...others } = result;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully logged in',
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const data = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrived access token',
    data: data,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
};
