import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';

// schema
const academicFacultySchema = new Schema<
  IAcademicFaculty,
  AcademicFacultyModel
>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
  },
  {
    timestamps: true,
  },
);

// unique title validation
academicFacultySchema.pre('save', async function (next) {
  const exists = await AcademicFaculty.findOne({
    title: this.title,
  });

  if (exists) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty title is already exists.');
  } else {
    next();
  }
});

// create model
export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'academic-faculty',
  academicFacultySchema,
);
