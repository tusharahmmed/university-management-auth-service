import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { AcademicConstant } from './academicSemester.constant';
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
    // filters
    const filters = pick(req.query, AcademicConstant.FILTERS_FIELD);
    // pagination
    const paginationOptions = pick(req.query, PAGINATION_FIELD);

    const result = await AcademicSemesterService.getAllSemesters(
      filters,
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

// get single semester
const getSingleSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = pick(req.params, ['id']);
    const result = await AcademicSemesterService.getSingleSemester(
      id as string,
    );

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters retrieved successfully',
      data: result,
    });

    next();
  },
);
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
};
