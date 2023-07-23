import { z } from 'zod';
import { FacultyConstant } from './faculty.constants';

// Define the Zod schema for IName
const nameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Define the Zod schema for IFaculty
const facultyUpdateZodSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    bloodGroup: z
      .enum([...FacultyConstant.BLOOD_GROUP] as [string, ...string[]])
      .optional(),
    designation: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const FacultyValidation = {
  facultyUpdateZodSchema,
};
