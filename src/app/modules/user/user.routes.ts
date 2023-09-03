import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.get(
  '/',
  validateRequest(UserValidation.getAllUsersZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers
);

router.get(
  '/profile',
  validateRequest(UserValidation.getAllUsersZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  UserController.getUserProfile
);

router
  .route('/:id')
  .get(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
    UserController.getUserById
  )
  .patch(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateUser
  )
  .delete(
    validateRequest(UserValidation.getOrDeleteUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.deleteUser
  );

router.patch(
  '/make-admin/:id',
  validateRequest(UserValidation.getOrDeleteUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.makeAdmin
);

export const UserRoutes = router;
