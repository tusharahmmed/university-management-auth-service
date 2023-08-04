/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, IUserMethods, UserModel } from './user.interface';

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// instance methods
// check user registered
userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1, role: 1 },
  );

  return user;
};
// match password
userSchema.methods.isPasswordMatched = async function (
  givenPassword,
  savedPassword,
) {
  const matchedResult = await bcrypt.compare(givenPassword, savedPassword);
  return matchedResult;
};

// pre hooks
userSchema.pre('save', async function (next) {
  // hass password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// 3. Create a Model.
const User = model<IUser, UserModel>('User', userSchema);

export default User;
