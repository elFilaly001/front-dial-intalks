import React, { useState } from "react";
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

const ChartAreaInteractive = () => {
  const isMobile = useIsMobile();
  const [showInsight, setShowInsight] = useState(false);

  return (
    <Card className="py-0   border dark:border-gray-800 border-gray-200 col-span-2">
      <CardHeader className="flex flex-col items-stretch border-b dark:border-gray-800 border-gray-200 p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-0!">
          <div className="flex items-center gap-2">
            <CardTitle>Mentions totales</CardTitle>
            <div className="bg-transparent">
              <ToolTipsProvider
                title={`Affiche le nombre total de mentions sur la période sélectionnée et les indicateurs de croissance rapide. Utilisez cela pour surveiller les variations de volume et repérer les pics ou baisses d'attention.`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1">
          <button className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Mentions totales
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              202
            </span>
          </button>
          <button className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Moyenne quotidienne
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              10
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
                  stopColor="var(--color-neutral)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-neutral)"
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
              dataKey="neutral"
              type="natural"
              fill="url(#fillNeutral)"
              stroke="var(--color-neutral)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <div className="relative px-6 pb-4">
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
          <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-w-md">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Les mentions globales ont augmenté de 14% par rapport à la période précédente. La moyenne quotidienne est de 120 (hausse de 13%). La série atteint un pic le 20 décembre avec 350 mentions. Le plus grand changement d&apos;un jour à l&apos;autre a été une baisse de 300 mentions entre le 20 et le 21 décembre.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChartAreaInteractive;
