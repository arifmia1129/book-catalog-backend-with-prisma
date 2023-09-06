import { z } from "zod";

const userRole = ["customer", "admin"];

export const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum([...userRole] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});
