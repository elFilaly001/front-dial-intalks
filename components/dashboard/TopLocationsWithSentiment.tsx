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

// Accept data as a prop
type CitySentiment = {
  city: string;
  positif: number;
  neutre: number;
  negatif: number;
};

interface TopLocationsWithSentimentProps {
  data: CitySentiment[];
}

// ShareOfVoice palette for consistent chart coloring across the dashboard
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
  positif: { label: "Positif", color: palette[0] },
  neutre: { label: "Neutre", color: palette[1] },
  négatif: { label: "Négatif", color: palette[2] },
} satisfies ChartConfig;

export default function TopLocationsWithSentiment({ data }: TopLocationsWithSentimentProps) {
  const [showInsight, setShowInsight] = React.useState(false);
  // sort cities by total mentions (positif + neutre + negatif) desc
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const ta = (a.positif || 0) + (a.neutre || 0) + (a.negatif || 0);
      const tb = (b.positif || 0) + (b.neutre || 0) + (b.negatif || 0);
      return tb - ta;
    });
  }, [data]);

  return (
    <Card className="@container/card relative min-w-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Analyse des Sentiments par Ville</CardTitle>
          <ToolTipsProvider title="Ce graphique présente les villes qui génèrent le plus de mentions sur la marque, accompagnées de leur répartition en sentiments positifs, neutres et négatifs. Il permet d’identifier les zones géographiques les plus engagées et de comprendre la perception locale de la marque." />
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

              <Bar dataKey="positif" stackId="a" fill={chartConfig.positif.color} />
              <Bar dataKey="neutre" stackId="a" fill={chartConfig.neutre.color} />
              <Bar dataKey="negatif" stackId="a" fill={chartConfig.négatif.color} />
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
