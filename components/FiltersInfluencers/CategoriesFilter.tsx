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

const data = [
  {
    id: "cmeu1fbvg00010ljmmutxazz2",
    name: "Digital creator",
    createdAt: "2025-08-27T13:55:42.936Z",
    updatedAt: "2025-08-27T13:55:42.936Z",
  },
  {
    id: "cmeu1k5gj00010lsiyss9dqpd",
    name: "Artist",
    createdAt: "2025-08-27T13:59:27.902Z",
    updatedAt: "2025-08-27T13:59:27.902Z",
  },
  {
    id: "cmeu4hj0c00350lxw7ovsrv38",
    name: "Personal blog",
    createdAt: "2025-08-27T15:21:24.345Z",
    updatedAt: "2025-08-27T15:21:24.345Z",
  },
  {
    id: "cmeu4xzc8006a0lxwtoho3wyr",
    name: "Public figure",
    createdAt: "2025-08-27T15:34:11.980Z",
    updatedAt: "2025-08-27T15:34:11.980Z",
  },
  {
    id: "cmeujpw6v0057kra6vcepwfq5",
    name: "Actor",
    createdAt: "2025-08-27T22:27:48.915Z",
    updatedAt: "2025-08-27T22:27:48.915Z",
  },
  {
    id: "cmf14hiek00010lt53bppmw26",
    name: "Blogger",
    createdAt: "2025-09-01T12:55:46.790Z",
    updatedAt: "2025-09-01T12:55:46.790Z",
  },
  {
    id: "cmf2miki500010ly9cnftemiy",
    name: "Entrepreneur",
    createdAt: "2025-09-02T14:08:15.433Z",
    updatedAt: "2025-09-02T14:08:15.433Z",
  },
  {
    id: "cmf71tk3g0001ktjwhgqvuet8",
    name: "Tutor/Teacher",
    createdAt: "2025-09-05T16:27:47.068Z",
    updatedAt: "2025-09-05T16:27:47.068Z",
  },
  {
    id: "cmfb2e1i90003ktjv5hlztqdz",
    name: "Tourist Information Center",
    createdAt: "2025-09-08T11:54:47.453Z",
    updatedAt: "2025-09-08T11:54:47.453Z",
  },
  {
    id: "cmfpswgtp00aw0lf3smyu3yps",
    name: "Community",
    createdAt: "2025-09-18T19:25:43.574Z",
    updatedAt: "2025-09-18T19:25:43.574Z",
  },
  {
    id: "cmfptiit400pu0lf3bkgtiay1",
    name: "Journalist",
    createdAt: "2025-09-18T19:42:52.597Z",
    updatedAt: "2025-09-18T19:42:52.597Z",
  },
  {
    id: "cmg7988jz0002krmtp655in2p",
    name: "Cars",
    createdAt: "2025-10-01T00:34:51.592Z",
    updatedAt: "2025-10-01T00:34:51.592Z",
  },
  {
    id: "cmhjwf11y0000kqz0qgcp56si",
    name: "Product/service",
    createdAt: "2025-11-04T01:36:56.078Z",
    updatedAt: "2025-11-04T01:36:56.078Z",
  },
];

const CategoriesFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("categories") || "";

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("categories", value);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoriesFilter;
