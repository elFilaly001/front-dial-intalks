"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "./ToolTipsProvider";

type GenderData = {
  realPeople: number;
  fakePeople: number;
};

type ChartGenderSplitProps = {
  title?: string;
  percentages: GenderData;
};

const chartConfig = {
  gender: {
    label: "Répartition par type",
  },
  realPeople: {
    label: "Personnes réelles",
    color: "#4CAF50", // Bleu
  },
  fakePeople: {
    label: "Faux comptes",
    color: "#F44336", // Rose
  },
} satisfies ChartConfig;

function QualitySplit({ percentages }: ChartGenderSplitProps) {
  const [showInsight, setShowInsight] = useState(false);

  // Convert props to chart-friendly array
  const chartData = [
    {
      category: "Personnes réelles",
      percentage: percentages.realPeople,
      fill: chartConfig.realPeople.color,
    },
    {
      category: "Faux comptes",
      percentage: percentages.fakePeople,
      fill: chartConfig.fakePeople.color,
    },
  ];

  // Find max category
  const maxCategory = chartData.reduce((a, b) =>
    (a.percentage || 0) > (b.percentage || 0) ? a : b
  );

  return (
    <Card className="flex flex-col rounded-md relative">

      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <CardTitle className="">Type de compte</CardTitle>
          <ToolTipsProvider
            title={`Pour déterminer le score de crédibilité des abonnés pour les comptes historiques, nous évaluons plusieurs facteurs, dont la présence d&apos;une photo de profil et d&apos;une bio, le nombre de publications et le ratio entre abonnés et abonnements. Les marques avec une audience authentique atteignent généralement des scores de 80 ou plus.`}
          />
        </div>
      </CardHeader>
      <CardContent className="justify-center pb-16 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px] mx-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="category"
              innerRadius={85}
              strokeWidth={20}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold dark:fill-white/80"
                        >
                          {maxCategory.percentage} %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {maxCategory.category}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {chartData.map((item) => (
            <div
              key={item.category}
              className="flex items-center text-sm justify-between"
            >
              <div className="flex gap-2 items-center">
                <span
                  className="h-3 w-3 block rounded-full"
                  style={{ backgroundColor: `${item.fill}` }}
                ></span>
                <p>{item.category}</p>
              </div>
              <p>{item.percentage} %</p>
            </div>
          ))}
        </div>
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
              className="inline-block align-middle"
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
                L&apos;analyse de la qualité des comptes montre que 63% des abonnés sont des personnes réelles, ce qui indique une bonne authenticité de l&apos;audience. Misez sur des stratégies pour augmenter l&apos;engagement authentique et réduire les faux comptes afin d&apos;améliorer la crédibilité de la marque.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default QualitySplit;
