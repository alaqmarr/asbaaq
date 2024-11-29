import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminNav = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <h1>Loading...</h1>;
  }
  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 bg-blue-400 shadow-md flex items-center justify-between sm:px-5 md:px-5">
      <div className="p-5">
        <SidebarTrigger variant={"secondary"} />
      </div>
      <div className="flex p-5 items-center align-middle gap-x-2">
        <p>Hello, {session.user.name}.</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={
                  session.user.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={session.user.id}
              />
              <AvatarFallback>
                {session.user.name?.split("").slice(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-6">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span
                onClick={async () => {
                  "use server";
                  await signOut();
                }}
              >
                Log out
              </span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default AdminNav;
