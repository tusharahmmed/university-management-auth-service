import { Router } from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/accademicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = Router();

// module routes
const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
];

// use module routes
moduleRoutes.forEach(module => {
  router.use(module.path, module.route);
});

export const ApplicationRoutes = router;
