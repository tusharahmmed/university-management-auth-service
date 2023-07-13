import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { AcademicConstant } from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

// Create Schema
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: AcademicConstant.TITLES },
    year: { type: Number, required: true, minlength: 4, maxlength: 4 },
    code: { type: String, required: true, enum: AcademicConstant.CODES },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicConstant.SEMESTER_MONTHS,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicConstant.SEMESTER_MONTHS,
    },
  },
  {
    timestamps: true,
  },
);

// pre hooks

// same year & same semester validation
academicSemesterSchema.pre('save', async function (next) {
  const exists = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (exists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic semester is already exists.',
    );
  } else {
    next();
  }
});

// Create Model
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'Academic-Semester',
  academicSemesterSchema,
);
