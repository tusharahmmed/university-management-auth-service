import { Router } from 'express';
import usersController from './usersController';

const router = Router();

router.post('/create-user', usersController.createUser);

export default router;
