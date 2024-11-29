import {
  ChevronUp,
  User2,
} from "lucide-react";

import logo from "@/app/logo2.jpg"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export async function AppSidebar({ navItems }: { navItems: Array<any> }) {
  const session = await auth();
  if (!session || !session.user) {
    return <h1>Loading...</h1>;
  }
  return (
    <Sidebar>
      <SidebarContent className="lg:mt-16">
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-row gap-x-3 mt-3">
            <Image src={logo.src} alt="HSB Secunderabad" width={50} height={50} className="rounded-md"/>
            HSB Secunderabad
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel>Actions</SidebarGroupLabel>
                <SidebarGroupContent>
                  {navItems.map((navItem) => (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton asChild>
                        <Link href={navItem.url}>
                        {navItem.icon}
                        <span>{navItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session.user.id}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Button
                    variant={"destructive"}
                    className="w-full"
                    onClick={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
