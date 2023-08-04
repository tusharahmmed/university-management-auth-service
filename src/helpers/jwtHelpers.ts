import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: jwt.JwtPayload,
  secretKey: Secret,
  expireTime: string,
) => {
  return jwt.sign(payload, secretKey, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};
export const jwtHelpers = {
  createToken,
  verifyToken,
};
