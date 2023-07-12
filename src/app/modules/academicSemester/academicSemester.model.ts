import { Schema, model } from 'mongoose';
import { AcademicConstant } from './academicSemester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

// Create Schema
const academicSemesterSchema = new Schema<IAcademicSemester>({
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
});

// Create Model
export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema,
);
