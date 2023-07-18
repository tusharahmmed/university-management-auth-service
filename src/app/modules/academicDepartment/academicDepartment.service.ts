import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { DepartmentConstants } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
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
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IAcademicDepartment[]>> => {
  // filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  // search condition
  const depatmentSearchableFields = DepartmentConstants.SEARCHABLE_FIELD;
  if (searchTerm) {
    andConditions.push({
      $or: depatmentSearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }
  // filter condition
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // query conditons
  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicDepartment.find(queryCondition)
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

// get single
const getSingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate(
    'academicFaculty',
  );

  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
};
