import { Schema, model } from 'mongoose';
import { AdminConstant } from './admin.constant';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: { type: String, required: true },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    gender: {
      type: String,
      enum: {
        values: AdminConstant.GENDER,
        message: '{VALUE} as gender is not supported',
      },
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: AdminConstant.BLOOD_GROUP,
        message: '{VALUE} as blood group is not supported',
      },
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    managementDepartment: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Management-department',
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);

export default Admin;
