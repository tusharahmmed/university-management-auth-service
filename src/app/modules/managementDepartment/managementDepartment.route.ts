import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = Router();

router.post(
  '/create-management',
  validateZod(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.createManagementDepartment,
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment,
);

router.patch(
  '/:id',
  validateZod(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema,
  ),
  ManagementDepartmentController.updateManagementDepartment,
);

export const ManagementDepartmentRoutes = router;
