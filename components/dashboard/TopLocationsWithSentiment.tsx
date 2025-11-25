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

// sample data showing Moroccan cities
const data = [
  { city: "Marrakech", positive: 45, neutral: 12, negative: 3 },
  { city: "Tanger", positive: 20, neutral: 7, negative: 2 },
  { city: "Casablanca", positive: 35, neutral: 18, negative: 5 },
  { city: "Rabat", positive: 18, neutral: 6, negative: 1 },
  { city: "Fes", positive: 12, neutral: 5, negative: 1 },
  { city: "Agadir", positive: 8, neutral: 3, negative: 0 },
  { city: "Undetermined", positive: 10, neutral: 4, negative: 1 },
];

// ShareOfVoice palette for consistent chart coloring across the dashboard
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
  positive: { label: "Positive", color: palette[0] },
  neutral: { label: "Neutral", color: palette[1] },
  negative: { label: "Negative", color: palette[2] },
} satisfies ChartConfig;

export default function TopLocationsWithSentiment() {
  const [showInsight, setShowInsight] = React.useState(false);
  // sort cities by total mentions (positive + neutral + negative) desc
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const ta = (a.positive || 0) + (a.neutral || 0) + (a.negative || 0);
      const tb = (b.positive || 0) + (b.neutral || 0) + (b.negative || 0);
      return tb - ta;
    });
  }, []);

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Top Locations with Sentiment</CardTitle>
          <ToolTipsProvider title="Distribution of sentiment across top Moroccan cities. Hover for context." />
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-10">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              barSize={14}
              margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="city"
                width={140}
                tickLine={false}
                axisLine={false}
              />
              <RechartsTooltip cursor={{ fill: "transparent" }} formatter={(v: number) => v} />
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
                Morocco leads mentions with strong positive engagement. Undetermined entries are sizeable — consider refining geolocation or sampling to reduce noise. Watch non-local spikes to detect campaign reach.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
