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

interface OrderByFilterProps {
  value?: string;
  onChange: (value: string) => void;
}

const OrderByFilter = ({ value, onChange }: OrderByFilterProps) => {
  const handleChange = useCallback(
    (selectedValue: string) => {
      onChange(selectedValue);
    },
    [onChange]
  );

  const data = [
    { value: "updated_at", label: "Date de publication" },
    { value: "followers_desc", label: "Le plus populaire" },
    { value: "followers_asc", label: "Les plus aimés" },
    { value: "engagement_desc", label: "Les plus commentés" },
    { value: "engagement_asc", label: "Les plus partagés" },
    { value: "engagement_asc2", label: "Les plus vus" },
  ];

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-60 bg-white">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent className=" text-sm">
        <SelectGroup>
          <SelectLabel>Trier par</SelectLabel>
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
