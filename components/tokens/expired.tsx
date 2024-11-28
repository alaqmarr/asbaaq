import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateVerificationToken } from "@/lib/tokens";
import { Separator } from "../ui/separator";
import { FcExpired } from "react-icons/fc";
const ExpiredToken = ({
  email,
  token,
  expired,
}: {
  email: string;
  token: string;
  expired: Date;
}) => {
  return (
    <Card className="bg-red-400 text-center w-[300px]">
      <CardHeader>
        <CardTitle className="flex flex-col items-center justify-center w-full text-center">
          <div className="flex flex-row items-center gap-x-3 w-full">
            <FcExpired />
            <p>Verification Token Expired</p>
          </div>
        </CardTitle>
      </CardHeader>
      <Separator className="mb-3" />
      <CardContent>
        <p className="text-lg">
          The verification token you have used has expired.
          <br />
          <strong>Verification token is valid for 60 minutes.</strong>
        </p>
      </CardContent>
      <CardFooter>
        Expired on{" "}
        {new Date(expired).toDateString() +
          " at " +
          new Date(expired).toLocaleTimeString()}
      </CardFooter>
    </Card>
  );
};

export default ExpiredToken;
