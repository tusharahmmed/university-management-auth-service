import { SortOrder } from 'mongoose';
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
  const result = await Student.findById(id).populate([
    'academicSemester',
    'academicDepartment',
    'academicFaculty',
  ]);
  return result;
};

// update student
const updateStudent = async (id: string, updatedData: Partial<IStudent>) => {
  const result = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
  }).populate(['academicSemester', 'academicDepartment', 'academicFaculty']);

  return result;
};

// delete student
const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  updateStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
