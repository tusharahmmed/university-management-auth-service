import { AcademicConstant } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (payload: IAcademicSemester) => {
  // check semester title & code similarity
  // expample Autumn = '01'
  if (AcademicConstant.SEMESTER_CODE_MAPER[payload.title] !== payload.code) {
    // throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
