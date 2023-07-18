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

//update
router.patch(
  '/:id',
  validateZod(AcademicDepartmentValidation.update),
  AcademicDepartmentController.updateDepartment,
);

// read
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.get('/', AcademicDepartmentController.getAllDepartments);

export const AcademicDepartmentRoutes = router;
