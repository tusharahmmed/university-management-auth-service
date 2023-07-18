import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create
const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty',
  );
  return result;
};

// read
const getAllDepartments = async (): Promise<IAcademicDepartment[]> => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
};
