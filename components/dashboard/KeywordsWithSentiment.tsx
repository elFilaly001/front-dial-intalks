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

const data = [
  { keyword: "Glovo Orders", positive: 120, neutral: 80, negative: 10 },
  { keyword: "Fast Delivery", positive: 100, neutral: 60, negative: 20 },
  { keyword: "Glovo Jobs", positive: 90, neutral: 70, negative: 15 },
  { keyword: "Online Food App", positive: 80, neutral: 90, negative: 12 },
  { keyword: "Livraison Rapide", positive: 70, neutral: 60, negative: 10 },
  { keyword: "توصل الطلبات", positive: 65, neutral: 55, negative: 8 },
  { keyword: "Commande en ligne", positive: 60, neutral: 45, negative: 5 },
];

// Reuse the ShareOfVoice palette for consistency across charts
const palette = [
  "#10B981", // green
  "#6B7280", // gray
  "#EF4444", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

const chartConfig = {
  visitors: { label: "Mentions" },
  // map positive -> green, neutral -> gray, negative -> red
  positive: { label: "Positive", color: palette[0] },
  neutral: { label: "Neutral", color: palette[1] },
  negative: { label: "Negative", color: palette[2] },
} satisfies ChartConfig;

export default function KeywordsWithSentiment() {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Mentions par Sentiment</CardTitle>
          <ToolTipsProvider title="Distribution of sentiment across top keywords. Hover the AI insight bubble for a summary." />
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

              <Bar dataKey="positive" stackId="a" fill={chartConfig.positive.color} />
              <Bar dataKey="neutral" stackId="a" fill={chartConfig.neutral.color} />
              <Bar dataKey="negative" stackId="a" fill={chartConfig.negative.color} />
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
                These keywords show strong positive engagement (pink). Neutral mentions (blue) indicate informative or descriptive usage. Watch keywords with rising negative share for potential issues to investigate.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
