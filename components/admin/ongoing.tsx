import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import React from "react";
import { getOngoingSabaq } from "@/actions/data-fetching";

const Ongoing = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return <h1>Loading...</h1>;
  }

  if (session?.user.role !== "ADMIN" && session?.user.role !== "SUPERADMIN") {
    return <h1>Unauthorised.</h1>;
  }
  const userId = session.user.id;

  const sabaqs = await getOngoingSabaq();
  return (
    <div>
      <ScrollArea className="max-h-72 h-fit min-w-[300px] max-w-[90vw] rounded-md border isolate aspect-video bg-white/50 shadow-lg ring-1 ring-black/5">
        {sabaqs.length > 0 ? (
          sabaqs.map((sabaq) => {
            return (
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Ongoing Sabaqs
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
              Ongoing Sabaqs
            </h4>
            <div className="text-sm">No ongoing sabaq.</div>
            <Separator className="my-2" />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Ongoing;
