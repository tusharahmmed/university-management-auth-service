import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './accademicDepartment.validation';

const router = Router();

// create
router.post(
  '/create-department',
  validateZod(AcademicDepartmentValidation.create),
  AcademicDepartmentController.createDepartment,
);

// read
router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
