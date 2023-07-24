import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/pagination';
import { IServiceFunction } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AdminConstant } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import Admin from './admin.model';

// get all admin
const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IAdmin[]>> => {
  // filtering
  const { searchTerm, ...filterData } = filters;

  const adminSearchableFields = AdminConstant.SEARCHABLE_FIELD;
  const andConditions = [];

  // search in searchable fields
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => {
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

  const result = await Admin.find(queryCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Admin.count(queryCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single admin
const getSingleAdmin = async (id: string) => {
  const result = await Admin.find({ id }).populate(['managementDepartment']);
  return result;
};

// update admin
const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  // check existence
  const exist = await Admin.findOne({ id });
  if (!exist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  // destructure payload
  const { name, ...adminData } = payload;

  const updatedAdmin: Partial<IAdmin> = { ...adminData };

  // if name obj exist then append dynamically on updatedStudent
  // like name.firstName -> {name.firstName} = payload

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // name.firstName

      // append to updatedStduent
      (updatedAdmin as any)[nameKey] = name[key as keyof typeof name]; // updatedStudent[name.firstName] = name.firstName
    });
  }

  const result = await Admin.findOneAndUpdate({ id }, updatedAdmin, {
    new: true,
  }).populate(['managementDepartment']);

  return result;
};

export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};
