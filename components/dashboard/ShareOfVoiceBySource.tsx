"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

// ShareOfVoice palette used across the dashboard
const palette = [
  "#10B981", // green
  "#6B7280", // gray
  "#EF4444", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

// Sample palette and brands (keeps parity with other share-of-voice components)
const brands = [
  { key: "jumia", label: "JumiaFood", color: palette[0] },
  { key: "careem", label: "CareemNow", color: palette[1] },
  { key: "yassir", label: "Yassir", color: palette[2] },
  { key: "koul", label: "Koul", color: palette[3] },
  { key: "livry", label: "Livry", color: palette[4] },
  { key: "glovo", label: "Glovo", color: palette[5] },
];

// Sample data mirroring the screenshot (sources as categories, stacked counts per brand)
const data = [
  { source: "Instagram", jumia: 6, careem: 3, yassir: 5, koul: 4, livry: 2, glovo: 3 },
  { source: "Facebook", jumia: 4, careem: 2, yassir: 6, koul: 3, livry: 5, glovo: 1 },
  { source: "X", jumia: 8, careem: 7, yassir: 6, koul: 5, livry: 4, glovo: 6 },
  { source: "TikTok", jumia: 7, careem: 6, yassir: 5, koul: 4, livry: 6, glovo: 3 },
  { source: "YouTube", jumia: 10, careem: 9, yassir: 8, koul: 7, livry: 6, glovo: 6 },
  { source: "LinkedIn", jumia: 3, careem: 2, yassir: 4, koul: 3, livry: 2, glovo: 3 },
];

const chartConfig: ChartConfig = brands.reduce((acc, b) => {
  acc[b.key] = { label: b.label, color: b.color };
  return acc;
}, {} as ChartConfig);

export default function ShareOfVoiceBySourceCard() {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>Share of Voice by Source Type</CardTitle>
          <ToolTipsProvider
            title="Share of voice by source type. Bars are stacked by brand to show how each channel contributes to total mentions."
          />
        </div>
      </CardHeader>

      <CardContent className="pb-16">
  <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="source"
                type="category"
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />

              {brands.map((b) => (
                <Bar
                  key={b.key}
                  dataKey={b.key}
                  stackId="a"
                  fill={b.color}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="absolute bottom-4 left-6">
          <div className="relative">
            <div
              className="text-sm text-black flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowInsight(true)}
              onMouseLeave={() => setShowInsight(false)}
            >
              <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS" width={22} height={22} className="inline-block align-middle" />
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
                  Facebook and YouTube drive the largest combined volumes, while Jumia and Careem are consistently present across channels. Use the stacked view to spot channel-specific strengths.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
