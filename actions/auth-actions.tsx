"use server"
import { signOut } from "@/auth";

export const serverSignout = async () => {
  await signOut();
};
