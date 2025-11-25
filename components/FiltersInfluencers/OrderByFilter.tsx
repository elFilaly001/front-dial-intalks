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

const OrderByFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("orderBy") || undefined;

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("orderBy", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const data = [
    { value: "updated_at", label: "Most popular" },
    { value: "followers_desc", label: "Publication date" },
    { value: "followers_asc", label: "Most liked" },
    { value: "engagement_desc", label: "Most commented" },
    { value: "engagement_asc", label: "Most shared" },
    { value: "engagement_asc2", label: "Most viewed" },
  ];

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-60 bg-white">
        <SelectValue placeholder="Order By" />
      </SelectTrigger>
      <SelectContent className=" text-sm">
        <SelectGroup>
          <SelectLabel>Order By</SelectLabel>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderByFilter;
