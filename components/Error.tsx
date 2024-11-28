import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";

const Error = ({
  title,
  description,
  icon,
  footer,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
  icon?: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (
    <div>
      <Card className="bg-red-400 text-center w-fit max-w-[70vw] border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex flex-col items-center justify-center w-full text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <Separator className="mb-3 border-black text-black bg-black" />
        <CardContent>{description}</CardContent>
        <CardFooter>{footer}</CardFooter>
      </Card>
    </div>
  );
};

export default Error;
