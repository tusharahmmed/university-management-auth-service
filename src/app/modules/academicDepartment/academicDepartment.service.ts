import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create
const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

// read
const getAllDepartments = async (
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IAcademicDepartment[]>> => {
  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await AcademicDepartment.find()
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicDepartment.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
};
