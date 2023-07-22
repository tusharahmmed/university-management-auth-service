import { z } from 'zod';
import { StudentConstant } from './student.constants';

const updateStudentZodSchema = z.object({
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  gender: z
    .enum([...StudentConstant.GENDER] as [string, ...string[]])
    .optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  bloodGroup: z
    .enum([...StudentConstant.BLOOD_GROUP] as [string, ...string[]])
    .optional(),
  guardian: z
    .object({
      fatherName: z.string().optional(),
      fatherOccupation: z.string().optional(),
      fatherContactNo: z.string().optional(),
      motherName: z.string().optional(),
      motherOccupation: z.string().optional(),
      motherContactNo: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  localGuardian: z
    .object({
      name: z.string().optional(),
      occupation: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  profileImage: z.string().optional(),
});

export const StudentValidation = {
  updateStudentZodSchema,
};
