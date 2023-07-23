import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

// studen id

const findLastStudentId = async (): Promise<string | undefined> => {
  const student = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return student?.id?.substring(4);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const lastId: string =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  // incremented id
  let incrementedId = (parseInt(lastId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(
    2,
  )}${academicSemester?.code}${incrementedId}`;

  return incrementedId;
};

// faculty id

const findLastFacultyID = async (): Promise<string | undefined> => {
  const faculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return faculty?.id?.substring(2);
};

export const generateFacultyId = async () => {
  const lastId = (await findLastFacultyID()) || (0).toString().padStart(5, '0');

  // incremented id
  let incrementedId = (parseInt(lastId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
