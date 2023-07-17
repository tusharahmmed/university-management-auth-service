import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create
const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = AcademicFaculty.create(payload);

  return result;
};

// read
const getAllFaculty = async (): Promise<IAcademicFaculty[]> => {
  const result = await AcademicFaculty.find();

  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
};
