"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";

const ChartSetiment = () => {
  const [showInsight, setShowInsight] = useState(false);

  const mentionsBySentimentChartData = [
  { sentiment: "positif", mentions: 275, fill: "#10B981" },
  { sentiment: "neutre", mentions: 120, fill: "#6B7280" },
  { sentiment: "négatif", mentions: 80, fill: "#EF4444" },
  ];

  const mentionsBySentimentChartConfig = {
    mentions: {
      label: "Mentions",
    },
    positive: {
      label: "Positifs",
      color: "var(--chart-1)",
    },
    neutral: {
      label: "Neutres",
      color: "var(--chart-2)",
    },
    negative: {
      label: "Négatifs",
      color: "var(--chart-3)",
    },
  } as ChartConfig;

  const totalMentions = mentionsBySentimentChartData.reduce(
    (acc, curr) => acc + curr.mentions,
    0
  );

  return (
    <Card className="col-span-1 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="">Tendance du sentiment</CardTitle>
          <ToolTipsProvider
            title={`Affiche la répartition globale des sentiments (positif/neutre/négatif) pour la période sélectionnée et met en avant le sentiment dominant. Utile pour suivre l'évolution de la perception du sujet.`}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-16">
        <ChartContainer
          config={mentionsBySentimentChartConfig}
          className=" flex flex-col"
        >
          <PieChart
            className="m-0"
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={mentionsBySentimentChartData}
              dataKey="mentions"
              nameKey="sentiment"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
              cornerRadius={4}
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
                          className="fill-foreground text-3xl font-bold tabular-nums"
                        >
                          {totalMentions.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Mentions
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center w-full items-center gap-3 my-2">
          {mentionsBySentimentChartData.map((item) => (
            <div
              key={item.sentiment}
              className="flex items-center text-sm justify-between"
            >
              <div className="flex gap-2 items-center">
                <span
                  className="h-3 w-3 block rounded-full"
                  style={{ backgroundColor: `${item.fill}` }}
                ></span>
                <p className=" capitalize">{item.sentiment}</p>
              </div>
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
                <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} className="inline-block align-middle" />
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
                L&apos;analyse des sentiments montre que les mentions positives dominent à 49% (275 mentions), indiquant une perception globalement favorable. Le sentiment négatif représente 16% (80 mentions), ce qui suggère des axes d&apos;amélioration pour l&apos;expérience client.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChartSetiment;
