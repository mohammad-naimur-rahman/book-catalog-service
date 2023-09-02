import { z } from 'zod';

const createOrUpdateCategoryZodSchema = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
  }),
});

const deleteCategoryZodSchema = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
});

export const CategoryValidation = {
  createOrUpdateCategoryZodSchema,
  deleteCategoryZodSchema,
};
