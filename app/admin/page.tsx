import React from "react";
import { auth } from "@/auth";
import AssignedSabaq from "@/components/admin/sabaqs";
import Ongoing from "@/components/admin/ongoing";
import Completed from "@/components/admin/completed";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
})

const AdminHomePage = async () => {
  const session = await auth();
  if(!session || !session.user){
    return <h1>Loading...</h1>
  }

  return (
    <main className={cn("flex flex-col w-full justify-center items-center p-10 gap-y-6", poppins.className)}>
      <div className="w-full">
      <p className="text-3xl font-bold">The site is currently under active development. Please report bugs and errors.</p>
      </div>
      <div className="w-full grid gap-y-3 items-center justify-evenly sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <AssignedSabaq />
      <Ongoing/>
      <Completed/>
    </div>
    <div>
    </div>
    </main>
  );
};

export default AdminHomePage;
