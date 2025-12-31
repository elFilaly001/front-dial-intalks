"use client";

import { ChevronDown } from "lucide-react";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-sm w-[150px] flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 bg-dark hover:bg-gray-200/50 transition-colors duration-200 group">
          <div
            className="h-6 w-6 bg-center bg-cover rounded-full"
            style={{ backgroundImage: `url("https://flagcdn.com/fr.svg")` }}
          ></div>
          <span className="font-medium text-gray-600">Français</span>
          <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-44 -800 border border-gray-200 rounded-xl shadow-2xl p-0"
      >
        <div className="space-y-1">
          {countries.map((country) => (
            <div
              key={country.code}
              //   onClick={() => switchLanguage(country.code)}
              className="flex items-center gap-3 px-5 py-2 rounded-lg transition-colors duration-200 hover:bg- cursor-pointer"
            >
              <div
                className="h-6 w-6 bg-center bg-cover rounded-full"
                style={{ backgroundImage: `url(${country.flagUrl})` }}
              ></div>
              <p className="text-sm font-medium text-gray-700">
                {country.name}
              </p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;
