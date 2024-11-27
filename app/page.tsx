import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/loginButton";
import { auth, signOut } from "@/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
const Home = async () => {
  const session = await auth();
  return (
    <main
      className={cn(
        "flex flex-col h-full items-center justify-center",
        poppins.className
      )}
    >
      <div className="gap-y-6 text-center">
        <h1 className="text-6xl text-bold text-white drop-shadow-md">Auth</h1>
        <p className="text-white text-lg">Simple Authentication workflow</p>
      </div>
      {session ? (
        <form action={async () => {
          "use server"
          await signOut();
        }}>
          <Button variant={"destructive"} type="submit">Sign Out</Button>
        </form>
      ) : (
        <LoginButton>
          <Button variant={"secondary"}>Sign In</Button>
        </LoginButton>
      )}
    </main>
  );
};

export default Home;
