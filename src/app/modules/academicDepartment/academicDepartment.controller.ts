import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

// create
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.createDepartment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});

// read
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.getAllDepartments();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department retrieved successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
};
