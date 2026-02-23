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
import SentimentGauge from "./SentimentGauge";
import EmotionsChart from "./EmotionsChart";
import CredibilityChart from "./CredibilityChart";

export const description = "An interactive area chart for sentiment analysis";


export type DailyMention = {
  date: string;
  endDate?: string;
  total: number;
  positive: number;
  negative: number;
  neutral: number;
  totalLikes?: number;
  totalComments?: number;
  viewsCount?: number;
  shareCount?: number;
};


// ShareOfVoice palette used across the dashboard
// Updated: positive, neutral, negative colors per request
const palette = [
  "#40bb3c", // positive
  "#ffbf26", // neutral
  "#ff0c00", // negative
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

const chartConfig = {
  visitors: {
    label: "Mentions",
  },
  positive: {
    label: "Positif",
    color: palette[0],
  },
  neutral: {
    label: "Neutre",
    color: palette[1],
  },
  negative: {
    label: "Négatif",
    color: palette[2],
  },
} satisfies ChartConfig;
interface MentionsBySentimentsProps {
  data: DailyMention[];
}

function MentionsBySentiments({ data }: MentionsBySentimentsProps) {
  const isMobile = useIsMobile();
  const [selectedRange, setSelectedRange] = React.useState<number>(30);
  const [showInsightBlogs, setShowInsightBlogs] = React.useState(false);

  const ranges = [7, 30, 60, 90];

  const filteredData = React.useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return [];
    // determine latest date in the data
    const latest = data.reduce((acc, cur) => {
      const d = new Date(cur.date);
      return d > acc ? d : acc;
    }, new Date(data[0].date));

    const cutoff = new Date(latest);
    cutoff.setDate(cutoff.getDate() - selectedRange + 1);

    return data.filter((d) => new Date(d.date) >= cutoff);
  }, [selectedRange, data]);

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CardTitle>Sentiment Trend</CardTitle>
            <ToolTipsProvider
              title={`Shows the sentiment trend for the last 7 days. Hover over each point to see the number of mentions for each sentiment type. Use this data to track changes in audience mood and identify key events.`}
            />
          </div>
          <div className="ml-4 flex items-center gap-2">
            {ranges.map((r) => {
              const active = selectedRange === r;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium transition-colors disabled:opacity-50 focus:outline-none ${active
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                    : "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  aria-pressed={active}
                >
                  {`${r}d`}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-8">
        {/* Three charts row: Emotions - Sentiment Gauge - Credibility */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
          {/* Emotions Chart */}
          <EmotionsChart joy={90.4} sadness={3.2} anger={2.1} fear={2.8} surprise={1.5} />

          {/* Sentiment Gauge - dynamic value */}
          {(() => {
            // Calculate sentiment score for each day: score = ((positive - negative) / total) * 50
            // Average over filteredData
            let gaugeValue = 0;
            if (filteredData.length > 0) {
              const scores = filteredData.map(d => {
                const total = d.positive + d.negative + d.neutral;
                if (total === 0) return 0;
                return ((d.positive - d.negative) / total) * 50;
              });
              gaugeValue = scores.reduce((sum, v) => sum + v, 0) / scores.length;
            }
            return <SentimentGauge value={gaugeValue} />;
          })()}

          {/* Credibility Chart */}
          <CredibilityChart value={98.5} />
        </div>
        
        {/* Area Chart */}
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
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
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : Math.max(0, (filteredData?.length ?? 0) - 1)}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
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
