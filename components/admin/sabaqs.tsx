import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import React from "react";

const AssignedSabaq = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return <h1>Loading...</h1>;
  }

  if (session?.user.role !== "ADMIN" && session?.user.role !== "SUPERADMIN") {
    return <h1>Unauthorised.</h1>;
  }
  const userId = session.user.id;

  const sabaqs = await db.sabaq.findMany({
    where: {
      admins: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      nisaab: true,
      time: true,
      total_enrollments: true,
      mode: true,
      startTime: true,
      endTime: true,
      status: true,
    },
  });

  return (
    <div>
      <ScrollArea className="h-72 w-[250px] rounded-md border isolate aspect-video bg-white/50 shadow-lg ring-1 ring-black/5">
        {sabaqs.length > 0 ? (
          sabaqs.map((sabaq) => {
            return (
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Assigned Sabaqs
                </h4>
                <>
                  <div key={sabaq.id} className="text-sm">
                    {`${sabaq.name} | ${sabaq.nisaab}`}
                  </div>
                  <Separator className="my-2" />
                </>
              </div>
            );
          })
        ) : (
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Assigned Sabaqs
            </h4>
            <div className="text-sm">No sabaq assigned to you.</div>
            <Separator className="my-2" />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AssignedSabaq;
