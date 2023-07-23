import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { FacultyConstant } from './faculty.constants';
import { FacultyService } from './faculty.service';

// get all faculty
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // filters
  const filters = pick(req.query, FacultyConstant.FILTERS_FIELD);

  // pagination
  const paginationOptions = pick(req.query, PAGINATION_FIELD);

  const result = await FacultyService.getAllFaculty(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single faculty
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacultyService.getSingleFaculty(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

// update faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await FacultyService.updateFaculty(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
