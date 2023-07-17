import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyZodSchema } from './academicFaculty.validatio';

const router = Router();

// create
router.post(
  '/create-faculty',
  validateZod(AcademicFacultyZodSchema.createSchema),
  AcademicFacultyController.createFaculty,
);
// update
router.patch(
  '/:id',
  validateZod(AcademicFacultyZodSchema.updateSchema),
  AcademicFacultyController.updateFaculty,
);
// delete
router.delete('/:id', AcademicFacultyController.deleteFaculty);
// read
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
