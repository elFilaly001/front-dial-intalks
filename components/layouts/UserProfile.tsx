import { Crown, User, LogOut, ChevronDown, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Types
type UserRole = "owner" | "member";

interface UserData {
    name: string;
    email: string;
    avatar?: string;
    role: UserRole;
}

interface UserProfileProps {
    user?: UserData;
    showRole?: boolean;
    className?: string;
    onDisconnect?: () => void;
}

// Role configuration for extensibility
const ROLE_CONFIG: Record<UserRole, {
    icon: typeof Crown | typeof User;
    label: string;
    styles: string;
}> = {
    owner: {
        icon: Crown,
        label: "Propriétaire",
        styles: "bg-amber-500 hover:bg-amber-600 text-white border-amber-400",
    },
    member: {
        icon: User,
        label: "Membre",
        styles: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
    },
};

// Default user - replace with actual user data from your auth context/store
const DEFAULT_USER: UserData = {
    name: "John Doe",
    email: "john.doe@in-talks.ma",
    avatar: "/auth/user-avatar.png",
    role: "owner",
};

/**
 * Generates initials from a full name
 */
function getInitials(name: string): string {
    return name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

/**
 * UserProfile Component
 * Displays user avatar with dropdown menu for account actions
 */
function UserProfile({
    user = DEFAULT_USER,
    showRole = true,
    className,
    onDisconnect
}: UserProfileProps) {
    const roleConfig = ROLE_CONFIG[user.role];
    const RoleIcon = roleConfig.icon;

    const handleDisconnect = () => {
        if (onDisconnect) {
            onDisconnect();
        } else {
            // Default disconnect behavior - replace with your auth logic
            console.log("Déconnexion...");
            // router.push('/login');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-2 px-2 py-1 rounded-lg transition-colors",
                        "hover:bg-slate-100 focus:outline-none focus-visible:outline-none",
                        "cursor-pointer border-none outline-none ring-0",
                        className
                    )}
                >
                    <Avatar className="size-8 border-none">
                        <AvatarImage
                            src={user.avatar}
                            alt={`${user.name}'s avatar`}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs border-none">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[160px] truncate">
                        {user.name}
                    </span>
                    <ChevronDown className="size-3.5 text-slate-500 hidden md:block" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
                {/* User Info Header */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 py-1">
                        <Avatar className="size-9 ring-1 ring-slate-200">
                            <AvatarImage
                                src={user.avatar}
                                alt={user.name}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold text-sm">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-sm font-medium text-slate-900 truncate">
                                {user.name}
                            </span>
                            <span className="text-xs text-slate-500 truncate">
                                {user.email}
                            </span>
                            {showRole && (
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        "text-[9px] font-medium px-1.5 py-0 h-4 w-fit",
                                        "flex items-center gap-1 rounded-md mt-0.5",
                                        roleConfig.styles
                                    )}
                                >
                                    <RoleIcon className="size-2" />
                                    <span>{roleConfig.label}</span>
                                </Badge>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => window.location.href = '/account'}
                >
                    <Settings className="size-4 text-slate-500" />
                    <span>Paramètres du compte</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Disconnect */}
                <DropdownMenuItem
                    className="cursor-pointer gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={handleDisconnect}
                >
                    <LogOut className="size-4" />
                    <span>Se déconnecter</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserProfile;
