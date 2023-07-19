import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

export const studentSchema = new Schema(
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
        values: ['male', 'female'],
        message: '{VALUE} as gender is not supported',
      },
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
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} as blood group is not supported',
      },
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccupation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccupation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },

    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occupation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    profileImg: {
      type: String,
      required: true,
    },
    academicSemester: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Academic-semester',
    },
    academicDepartment: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Academic-department',
    },
    academicFaculty: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Academic-faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const Student = model<IStudent, StudentModel>('Student', studentSchema);

export default Student;
