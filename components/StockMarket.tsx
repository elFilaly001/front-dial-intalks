/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ranking from "@/data/ranking.json";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { TrendingUp } from "lucide-react";
import Marquee from "react-fast-marquee";
const StockMarket = () => {
  const [data, setData] = useState<any[]>();
  useEffect(() => {
    setData(ranking.influencers);
  }, []);

  return (
    <div className="">
      <Marquee className="grid grid-cols-5 gap-5">
        {data?.map((item) => (
          <div
            key={item._id}
            className="p-0.5 mx-2 rounded-md bg-linear-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]"
          >
            <div className="w-full h-full bg-white rounded-lg flex flex-col gap-5 p-5 items-start justify-center relative">
              <div className="flex items-center gap-5">
                <div
                  className="rounded-full mx-auto w-12 h-12 bg-contain p-0.5"
                  style={{
                    backgroundImage: `url(${item.picture_url})`,
                  }}
                ></div>
                <div className="flex flex-col flex-1">
                  <p className="text-sm">{item.full_name}</p>
                  <div className={`grid grid-cols-4 py-2  gap-5 w-full`}>
                    {Object.entries(item.networks)
                      .slice(0, 3)
                      .map(([key, value]: [string, any]) => (
                        <div
                          className="flex gap-1 items-center justify-center w-full"
                          key={key}
                        >
                          <Image
                            width={20}
                            height={25}
                            src={`/media/${value.network}.png`}
                            alt={value.network}
                          />
                          <p className="text-sm">{value.follower_count}</p>
                        </div>
                      ))}
                    <div></div>
                    <Badge className=" absolute right-1.5 bottom-1.5 flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md">
                      <TrendingUp className="text-emerald-600" />
                      +5.2%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default StockMarket;
