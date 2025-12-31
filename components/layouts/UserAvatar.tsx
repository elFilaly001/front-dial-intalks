import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Link from "next/link";
const UserAvatar = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 p-2 rounded-md border border-gray-200 hover:bg-gray-300/20">
          <Image
            src="/logo.webp"
            alt="Avatar"
            width={45}
            height={45}
            className="rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold text-sm text-gray-600">Zak MOUCHTATI</p>
            <p className="text-gray-600 text-sm">zak@inTalks.ai</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 bg-white -900 text-black rounded-lg shadow-md">
        <div className="p-3 flex items-center gap-3 border-b border-gray-300">
          <Image
            src="/logo.webp"
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">Zak MOUCHTATI</p>
            <p className="text-gray-600 text-sm">johnson@nextadmin.com</p>
          </div>
        </div>
        <div className="py-2 text-black">
          <Link
            href={"#"}
            className="flex items-center gap-3 p-3 w-full text-left  hover:bg-gray-200/40 rounded-md"
          >
            <User className="w-5 h-5 text-gray-600" />
            Profil
          </Link>
          <Link
            href={"/settings"}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-200/40 rounded-md"
          >
            <Settings className="w-5 h-5 text-gray-600" />
            Paramètres
          </Link>
        </div>
        <Link
          href={"/login"}
          className="flex items-center gap-3 p-3 w-full text-left text-red-500  hover:bg-gray-200/40 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
