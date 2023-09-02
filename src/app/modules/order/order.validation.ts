import { z } from 'zod';

const createOrderZodSchema = z.object({
  headers: z.object({
    authorization: z.string().nonempty({
      message: 'Authorization is required',
    }),
  }),
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number(),
      })
    ),
  }),
});

export const OrderValidation = {
  createOrderZodSchema,
};
