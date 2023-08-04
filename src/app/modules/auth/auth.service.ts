import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import User from '../user/user.model';
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';

// login service
const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;

  // check user
  const user = new User();
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // check password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not matched');
  }

  // create access & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

// refresh token service
const refreshToken = async (
  payload: string,
): Promise<IRefreshTokenResponse> => {
  const refreshToken = payload;
  let verifiedToken: { id: string } | null | JwtPayload = null;

  // check invalid token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret,
    ) as JwtPayload;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check user exist
  const { id } = verifiedToken;
  const user = new User();
  const userExist = await user.isUserExist(id);

  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new accessToken
  const newAccessToken = jwtHelpers.createToken(
    { id: userExist.id, role: userExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
