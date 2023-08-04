/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

// instance methods
export type IUserMethods = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'role' | 'needsPasswordChange' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
