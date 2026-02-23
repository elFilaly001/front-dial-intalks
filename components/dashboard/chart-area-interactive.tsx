import React, { useEffect, useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";


// Helper to get chart data from API response
function getChartDataFromApi(data: any) {
  if (!data || !Array.isArray(data.dailyMentions)) return [];
  // Only keep date, positive, negative, neutral fields
  return data.dailyMentions.map((item: any) => ({
    date: item.date,
    positive: item.positive,
    negative: item.negative,
    neutral: item.neutral,
    ...item // include all keys for source filtering
  }));
}


const chartConfig = {
  visitors: {
    label: "Mentions",
  },
  positive: {
    label: "Positif",
    color: "#22C55E", // Vert — Positif
  },
  neutral: {
    label: "Mentions",
    color: "#A3A3A3", // Gris — Neutre
  },
  negative: {
    label: "Négatif",
    color: "#EF4444", // Rouge — Négatif
  },
} satisfies ChartConfig;

interface SectionCardsProps {
  filters: any;
  data: any;
  loading?: boolean;
}


const ChartAreaInteractive = ({ filters, data, loading }: SectionCardsProps) => {
  const isMobile = useIsMobile();
  const [showInsight, setShowInsight] = useState(false);

  // Map filter values to dailyMentions keys
  const sourceKeyMap: Record<string, string> = {
    'X': 'x',
    'Facebook': 'facebook',
    'Instagram': 'instagram',
    'Tiktok': 'tiktok',
    'TikTok': 'tiktok',
    'Linkedin': 'linkedin',
    'LinkedIn': 'linkedin',
    'News': 'news',
    'Youtube': 'youtube',
  };

  // Get all daily mentions
  const allDailyMentions = data?.dailyMentions || [];

  // Filter daily mentions by date range
  let filteredMentions = allDailyMentions;
  if (filters?.dateRange?.from && filters?.dateRange?.to) {
    const fromTime = new Date(filters.dateRange.from).setHours(0, 0, 0, 0);
    const toTime = new Date(filters.dateRange.to).setHours(23, 59, 59, 999);
    filteredMentions = allDailyMentions.filter((item: any) => {
      const itemTime = new Date(item.date).getTime();
      return itemTime >= fromTime && itemTime <= toTime;
    });
  }

  // Calculate total mentions and daily average for the filtered period
  let mentionsTotal = 0;
  let mentionsAverage = 0;
  let chartData: any[] = [];
  if (filters?.source && sourceKeyMap[filters.source]) {
    const key = sourceKeyMap[filters.source];
    mentionsTotal = filteredMentions.reduce((sum, item) => sum + (item[key] ?? 0), 0);
    mentionsAverage = filteredMentions.length > 0 ? mentionsTotal / filteredMentions.length : 0;
    chartData = filteredMentions.map((item: any) => ({
      date: item.date,
      [key]: item[key] ?? 0,
    }));
  } else {
    mentionsTotal = filteredMentions.reduce((sum, item) => sum + item.total, 0);
    mentionsAverage = filteredMentions.length > 0 ? mentionsTotal / filteredMentions.length : 0;
    // Use dynamic chart data from API response and filter by date range
    const allChartData = getChartDataFromApi(data);
    chartData = allChartData;
    if (filters?.dateRange?.from && filters?.dateRange?.to) {
      const fromTime = new Date(filters.dateRange.from).setHours(0, 0, 0, 0);
      const toTime = new Date(filters.dateRange.to).setHours(23, 59, 59, 999);
      chartData = allChartData.filter((item: any) => {
        const itemTime = new Date(item.date).getTime();
        return itemTime >= fromTime && itemTime <= toTime;
      });
    }
  }

  // Determine which dataKey to use for the Area
  let areaDataKey = "neutral";
  let areaColor = "var(--color-neutral)";
  if (filters?.source && sourceKeyMap[filters.source]) {
    areaDataKey = sourceKeyMap[filters.source];
    // Optionally, set a color for each source if you want
    const colorMap: Record<string, string> = {
      x: "#000000",
      facebook: "#f97316",
      instagram: "#ec4899",
      tiktok: "#d946ef",
      linkedin: "#0A66C2",
      news: "#38bdf8",
      youtube: "#FF0000",
    };
    areaColor = colorMap[areaDataKey] || "var(--color-neutral)";
  }

  return (
    <Card className="py-0   border dark:border-gray-800 border-gray-200 col-span-2">
      <CardHeader className="flex flex-col items-stretch border-b dark:border-gray-800 border-gray-200 p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <div className="flex items-center gap-2">
            <CardTitle>Mentions Totales</CardTitle>
            <div className="bg-transparent">
              <ToolTipsProvider
                title={`Affiche le nombre total de mentions sur la période sélectionnée et les indicateurs de croissance rapide. Utilisez cela pour surveiller les variations de volume et repérer les pics ou baisses d'attention.`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          <button className="data-[active=true]:bg-muted/50 relative z-5 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Mentions totales
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              {mentionsTotal}
            </span>
          </button>
          <button className="data-[active=true]:bg-muted/50 relative z-5 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Moyenne quotidienne
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              {mentionsAverage.toFixed(2)}
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillNeutral" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#9c0274"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="#ff0c00"
                  stopOpacity={0.1}
                />
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
              dataKey={areaDataKey}
              type="natural"
              fill="url(#fillNeutral)"
              stroke={areaColor}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* ...existing code... */}
    </Card>
  );
};

export default ChartAreaInteractive;
