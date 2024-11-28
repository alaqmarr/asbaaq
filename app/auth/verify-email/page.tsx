import Error from "@/components/Error";
import { db } from "@/lib/db";
import { TimerOffIcon, XCircleIcon } from "lucide-react";
import React from "react";

const EmailVerification = async ({ searchParams }: { searchParams: any }) => {
  const { token } = await searchParams;
  const currentDateTime = new Date(new Date().getTime());
  const checkToken = await db.verificationToken.findFirst({
    where: {
      token: token,
    },
  });

  if (!checkToken) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
      <Error
        title={
          <div className="flex flex-row items-center justify-center gap-x-3 w-full text-center text-red-700 font-bold">
            <XCircleIcon className="h-8 w-8" />
            <p>Invalid Verification Code!</p>
          </div>
        }
        description={
          <p className="text-lg">
            The verification token you have used is invalid. Please request a new code from your profile settings.
            <br />
            <strong>
              Make sure you have followed the correct steps to verify your email.
            </strong>
          </p>
        }
        footer={
          <code className="font-bold">
            ERROR CODE : INVALID_VERIFICATION_CODE
          </code>
        }
      />
    </main>
    );
  }

  if (checkToken.expires < currentDateTime) {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
      <Error
        title={
          <div className="flex flex-row items-center justify-center gap-x-3 w-full text-center text-red-700 font-bold">
            <TimerOffIcon className="h-8 w-8" />
            <p>Expired Verification Code!</p>
          </div>
        }
        description={
          <p className="text-lg">
            The verification token you have used has expired. Please request a new code from your profile settings.
            <br />
            <strong>
              Verification token lasts upto 60 minutes.
            </strong>
          </p>
        }
        footer={
          <code className="font-bold w-full items-center justify-center">
            ERROR CODE : VERIFICATION_CODE_EXPIRED
            <br/>
            EXPIRED ON {new Date(checkToken.expires).toDateString() + " at " + new Date(checkToken.expires).toLocaleTimeString()}
          </code>
        }
      />
    </main>
    );
  }
  return (
    <div>
      <h1>{searchParams.token}</h1>
    </div>
  );
};

export default EmailVerification;
