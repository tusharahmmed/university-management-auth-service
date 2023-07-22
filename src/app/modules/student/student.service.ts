/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { StudentConstant } from './student.constants';
import { IStudent, IStudentFilters } from './student.interface';
import Student from './student.model';

// get all student
const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IStudent[]>> => {
  // filtering
  const { searchTerm, ...filterData } = filters;

  const studentSearchableFields = StudentConstant.SEARCHABLE_FIELD;
  const andConditions = [];

  // search in searchable fields
  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => {
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
  // sort conditions
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // query conditons
  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(queryCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Student.count(queryCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single student
const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id }).populate([
    'academicSemester',
    'academicDepartment',
    'academicFaculty',
  ]);
  return result;
};

// update student
const updateStudent = async (id: string, payload: Partial<IStudent>) => {
  // check existence
  const exist = await Student.findOne({ id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  // destructure payload
  const { name, guardian, localGuardian, ...studentData } = payload;

  const updatedStudent: Partial<IStudent> = { ...studentData };

  // if name obj exist then append dynamically on updatedStudent
  // like name.firstName -> {name.firstName} = payload

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // name.firstName

      // append to updatedStduent
      (updatedStudent as any)[nameKey] = name[key as keyof typeof name]; // updatedStudent[name.firstName] = name.firstName
    });
  }

  // if guardian obj exist then append dynamically on updatedStudent
  // like guardian.key -> {guardian.key} = payload

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`; // guardian.firstName

      // append to updatedStduent
      (updatedStudent as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  // if localGuardian obj exist then append dynamically on updatedStudent
  // like localGuardian.key -> {localGuardian.key} = payload

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `guardian.${key}`; // localGuardian.key

      // append to updatedStduent
      (updatedStudent as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await Student.findOneAndUpdate({ id }, updatedStudent, {
    new: true,
  }).populate(['academicSemester', 'academicDepartment', 'academicFaculty']);

  return result;
};

export const StudentService = {
  updateStudent,
  getAllStudent,
  getSingleStudent,
};
