"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => {}}
        className="w-full"
      >
        <FcGoogle />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        onClick={() => {}}
        className="w-full"
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
