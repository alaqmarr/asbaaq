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

export const SabaqSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  admins: z.array(z.string()),
  nisaab: z.string().min(3, { message: "Nisaab is required" }),
  mode: z.string().min(3, { message: "Mode is required" }),
  startTime: z.string().min(3, { message: "Start Time is required" }),
  startDate: z.date().min(new Date(), { message: "Start Date is required" }),
  time: z.string().min(3, { message: "Time is required" }),
  endTime: z.string().min(3, { message: "End Time is required" }),
  padhawnaar: z.string().min(3, { message: "Padhawnaar is required" }),
});
