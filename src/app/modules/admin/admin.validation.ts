import { z } from 'zod';
import { AdminConstant } from './admin.constant';

// Define the Zod schema for IName
const nameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateAdminZodSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    gender: z
      .enum([...AdminConstant.GENDER] as [string, ...string[]])
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum([...AdminConstant.BLOOD_GROUP] as [string, ...string[]])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    designation: z.string().optional(),
    managementDepartment: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
