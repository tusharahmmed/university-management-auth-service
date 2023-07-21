/* eslint-disable no-useless-catch */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (student: IStudent, user: IUser) => {
  // set password
  if (!user.password) {
    user.password = config.defalt_student_pass as string;
  }
  // set role
  user.role = 'student';
  // get semester for creating id
  const academicSemester: IAcademicSemester | null =
    await AcademicSemester.findById(student.academicSemester);

  let newUserAllData = null;
  // initialize session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();
    // generate id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // create student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create student');
    }
    // add student id as ref into user
    user.student = newStudent[0]._id;

    // create user
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Fail to create user');
    }
    newUserAllData = newUser[0];

    // commit & end the session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    // if error abort & end session
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // query all populate data
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
};
