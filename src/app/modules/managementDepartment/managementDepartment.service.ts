import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ManagementDepartmentConstant } from './managementDepartment.constant';
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface';
import ManagementDepartment from './managementDepartment.model';

// create departments
const createManagementDepartment = async (payload: IManagementDepartment) => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

// get all managemnet departments
const getAllManagementDepartments = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IManagementDepartment[]>> => {
  // filters
  const { searchTerm, ...filterData } = filters;

  const mdSearchFields = ManagementDepartmentConstant.SEARCHABLE_FIELDS;

  const andConditions = [];

  // search in searchable fields
  if (searchTerm) {
    andConditions.push({
      $or: mdSearchFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  // filter rest field if exist
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // paginations
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditon: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditon[sortBy] = sortOrder;
  }

  // query conditons
  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ManagementDepartment.find(queryCondition)
    .sort(sortConditon)
    .skip(skip)
    .limit(limit);

  const total = await ManagementDepartment.count(queryCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single department
const getSinglelManagementDepartment = async (id: string) => {
  const result = await ManagementDepartment.findById(id);
  return result;
};

// update department
const updateManagementDepartment = async (
  id: string,
  payload: IManagementDepartment,
) => {
  const result = await ManagementDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
};
