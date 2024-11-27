import * as z from "zod";
export const LoginSchema = z.object({
  username: z
    .string()
    .min(8, { message: "ITS Number must be at least 8 digits" })
    .max(8, { message: "ITS Number must be at most 8 digits" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(8, { message: "ITS Number must be at least 8 digits" })
    .max(8, { message: "ITS Number must be at most 8 digits" }),
  password: z.string().min(6),
  email: z.string().email().min(1, { message: "Email is required" }),
  name: z.string().min(3, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
});
