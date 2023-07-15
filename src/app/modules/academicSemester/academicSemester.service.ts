import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
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

// get all semesters
const getAllSemesters = async (
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IAcademicSemester[]>> => {
  // pagination & sort
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // query
  const result = await AcademicSemester.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};
