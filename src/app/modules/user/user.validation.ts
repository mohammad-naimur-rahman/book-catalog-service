import { z } from 'zod';

const getOrDeleteUserZodSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

const updateUserZodSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    role: z.enum(['ADMIN', 'CUSTOMER']).default('CUSTOMER').optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  getOrDeleteUserZodSchema,
  updateUserZodSchema,
};
