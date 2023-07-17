import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { FacultyConstants } from './academicFaculty.constants';
import { AcademicFacultyService } from './academicFaculty.service';

// create
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.createFaculty(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});

// read
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // filters
  const filters = pick(req.query, FacultyConstants.FILTERS_FIELD);

  // pagination
  const paginationOptions = pick(req.query, PAGINATION_FIELD);

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
};
