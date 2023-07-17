import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicConstant } from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (payload: IAcademicSemester) => {
  // check semester title & code similarity
  // expample Autumn = '01'
  if (AcademicConstant.SEMESTER_CODE_MAPER[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);

  if (!result) {
    throw new Error('Failed to create user');
  }

  return result;
};

// get all semesters
const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IAcademicSemester[]>> => {
  // filtering
  const { searchTerm, ...filtersData } = filters;

  const semesterSearchableFields = AcademicConstant.SEARCHABLE_FIELD;
  const andConditons = [];

  // search in searchable fields
  if (searchTerm) {
    andConditons.push({
      $or: semesterSearchableFields.map(field => {
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
  if (Object.keys(filtersData).length) {
    andConditons.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination & sort
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // sample and conditions
  // const andConditonFull = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     $and: [
  //       {
  //         title: filtersData?.title,
  //       },
  //       {
  //         code: filtersData?.code,
  //       },
  //       {
  //         year: filtersData?.year,
  //       },
  //     ]
  //   }
  // ];

  // query conditons
  const queryCondition = andConditons.length > 0 ? { $and: andConditons } : {};

  // query
  const result = await AcademicSemester.find(queryCondition)
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

// get single semester
const getSingleSemester = async (_id: string) => {
  const result = await AcademicSemester.findById(_id);

  return result;
};

// update semester
const updateSemester = async (
  _id: string,
  payload: Partial<IAcademicSemester>,
) => {
  const filter = { _id };

  // check semester code
  if (
    payload.title &&
    payload.code &&
    AcademicConstant.SEMESTER_CODE_MAPER[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate(filter, payload, {
    new: true,
  });

  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
};
