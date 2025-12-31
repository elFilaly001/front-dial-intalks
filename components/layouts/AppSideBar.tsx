"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarItems } from "./sidebar-items";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import Image from "next/image";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AppSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpen, isMobile, openMobile } = useSidebar();

  // On mobile, show full logo when sheet is open; on desktop, use state
  const showFullLogo = isMobile ? openMobile : state === "expanded";

  return (
    <Sidebar
      {...props}
      onMouseEnter={() => setOpen?.(true)}
      onMouseLeave={() => setOpen?.(false)}
    >
      <div className="h-[60px] flex items-center overflow-hidden transition-all duration-300">
        {showFullLogo ? (
          <Image
            src={"/logo.webp"}
            className="p-2 transition-all duration-300"
            alt="Logo"
            width={140}
            height={85}
          />
        ) : (
          <Image
            src={"/icons/IN-TALKS-logo.png-2.webp"}
            className="py-2 ml-2 transition-all duration-300"
            alt="Logo"
            width={40}
            height={40}
          />
        )}
      </div>
      <SidebarContent>
        <NavMain items={sidebarItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
