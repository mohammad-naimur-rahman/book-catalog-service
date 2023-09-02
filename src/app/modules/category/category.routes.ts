import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = Router();

router.post(
  '/create-category',
  validateRequest(CategoryValidation.createOrUpdateCategoryZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
);

router.get('/', CategoryController.getAllCategories);

router
  .route('/:id')
  .get(CategoryController.getSingleCategory)
  .patch(
    validateRequest(CategoryValidation.createOrUpdateCategoryZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.updateCategory
  )
  .delete(
    validateRequest(CategoryValidation.deleteCategoryZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    CategoryController.deleteCategory
  );

export const CategoryRoutes = router;
