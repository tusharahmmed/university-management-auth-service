import { z } from 'zod';
import { AcademicConstant } from './academicSemester.constant';

const createSchema = z.object({
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

const updateSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicConstant.TITLES] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .number({
          required_error: 'Year is required',
        })
        .min(2000, 'Year must be greater than 1999')
        .max(2099, 'Year must be smaller than 2099')
        .optional(),
      code: z
        .enum([...AcademicConstant.CODES] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicConstant.SEMESTER_MONTHS] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicConstant.SEMESTER_MONTHS] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'Either both title and code should be provided or neither' },
  );

export const SemesterValidationSchema = {
  createSchema,
  updateSchema,
};
