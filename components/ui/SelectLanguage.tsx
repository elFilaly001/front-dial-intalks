import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./label";
import Image from "next/image";

const languages = [
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

const SelectLanguage = () => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="language-select" className="text-xs">
        Language
      </Label>
      <Select>
        <SelectTrigger id="language-select" className="w-full">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map((language) => (
              <SelectItem
                key={language.code}
                value={language.code}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <Image
                    src={language.flagUrl}
                    alt={`${language.name} flag`}
                    width={20}
                    height={15}
                    className="w-5 h-3.5 object-cover flex-shrink-0"
                  />
                  <span className="flex-1">{language.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectLanguage;