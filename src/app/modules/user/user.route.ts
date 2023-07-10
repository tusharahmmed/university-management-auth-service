import { Router } from 'express';
import { UserController } from './user.Controller';

const router = Router();

router.post('/create-user', UserController.createUser);

export const UserRoutes = router;
