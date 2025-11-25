"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Image from "next/image";

const chartData = [
  { date: "2022-07-25", positive: 120, neutral: 60, negative: 40 },
  { date: "2022-07-26", positive: 100, neutral: 70, negative: 30 },
  { date: "2022-07-27", positive: 140, neutral: 90, negative: 55 },
  { date: "2022-07-28", positive: 110, neutral: 60, negative: 35 },
  { date: "2022-07-29", positive: 160, neutral: 80, negative: 60 },
  { date: "2022-07-30", positive: 180, neutral: 110, negative: 60 },
  { date: "2022-07-31", positive: 200, neutral: 120, negative: 80 },
  { date: "2022-08-01", positive: 220, neutral: 130, negative: 95 },
  { date: "2022-08-02", positive: 205, neutral: 125, negative: 95 },
  { date: "2022-08-03", positive: 190, neutral: 120, negative: 95 },
  { date: "2022-08-04", positive: 160, neutral: 115, negative: 90 },
  { date: "2022-08-05", positive: 150, neutral: 110, negative: 85 },
  { date: "2022-08-06", positive: 170, neutral: 120, negative: 75 },
  { date: "2022-08-07", positive: 195, neutral: 130, negative: 85 },
  { date: "2022-08-08", positive: 220, neutral: 140, negative: 110 },
];

// ShareOfVoice palette used across the dashboard
const palette = [
  "#10B981", // green
  "#6B7280", // gray
  "#EF4444", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

const chartConfig = {
  positive: { label: "Positive", color: palette[0] },
  neutral: { label: "Neutral", color: palette[1] },
  negative: { label: "Negative", color: palette[2] },
} satisfies ChartConfig;

export default function MentionsBySentimentCard() {
  const [showInsight, setShowInsight] = React.useState(false);

  // Very small helper to format X axis labels
  const formatDate = (v: string) => {
    try {
      const d = new Date(v);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return v;
    }
  };

  // We currently render the full dataset (no time-range filtering)

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Mentions by Sentiment</CardTitle>
          <ToolTipsProvider title="Daily mentions split by sentiment (Positive / Neutral / Negative). Use this view to quickly spot days with higher negative mentions or surges in positive engagement." />
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Legend: Positive / Neutral / Negative */}
  <div className="flex justify-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm block"
              style={{ background: "linear-gradient(90deg,#34d399,#10b981)" }}
            />
            <span className="text-sm text-muted-foreground">Positive</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm block"
              style={{ background: "linear-gradient(90deg,#9ca3af,#6b7280)" }}
            />
            <span className="text-sm text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm block"
              style={{ background: "linear-gradient(90deg,#f87171,#ef4444)" }}
            />
            <span className="text-sm text-muted-foreground">Negative</span>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="aspect-auto h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="gradPos" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="gradNeu" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#9ca3af" stopOpacity={1} />
                  <stop offset="100%" stopColor="#6b7280" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="gradNeg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 11 }} interval={0} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent labelFormatter={(v: unknown) => formatDate(String(v))} indicator="line" />}
              />
              <Bar dataKey="positive" stackId="a" fill="url(#gradPos)" />
              <Bar dataKey="neutral" stackId="a" fill="url(#gradNeu)" />
              <Bar dataKey="negative" stackId="a" fill="url(#gradNeg)" />
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
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{ display: "inline-block", verticalAlign: "middle" }} />
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}>
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Positive mentions steadily increase through the period with a peak on Aug 1st — monitor the days where negative mentions also rise (e.g., Aug 8) to investigate potential incidents or campaign backlash.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
