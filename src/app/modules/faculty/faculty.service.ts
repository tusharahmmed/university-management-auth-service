/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { FacultyConstant } from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';

// get all faculty
const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IFaculty[]>> => {
  // filtering
  const { searchTerm, ...filterData } = filters;

  const facultySearchableFields = FacultyConstant.SEARCHABLE_FIELD;
  const andConditions = [];

  // search in searchable fields
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  // filter for exact match in filtered fields
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  // sort conditions
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // query conditons
  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(queryCondition)
    .populate(['academicDepartment', 'academicFaculty'])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Faculty.count(queryCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single faculty
const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findOne({ id }).populate([
    'academicDepartment',
    'academicFaculty',
  ]);
  return result;
};

// update faculty
const updateFaculty = async (id: string, payload: Partial<IFaculty>) => {
  // check existence
  const exist = await Faculty.findOne({ id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  // destructure payload
  const { name, ...facultyData } = payload;

  const updatedFaculty: Partial<IFaculty> = { ...facultyData };

  // if name obj exist then append dynamically on updatedStudent
  // like name.firstName -> {name.firstName} = payload

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // name.firstName

      // append to updatedFaculty
      (updatedFaculty as any)[nameKey] = name[key as keyof typeof name]; // updatedStudent[name.firstName] = name.firstName
    });
  }

  const result = await Faculty.findOneAndUpdate({ id }, updatedFaculty, {
    new: true,
  }).populate(['academicDepartment', 'academicFaculty']);

  return result;
};

export const FacultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
