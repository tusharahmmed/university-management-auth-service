import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create
const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = AcademicFaculty.create(payload);

  return result;
};

export const AcademicFacultyService = {
  createFaculty,
};
