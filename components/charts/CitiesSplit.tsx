import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getCountryCode } from "@/lib/country";

const CitiesSplit = ({ data }: { data: JSON }) => {
  const countries = Object.entries(data).map(([country, value]) => ({
    country,
    value,
  }));

  return (
    <Card className="flex flex-col bg-transparent border border-gray-800 rounded-md text-white gap-5">
      <CardHeader className="pb-0">
        <CardTitle className="text-center">Follower Locations</CardTitle>
      </CardHeader>
      <CardContent className="justify-center pb-0 bg-transparent mt-5 flex flex-col gap-2.5 ">
        {countries.map((country, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <div className="flex items-center text-sm justify-between">
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={getCountryCode(country.country)}
                    width={25}
                    height={25}
                    className="rounded-br-md rounded-tl-md"
                    alt={country.country}
                  />
                </div>
                <p>{country.country}</p>
              </div>
              <p>{country.value?.toFixed(2)} %</p>
            </div>
            <span
              className="w-full block h-[4px] rounded-full bg-[#36a2eb]"
              style={{
                width: `${country.value?.toFixed(2)}%`,
              }}
            ></span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CitiesSplit;

