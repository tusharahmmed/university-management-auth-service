import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await StudentService.createStudent(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully created student',
    data: result,
  });
});
const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getAllStudent();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});
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

export const StudentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
