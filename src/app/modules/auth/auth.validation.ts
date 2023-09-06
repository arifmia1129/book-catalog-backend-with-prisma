import { z } from "zod";

const userRole = ["customer", "admin"];

export const signupAuthValidation = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum([...userRole] as [string, ...string[]]),
    contactNo: z.string().min(1, { message: "Contact number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    profileImg: z.string().min(1, { message: "Profile image is required" }),
  }),
});
export const signinAuthValidation = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});
