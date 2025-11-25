"use client";

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

const PageSize = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("pageSize") || "12"; // default value

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("pageSize", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const data = [
    { value: "9", label: "9" },
    { value: "12", label: "12" },
    { value: "24", label: "24" },
  ];

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-[70px]">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Size</SelectLabel>
          {data.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PageSize;
