import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = Router();

// update
router.patch(
  '/:id',
  validateZod(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin,
);

// read
router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;
