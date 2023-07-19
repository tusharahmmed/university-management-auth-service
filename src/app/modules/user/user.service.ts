import config from '../../../config';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { IUser } from './user.interface';
import User from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const semester: IAcademicSemester = {
    title: 'Fall',
    year: '2025',
    code: '02',
    startMonth: 'September',
    endMonth: 'December',
  };

  // auto generated incremental id
  let id = '';
  if (user.role === 'student') {
    id = await generateStudentId(semester);
  } else {
    id = await generateFacultyId();
  }
  user.id = id;

  // default password
  if (!user.password) {
    user.password = config.defalt_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('Failed to create user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
