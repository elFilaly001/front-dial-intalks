import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ToolTipsProvider from "./ToolTipsProvider";

const Interset = ({ title, data }: { title: string; data: JSON }) => {
  const [showInsight, setShowInsight] = useState(false);

  const countries = Object.entries(data).map(([country, value]) => ({
    country,
    value,
  }));

  return (
    <Card className="flex flex-col rounded-md gap-5 relative">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <ToolTipsProvider
            title={`Interset affiche la répartition en pourcentage des mentions selon les pays, permettant d'identifier les zones géographiques clés d'intérêt et d'engagement.`}
          />
        </div>
      </CardHeader>
      <CardContent className="justify-center pb-0 bg-transparent mt-5 flex flex-col gap-2.5 ">
        {countries.map((country, index) => (
          <div key={index} className="flex flex-col gap-2.5">
            <div className="flex items-center text-sm justify-between">
              <div className="flex gap-2 items-center">
                <p>{country.country}</p>
              </div>
              <p>{country.value?.toFixed(2)} %</p>
            </div>
            <span
              className="w-full block h-1 rounded-full bg-[#36a2eb]"
              style={{
                width: `${country.value?.toFixed(2)}%`,
              }}
            ></span>
          </div>
        ))}
      </CardContent>
      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div 
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image
              src="/icons/IN-TALKS-logo.png-2.webp"
              alt="IN-TALKS Logo"
              width={22}
              height={22}
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              Insights boostés par IA
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                L&apos;analyse d&apos;affinité d&apos;intérêt montre que la catégorie « Amis, Famille &amp; Relations » est en tête avec 45,65 %, indiquant un fort engagement de l&apos;audience envers le contenu social et personnel. Cela suggère que les stratégies de contenu devraient privilégier les sujets axés sur les relations pour une résonance maximale.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Interset;
