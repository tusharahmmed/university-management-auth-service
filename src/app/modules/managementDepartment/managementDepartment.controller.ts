import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { ManagementDepartmentConstant } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      payload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  },
);
const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(
      req.query,
      ManagementDepartmentConstant.FILTERED_FIELDS,
    );
    const paginationOptions = pick(req.query, PAGINATION_FIELD);
    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  },
);
const getSinglelManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result =
      await ManagementDepartmentService.getSinglelManagementDepartment(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department retrieved successfully',
      data: result,
    });
  },
);
const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const { id } = req.params;

    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      payload,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  },
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSinglelManagementDepartment,
  updateManagementDepartment,
};
