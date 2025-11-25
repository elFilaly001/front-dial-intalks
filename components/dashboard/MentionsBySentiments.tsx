"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import ToolTipsProvider from "../charts/ToolTipsProvider";

export const description = "An interactive area chart for sentiment analysis";

const chartData = [
  { date: "2024-04-01", positive: 122, negative: 80, neutral: 170 },
  { date: "2024-04-02", positive: 67, negative: 25, neutral: 185 },
  { date: "2024-04-03", positive: 97, negative: 60, neutral: 130 },
  { date: "2024-04-04", positive: 142, negative: 85, neutral: 275 },
  { date: "2024-04-05", positive: 223, negative: 130, neutral: 310 },
  { date: "2024-04-06", positive: 181, negative: 105, neutral: 355 },
  { date: "2024-04-07", positive: 145, negative: 85, neutral: 195 },
  { date: "2024-04-08", positive: 259, negative: 130, neutral: 340 },
  { date: "2024-04-09", positive: 39, negative: 15, neutral: 115 },
  { date: "2024-04-10", positive: 161, negative: 85, neutral: 205 },
  { date: "2024-04-11", positive: 197, negative: 115, neutral: 365 },
  { date: "2024-04-12", positive: 172, negative: 105, neutral: 225 },
  { date: "2024-04-13", positive: 202, negative: 125, neutral: 395 },
  { date: "2024-04-14", positive: 87, negative: 40, neutral: 230 },
  { date: "2024-04-15", positive: 70, negative: 40, neutral: 180 },
  { date: "2024-04-16", positive: 88, negative: 40, neutral: 200 },
  { date: "2024-04-17", positive: 276, negative: 150, neutral: 380 },
  { date: "2024-04-18", positive: 214, negative: 130, neutral: 430 },
  { date: "2024-04-19", positive: 143, negative: 85, neutral: 195 },
  { date: "2024-04-20", positive: 49, negative: 35, neutral: 155 },
  { date: "2024-04-21", positive: 87, negative: 40, neutral: 210 },
  { date: "2024-04-22", positive: 134, negative: 75, neutral: 185 },
  { date: "2024-04-23", positive: 88, negative: 40, neutral: 240 },
  { date: "2024-04-24", positive: 227, negative: 140, neutral: 310 },
  { date: "2024-04-25", positive: 135, negative: 70, neutral: 260 },
  { date: "2024-04-26", positive: 45, negative: 25, neutral: 135 },
  { date: "2024-04-27", positive: 233, negative: 130, neutral: 440 },
  { date: "2024-04-28", positive: 72, negative: 40, neutral: 190 },
  { date: "2024-04-29", positive: 185, negative: 115, neutral: 255 },
  { date: "2024-04-30", positive: 274, negative: 160, neutral: 400 },
  { date: "2024-05-01", positive: 95, negative: 60, neutral: 230 },
  { date: "2024-05-02", positive: 173, negative: 105, neutral: 325 },
  { date: "2024-05-03", positive: 147, negative: 85, neutral: 205 },
  { date: "2024-05-04", positive: 225, negative: 140, neutral: 440 },
  { date: "2024-05-05", positive: 281, negative: 180, neutral: 410 },
  { date: "2024-05-06", positive: 298, negative: 180, neutral: 540 },
  { date: "2024-05-07", positive: 228, negative: 140, neutral: 320 },
  { date: "2024-05-08", positive: 89, negative: 50, neutral: 220 },
  { date: "2024-05-09", positive: 137, negative: 75, neutral: 195 },
  { date: "2024-05-10", positive: 173, negative: 105, neutral: 345 },
  { date: "2024-05-11", positive: 195, negative: 125, neutral: 285 },
  { date: "2024-05-12", positive: 117, negative: 70, neutral: 250 },
  { date: "2024-05-13", positive: 117, negative: 70, neutral: 170 },
  { date: "2024-05-14", positive: 268, negative: 160, neutral: 510 },
  { date: "2024-05-15", positive: 283, negative: 170, neutral: 400 },
  { date: "2024-05-16", positive: 198, negative: 120, neutral: 420 },
  { date: "2024-05-17", positive: 299, negative: 180, neutral: 440 },
  { date: "2024-05-18", positive: 185, negative: 115, neutral: 365 },
  { date: "2024-05-19", positive: 135, negative: 85, neutral: 195 },
  { date: "2024-05-20", positive: 107, negative: 60, neutral: 240 },
  { date: "2024-05-21", positive: 42, negative: 35, neutral: 145 },
  { date: "2024-05-22", positive: 41, negative: 35, neutral: 125 },
  { date: "2024-05-23", positive: 152, negative: 85, neutral: 305 },
  { date: "2024-05-24", positive: 174, negative: 105, neutral: 235 },
  { date: "2024-05-25", positive: 121, negative: 70, neutral: 260 },
  { date: "2024-05-26", positive: 123, negative: 75, neutral: 185 },
  { date: "2024-05-27", positive: 250, negative: 150, neutral: 480 },
  { date: "2024-05-28", positive: 133, negative: 85, neutral: 205 },
  { date: "2024-05-29", positive: 38, negative: 35, neutral: 135 },
  { date: "2024-05-30", positive: 200, negative: 125, neutral: 295 },
  { date: "2024-05-31", positive: 108, negative: 60, neutral: 240 },
  { date: "2024-06-01", positive: 108, negative: 60, neutral: 210 },
  { date: "2024-06-02", positive: 280, negative: 170, neutral: 430 },
  { date: "2024-06-03", positive: 63, negative: 35, neutral: 165 },
  { date: "2024-06-04", positive: 259, negative: 160, neutral: 400 },
  { date: "2024-06-05", positive: 48, negative: 35, neutral: 145 },
  { date: "2024-06-06", positive: 174, negative: 105, neutral: 265 },
  { date: "2024-06-07", positive: 193, negative: 115, neutral: 385 },
  { date: "2024-06-08", positive: 225, negative: 140, neutral: 340 },
  { date: "2024-06-09", positive: 258, negative: 160, neutral: 500 },
  { date: "2024-06-10", positive: 95, negative: 50, neutral: 210 },
  { date: "2024-06-11", positive: 52, negative: 35, neutral: 155 },
  { date: "2024-06-12", positive: 292, negative: 180, neutral: 440 },
  { date: "2024-06-13", positive: 41, negative: 35, neutral: 135 },
  { date: "2024-06-14", positive: 256, negative: 150, neutral: 400 },
  { date: "2024-06-15", positive: 187, negative: 105, neutral: 365 },
  { date: "2024-06-16", positive: 221, negative: 130, neutral: 330 },
  { date: "2024-06-17", positive: 285, negative: 170, neutral: 540 },
  { date: "2024-06-18", positive: 67, negative: 35, neutral: 175 },
  { date: "2024-06-19", positive: 201, negative: 125, neutral: 305 },
  { date: "2024-06-20", positive: 248, negative: 140, neutral: 470 },
  { date: "2024-06-21", positive: 99, negative: 60, neutral: 220 },
  { date: "2024-06-22", positive: 187, negative: 115, neutral: 285 },
  { date: "2024-06-23", positive: 290, negative: 170, neutral: 550 },
  { date: "2024-06-24", positive: 82, negative: 40, neutral: 190 },
  { date: "2024-06-25", positive: 91, negative: 40, neutral: 195 },
  { date: "2024-06-26", positive: 264, negative: 150, neutral: 400 },
  { date: "2024-06-27", positive: 268, negative: 160, neutral: 510 },
  { date: "2024-06-28", positive: 89, negative: 50, neutral: 210 },
  { date: "2024-06-29", positive: 63, negative: 35, neutral: 165 },
  { date: "2024-06-30", positive: 266, negative: 160, neutral: 420 },
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
  visitors: {
    label: "Mentions",
  },
  positive: {
    label: "Positive",
    color: palette[0],
  },
  neutral: {
    label: "Neutral",
    color: palette[1],
  },
  negative: {
    label: "Negative",
    color: palette[2],
  },
} satisfies ChartConfig;
function MentionsBySentiments() {
  const isMobile = useIsMobile();
  const [showInsightBlogs, setShowInsightBlogs] = React.useState(false);

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Sentiment Trend</CardTitle>
          <ToolTipsProvider
            title={`Shows the sentiment trend for the last 7 days. Hover over each point to see the number of mentions for each sentiment type. Use this data to track changes in audience mood and identify key events.`}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-8">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette[0]} stopOpacity={1.0} />
                <stop offset="95%" stopColor={palette[0]} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette[2]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette[2]} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette[1]} stopOpacity={0.6} />
                <stop offset="95%" stopColor={palette[1]} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="positive"
              type="natural"
              fill="url(#fillPositive)"
              stroke={palette[0]}
              stackId="a"
            />
            <Area
              dataKey="neutral"
              type="natural"
              fill="url(#fillNeutral)"
              stroke={palette[1]}
              stackId="a"
            />
            <Area
              dataKey="negative"
              type="natural"
              fill="url(#fillNegative)"
              stroke={palette[2]}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsightBlogs(true)}
            onMouseLeave={() => setShowInsightBlogs(false)}
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
          {showInsightBlogs && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sentiment trends show positive spikes correlating with key events. Negative mentions remain low, while neutral fluctuations indicate emerging topics. Monitor for patterns to optimize engagement strategies.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default MentionsBySentiments;
