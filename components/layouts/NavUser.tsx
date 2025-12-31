"use client";

import {
  EllipsisVertical,
  CircleUser,
  CreditCard,
  MessageSquareDot,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { v1Api } from '@/services/axiosService';
import { useAuth } from "@/components/AuthGuard";
import { fetchImages } from "@/lib/fetchImages";
import { useSession } from "next-auth/react";

export function NavUser() {
  const [userData, setUserData] = useState<any>(null);
  const { isMobile, lockOpen, unlockOpen, state } = useSidebar();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: session } = useSession();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      lockOpen()
    } else {
      unlockOpen()
    }
  }

  useEffect(() => {
    // If next-auth session exists we rely on it; otherwise try to fetch profile using stored token
    if (session && session.user) {
      return;
    }

    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const getProfile = async () => {
      try {
        const res = await v1Api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.user);
      } catch (err) {
        console.debug("Failed to fetch profile:", err);
        setUserData(null);
      }
    };

    getProfile();
  }, [session]);

  const handleLogout = async () => {
    // Front-only logout: clear client token and session
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        await signOut({ redirect: false });
      }
    } catch (e) {
      // ignore
    }
    try {
    } catch (e) {
      // ignore
    }

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {isAuthenticated ? (
          <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={fetchImages(session?.user?.image ?? "")} alt={session?.user?.name ?? ""} />
                  <AvatarFallback className="rounded-lg">M</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session?.user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userData?.email}
                  </span>
                </div>
                <EllipsisVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={"/massinart.jpg"} alt={"Massinart"} />
                    <AvatarFallback className="rounded-lg">G</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{session?.user?.name ?? ""}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {session?.user?.email ?? ""}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2">
                    <CircleUser />
                    Compte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Facturation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquareDot />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy />
                  Support
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left">
                  <LogOut />
                  Déconnexion
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // When sidebar is collapsed, show only an icon with reduced left margin.
          state === "collapsed" ? (
            <div className="p-1 w-full flex items-center justify-center bg-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/login')}
                className="p-0  "
              >
                <CircleUser />
              </Button>
            </div>
          ) : (
            <div className="p-3 w-full">
              <Button onClick={() => router.push('/login')} className="w-full justify-center  ">
                Se connecter
              </Button>
            </div>
          )
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
