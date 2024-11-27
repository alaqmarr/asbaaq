"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedCredentials = RegisterSchema.safeParse(values);
  if (!validatedCredentials.success) {
    return { error: "Invalid Fields." };
  }
  const { username, password, email, phone, name } = validatedCredentials.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.findUnique({
    where: {
      id: username,
    },
  });

  if (user) {
    return { error: "ITS Number already used by another account." };
  }
  await db.user.create({
    data: {
      id: username,
      ITS: username,
      password: hashedPassword,
      email,
      phone,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "Account registration successful. A verification email has been sent.",
  };
};
