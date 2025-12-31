"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import {
  TooltipProvider,
} from "../ui/tooltip";
// import { useLocale, useTranslations } from "next-intl";
// import { usePathname, useRouter } from "@/i18n/navigation";

const countries = [
  {
    name: "Français",
    code: "fr",
    flagUrl: "https://flagcdn.com/fr.svg",
  },
  {
    name: "English",
    code: "en",
    flagUrl: "https://flagcdn.com/gb.svg",
  },
];

const LanguageSwitcher = () => {
  //   const locale = useLocale();
  //   const pathname = usePathname();
  //   const router = useRouter();
  //   const currentCountry =
  //     countries.find((country) => country.code === locale) || countries[0];

  //   const switchLanguage = (countryCode: string) => {
  //     router.push(pathname, { locale: countryCode });
  //   };

  //   const t = useTranslations("sidebar");

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"icon"}
            className="rounded-full bg-white border border-main text-main hover:bg-gray-300/20 transition-colors duration-200 group"
          >
            <div
              className="h-6 w-6 bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url("https://flagcdn.com/gb.svg")` }}
            ></div>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          className="w-44 bg-white border border-gray-600 rounded-xl shadow-2xl p-0"
        >
          <div className="space-y-1">
            {countries.map((country) => (
              <div
                key={country.code}
                // onClick={() => switchLanguage(country.code)}
                className="flex items-center gap-3 px-5 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-300/20 cursor-pointer"
              >
                <div
                  className="h-6 w-6 bg-center bg-cover rounded-full"
                  style={{ backgroundImage: `url(${country.flagUrl})` }}
                ></div>
                <p className="text-sm font-medium">{country.name}</p>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;
