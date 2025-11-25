"use client";
import Image from "next/image";
import React from "react";
import "@/app/creator-netwrok.css";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
const data = [
  "/glovo-logo.jpg",
  "/seat.jpg",
  "/maserati.jpg",
  "/arma.jpg",
  "/cih.jpg",
  "/bp.jpg",
  "/Afriquia-01.png",
  "/MARJANE.jpg",
  "/Logo-Lydec-1.jpg",
  "/ocp-group.png",
  "/bmci.png",
  "/inwi.png",
];
const Circle = () => {
  return (
    <div className="h-screen flex flex-col justify-start mt-[350px] items-center">
      <div className="relative ">
        {data && (
          <>
            <BoxCreators
              className="transform rotate-25"
              size={440}
              duration={30}
              data={data.slice(0, 5)}
            />
            <BoxCreators
              className=""
              size={560}
              duration={30}
              data={data.slice(5, 11)}
            />
            <BoxCreators
              className="transform rotate-75"
              size={660}
              duration={30}
              data={data.slice(12, 18)}
            />
          </>
        )}
        <MiddleElement />
      </div>
    </div>
  );
};

const BoxCreators = ({
  size,
  duration,
  data,
  className,
}: {
  size: number;
  duration: number;
  data: string[];
  className: string;
}) => {
  return (
    <div
      className={`box-network px-12 ${className}`}
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          height: `${size}px`,
          width: `${size}px`,
          border: "0.3px solid #EFEFEF",
        } as React.CSSProperties
      }
    >
      {data.map((item, index) => (
        <div className={`group-icon `} key={index} style={{ zIndex: "99px" }}>
          <div className={`box-${index} children-container `}>
            <Image
              src={`${item}`}
              width={74}
              height={74}
              className="rounded-full mx-auto w-[74px] h-[74px] p-0.5"
              alt=""
              objectFit="contain"
              onError={(e) => {
                console.error(`Failed to load image: ${item}`);
                e.currentTarget.style.display = "none";
              }}
            />

            {/* 
            <img
              src={item.picture}
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
              }}
              alt=""
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const MiddleElement = () => {
  return (
    <div className="inset-1/2 z-50 -translate-x-1/2 -top-10 -translate-y-1/2 absolute w-[340px] text-center flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Network Watch</h2>
      <p className="text-whiteColor">Explore Brand Partnerships & Networks</p>

      <div className="flex items-center relative">
        <div className="relative">
          <Input
            className="w-[350px] bg-transparent pr-10"
            placeholder="Rechercher une marque"
          />
          <Search className="w-4 h-4 text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default Circle;
