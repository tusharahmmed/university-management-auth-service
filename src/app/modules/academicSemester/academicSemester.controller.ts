import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

// create semester
const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.createSemester(req?.body);

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully created semester',
      data: result,
    });

    next();
  },
);

// get all semesters
const getAllSemesters: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // pagination
    const paginationOptions = pick(req.query, PAGINATION_FIELD);

    const result = await AcademicSemesterService.getAllSemesters(
      paginationOptions,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  },
);

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
};
