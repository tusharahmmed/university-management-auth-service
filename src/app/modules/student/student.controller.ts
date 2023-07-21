import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { StudentConstant } from './student.constants';
import { StudentService } from './student.service';

// get all student
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  // filters
  const filters = pick(req.query, StudentConstant.FILTERS_FIELD);

  // pagination
  const paginationOptions = pick(req.query, PAGINATION_FIELD);

  const result = await StudentService.getAllStudent(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

// update student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated student',
    data: result,
  });
});

// delete student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.deleteStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});

export const StudentController = {
  updateStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
