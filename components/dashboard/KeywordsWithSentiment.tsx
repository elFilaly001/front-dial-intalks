"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";


export type KeywordSentiment = {
  keyword: string;
  positif: number;
  neutre: number;
  negatif: number;
};

// Reuse the ShareOfVoice palette for consistency across charts
const palette = [
  "#40bb3c", // green
  "#ffbf26", // gray
  "#ff0c00", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

const chartConfig = {
  visitors: { label: "Mentions" },
  // map positif -> green, neutre -> gray, négatif -> red
  positif: { label: "Positif", color: palette[0] },
  neutre: { label: "Neutre", color: palette[1] },
  négatif: { label: "Négatif", color: palette[2] },
} satisfies ChartConfig;


interface KeywordsWithSentimentProps {
  data: KeywordSentiment[];
}

export default function KeywordsWithSentiment({ data }: KeywordsWithSentimentProps) {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Mentions par Sentiment</CardTitle>
          <ToolTipsProvider title="Distribution des sentiments pour les principaux mots-clés. Survolez la bulle d'insight AI pour un résumé." />
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-10">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              // control bar thickness for stacked bars
              barSize={14}
              margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="keyword"
                width={140}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip
                cursor={{ fill: "transparent" }}
                formatter={(value: number) => value}
              />
              <Legend />

              <Bar dataKey="positif" stackId="a" fill={chartConfig.positif.color} />
              <Bar dataKey="neutre" stackId="a" fill={chartConfig.neutre.color} />
              <Bar dataKey="négatif" stackId="a" fill={chartConfig.négatif.color} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
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
                background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            >
              AI-powered insight
            </span>
          </div>

          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Massinart&apos;s keywords show strong positive engagement around gallery and art collections. Neutral mentions indicate informative discussions about interior design trends. Monitor keywords with rising negative share to address customer concerns promptly.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
