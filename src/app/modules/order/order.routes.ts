import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

router.get(
  '/',
  validateRequest(OrderValidation.getOrdersZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOER),
  OrderController.getAllORders
);

router.post(
  '/create-order',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.CUSTOER),
  OrderController.createOrder
);

router.get(
  '/:id',
  validateRequest(OrderValidation.getOrdersZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOER),
  OrderController.getSingleOrder
);

export const OrderRoutes = router;
