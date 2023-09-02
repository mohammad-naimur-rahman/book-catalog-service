"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({
            message: 'Invalid email',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const signupZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty({ message: 'Name is required' }),
        email: zod_1.z.string().email({
            message: 'Email is required',
        }),
        password: zod_1.z.string().min(4, { message: 'Password is too short' }),
        role: zod_1.z.enum(['ADMIN', 'CUSTOMER']).default('CUSTOMER'),
        contactNo: zod_1.z.string().min(9, { message: 'Contact number is required' }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        profileImg: zod_1.z.string().optional(),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
    signupZodSchema,
    refreshTokenZodSchema,
};
