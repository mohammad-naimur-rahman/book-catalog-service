import { z } from 'zod';

const createBookZodValidation = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
  body: z.object({
    title: z.string().nonempty({
      message: 'Title is required',
    }),
    author: z.string().nonempty({
      message: 'Author is required',
    }),
    price: z.number({ required_error: 'Price is required' }),
    puoblicationDate: z.date({
      required_error: 'Puoblication date is required',
    }),
    categoryId: z.string().nonempty({
      message: 'Category Id is required',
    }),
  }),
});

const updateCategoryZodValidation = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    puoblicationDate: z.date().optional(),
    categoryId: z.string().nonempty().optional(),
  }),
});

export const BookValidation = {
  createBookZodValidation,
  updateCategoryZodValidation,
};
