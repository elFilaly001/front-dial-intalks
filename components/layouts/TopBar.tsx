"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import UserAvatar from "./UserAvatar";

const TopBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  
    <div
    style={{backgroundColor:"white"}}
      className={`z-10 bg-white flex sticky top-0 items-center justify-between border-b border-stroke px-4  md:px-5 2xl:px-10 ${
        isSticky
          ? "bg-[#fafafa]  border-gray-200 py-1"
          : "bg-[#fafafa] dark:bg-dark py-2"
      }`}
    >
      {/* Input Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-700 absolute right-5 top-1/2 bottom-1/2 -translate-y-1/2" />
        <Input
          placeholder={"Search for a brand"}
          className="border border-gray-200 min-w-[340px] h-auto p-3 px-5 rounded-xl"
        />
      </div>
      <div className="flex gap-5 items-center">
        <LanguageSwitcher />
        <UserAvatar />
      </div>
    </div>
  );
};

export default TopBar;
