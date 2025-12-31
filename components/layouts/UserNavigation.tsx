import { BadgeCheck, CreditCard, LogOut, Crown, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock user data - replace with actual user data from your auth context/store
const user = {
  name: "Glovo Maroc",
  email: "glovo.maroc.admin@in-talks.ma",
  avatar: "/glovo.png",
  role: "owner" as "owner" | "member",
};

function UserNavigation() {
  const isOwner = user.role === "owner";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition-colors focus:outline-none">
          <Avatar className="size-9 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-left">
            <span className="text-sm font-medium text-gray-900 max-w-[180px] truncate">
              {user.email}
            </span>
            <Badge
              variant={isOwner ? "default" : "secondary"}
              className={cn(
                "text-[10px] px-1.5 py-0 h-4 flex items-center gap-1",
                isOwner
                  ? "bg-amber-500 hover:bg-amber-500 text-white"
                  : "bg-gray-200 hover:bg-gray-200 text-gray-700"
              )}
            >
              {isOwner ? (
                <>
                  <Crown className="size-2.5" />
                  Owner
                </>
              ) : (
                <>
                  <User className="size-2.5" />
                  Member
                </>
              )}
            </Badge>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-72 space-y-1 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0">
          <div className="flex w-full items-start gap-3 px-3 py-3 bg-accent/30 rounded-t-lg">
            <Avatar className="h-12 w-12 rounded-lg border-2 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-semibold text-sm">{user.name}</span>
              <span className="text-muted-foreground text-xs break-all">
                {user.email}
              </span>
              <Badge
                variant={isOwner ? "default" : "secondary"}
                className={cn(
                  "mt-1.5 w-fit text-xs px-2 py-0.5 flex items-center gap-1",
                  isOwner
                    ? "bg-amber-500 hover:bg-amber-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                )}
              >
                {isOwner ? (
                  <>
                    <Crown className="size-3" />
                    Owner
                  </>
                ) : (
                  <>
                    <User className="size-3" />
                    Member
                  </>
                )}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Compte
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Facturation
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNavigation;
