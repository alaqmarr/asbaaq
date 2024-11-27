import React from "react";

interface HeaderProps {
  headerLabel: string;
}

const Header = ({ headerLabel }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-3xl font-semibold">Authentication</h1>
      <p>{headerLabel}</p>
    </div>
  );
};

export default Header;
