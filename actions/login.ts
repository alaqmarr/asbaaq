"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { AuthError } from "next-auth";
import { verifyID } from "@/lib/validations";
import { error } from "console";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(values);
  if (!validatedCredentials.success) {
    return { error: "Invalid Fields." };
  }
  const { username, password } = validatedCredentials.data;

  const getUser = await verifyID(username);

  if (!getUser || !getUser.email || !getUser.password) {
    return { error: "Unable to login" };
  }
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "AccessDenied":
          return { error: "Access Denied." };
        case "CredentialsSignin":
          return { error: "Invalid Credentials." };
        case "UntrustedHost":
          return { error: "Untrusted Host." };
        case "UnknownAction":
          return { error: "Unknown Action." };
        default:
          return { error: "Unknown Error." };
      }
    }
    throw error;
  }
};
