import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById)
  .patch(auth(ENUM_USER_ROLE.ADMIN), UserController.updateUser)
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.patch(
  '/make-admin/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.makeAdmin
);

export const UserRoutes = router;
