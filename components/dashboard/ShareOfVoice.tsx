"use client";

import { PieChart, Pie } from "recharts";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

export const description = "A radar chart with dots";

// Fallback color palette
const colorPalette = [
  "#9c0274", "#ea1c80", "#8376ce", "#aea6cf", "#ffbf26", "#ff0c00",
  "#2dbaf6", "#06b6d4", "#8b5cf6", "#ec4899", "#64748b", "#0f172a"
];

function getChartDataFromApi(data: any) {
  if (!data || !Array.isArray(data.mentionsByKeyword)) return [];
  return data.mentionsByKeyword.slice(0, 5).map((item: any, idx: number) => ({
    keyword: item.keyword,
    mentions: item.count,
    fill: colorPalette[idx % colorPalette.length],
  }));
}

const chartConfig = {
  mentions: {
    label: "Mentions",
    color: "#2dbaf6",
  },
} satisfies ChartConfig;

interface SectionCardsProps {
  filters: any;
  data: any;
}


function ShareOfVoice({ filters, data }: SectionCardsProps) {
  const [showInsight, setShowInsight] = useState(false);

  // Use dynamic chart data from API response
  const chartData = getChartDataFromApi(data);
  const total = Array.isArray(chartData)
    ? chartData.reduce((sum, item) => sum + (item.mentions || 0), 0)
    : 0;

  return (
    <Card className="flex flex-col relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>Part de Voix</CardTitle>
          <ToolTipsProvider
            title={`Affiche la répartition des conversations par mots-clés. Met en évidence les termes les plus mentionnés et permet d’évaluer leur part de visibilité relative`}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-16 flex-1 flex flex-col items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto !aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="mentions"
              nameKey="keyword"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
              cornerRadius={4}
            />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" pointerEvents="none">
              <tspan x="50%" dy={-6} style={{ fontSize: 18, fontWeight: 700, fill: '#0f172a' }}>{total}</tspan>
              <tspan x="50%" dy={18} style={{ fontSize: 12, fill: '#64748b' }}>Mentions</tspan>
            </text>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-wrap justify-center w-full items-center gap-3 my-2">
          {chartData && chartData.length > 0 ? chartData.map((item: any) => (
            <div
              key={item.keyword}
              className="flex items-center text-sm px-2 py-1 whitespace-nowrap"
            >
              <div className="flex gap-2 items-center">
                <span
                  className="h-3 w-3 block rounded-full flex-shrink-0"
                  style={{ backgroundColor: `${item.fill}` }}
                />
                <p className="capitalize">{item.keyword}</p>
              </div>
            </div>
          )) : <span className="text-gray-400">Aucune donnée</span>}
        </div>
      </CardContent>
      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
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
              AI-Powered Insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                La restauration rapide domine la part de voix avec 35%, indiquant un fort intérêt des consommateurs pour cette catégorie. Les services de livraison suivent de près avec 29%, montrant l&apos;importance de la logistique dans le choix des consommateurs.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ShareOfVoice;
