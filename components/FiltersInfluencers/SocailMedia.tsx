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

const data = [
  {
    id: "cmeu1fbvg00010ljmmutxazz2",
    name: "Instagram",
    createdAt: "2025-08-27T13:55:42.936Z",
    updatedAt: "2025-08-27T13:55:42.936Z",
  },
  {
    id: "cmeu1k5gj00010lsiyss9dqpd",
    name: "Facebook",
    createdAt: "2025-08-27T13:59:27.902Z",
    updatedAt: "2025-08-27T13:59:27.902Z",
  },
  {
    id: "cmeu4hj0c00350lxw7ovsrv38",
    name: "Youtube",
    createdAt: "2025-08-27T15:21:24.345Z",
    updatedAt: "2025-08-27T15:21:24.345Z",
  },
  {
    id: "cmeu4hj0c00350lxw7ov3srv38",
    name: "Tiktok",
    createdAt: "2025-08-27T15:21:24.345Z",
    updatedAt: "2025-08-27T15:21:24.345Z",
  },
];

const CategoriesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("media") || "";

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("media", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="All Social Medias" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>All Social Medias</SelectLabel>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <div className="flex items-center gap-2">
                  <Image
                    src={`/media/${item.name.toLowerCase()}.png`}
                    alt={`/media/${item.name}.png`}
                    width={20}
                    height={20}
                  />
                  <span>{item.name}</span>
                </div>
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoriesFilter;
