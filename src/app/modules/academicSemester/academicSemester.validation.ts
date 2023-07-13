import { z } from 'zod';
import { AcademicConstant } from './academicSemester.constant';

export const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicConstant.TITLES] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z
      .number({
        required_error: 'Year is required',
      })
      .min(2000, 'Year must be greater than 1999')
      .max(2099, 'Year must be smaller than 2099'),
    code: z.enum([...AcademicConstant.CODES] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum(
      [...AcademicConstant.SEMESTER_MONTHS] as [string, ...string[]],
      {
        required_error: 'Start month is required',
      },
    ),
    endMonth: z.enum(
      [...AcademicConstant.SEMESTER_MONTHS] as [string, ...string[]],
      {
        required_error: 'End month is required',
      },
    ),
  }),
});

export default academicSemesterZodSchema;
