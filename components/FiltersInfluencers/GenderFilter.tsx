"use client";

import React, { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const GenderFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("gender") || "";

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("gender", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const genders = [
    {
      label: "All",
      value: "0",
    },
    {
      label: "Male",
      value: "male",
      picture: "/icons/male.png",
    },
    {
      label: "Female",
      value: "female",
      picture: "/icons/female.png",
    },
  ];

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          {genders &&
            genders.length > 0 &&
            genders.map((gender) => (
              <SelectItem key={gender.value} value={gender.value}>
                {gender.picture && (
                  <Image
                    src={gender.picture}
                    alt={gender.label}
                    width={15}
                    height={15}
                  />
                )}
                {gender.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderFilter;
