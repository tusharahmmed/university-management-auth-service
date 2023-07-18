import { Schema, Types, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';

const departmentSchema = new Schema<
  IAcademicDepartment,
  AcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      required: true,
      ref: 'academic-faculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('academic-department', departmentSchema);
