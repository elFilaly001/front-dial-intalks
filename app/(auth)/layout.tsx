import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid grid-cols-5 h-screen">
        <div className="col-span-3 bg-gradient flex justify-center items-center">
          <Image src={"/login.webp"} alt="Login" width={550} height={550} />
        </div>
        <div className="gap-5 col-span-2 h-full flex flex-col justify-center overflow-y-scroll">
          <div className=" absolute top-5 right-5">
            <LanguageSwitcher />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
