import { BadgeCheck, CreditCard, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function UserNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={"/glovo.png"} alt={"glovo"} />
          <AvatarFallback className="rounded-lg">G</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 space-y-1 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem
          className={cn("p-0 bg-accent/50 border-l-primary border-l-2")}
          //   onClick={() => setActiveUser(user)}
        >
          <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={"/glovo.png"} alt={"glovo "} />
              <AvatarFallback className="rounded-lg">G</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Glovo Maroc</span>
              <span className="text-muted-foreground truncate text-xs">
                glovo@in-talks.ma
              </span>
            </div>
          </div>
        </DropdownMenuItem>

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
