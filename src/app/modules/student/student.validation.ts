import { z } from 'zod';
import { StudentConstant } from './student.constants';

const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last name is required' }),
      }),
      gender: z.enum([...StudentConstant.GENDER] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      email: z.string({ required_error: 'Email is required' }),
      contactNo: z.string({ required_error: 'Contact number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      bloodGroup: z
        .enum([...StudentConstant.BLOOD_GROUP] as [string, ...string[]])
        .optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father occapation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({ required_error: 'Mother name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother occapation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact number is required',
        }),
        address: z.string({ required_error: 'Guardian address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local guradian name is required' }),
        occupation: z.string({
          required_error: 'Local guradian occapation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guradian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guradian address number is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentZodSchema,
};
