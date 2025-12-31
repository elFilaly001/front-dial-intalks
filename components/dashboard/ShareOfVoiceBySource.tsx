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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

// Source logos mapping
const sourceLogos: Record<string, string> = {
  Instagram: "/media/instagram.png",
  Facebook: "/media/facebook.png",
  Tiktok: "/media/tiktok.png",
  X: "/media/twitter.png",
  Youtube: "/media/youtube.png",
  Presse: "/media/presse.png", // Add if available, or remove
};

// Custom tooltip component
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
    payload: Record<string, unknown>;
  }>;
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom X-axis tick component to show logos with source names
interface CustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

const CustomXAxisTick = ({ x = 0, y = 0, payload }: CustomXAxisTickProps) => {
  const source = payload?.value || '';
  const logo = sourceLogos[source];
  
  return (
    <g transform={`translate(${x},${y})`}>
      {logo && (
        <image
          href={logo}
          x={-40}
          y={4}
          width={16}
          height={16}
        />
      )}
      <text
        x={-20}
        y={16}
        textAnchor="start"
        fontSize={12}
        fill="#666"
      >
        {source}
      </text>
    </g>
  );
};

// ShareOfVoice palette used across the dashboard
const palette = [
  "#9c0274", // green
  "#ea1c80",
  "#8376ce", // red
  "#aea6cf", // gray
  "#ffbf26",
  "#ff0c00",
];

// Company list used elsewhere in the dashboard (keeps parity with ShareOfVoiceByMention)
const companies = [
  { key: "Massinart", label: "Massinart", color: palette[0] },
  { key: "Concurrent1", label: "Concurrent 1", color: palette[1] },
  { key: "Concurrent2", label: "Concurrent 2", color: palette[2] },
  { key: "Concurrent3", label: "Concurrent 3", color: palette[3] },
  { key: "Concurrent4", label: "Concurrent 4", color: palette[4] },
  { key: "Concurrent5", label: "Concurrent 5", color: palette[5] },
];

const chartConfig: ChartConfig = companies.reduce((acc, c) => {
  acc[c.key] = { label: c.label, color: c.color };
  return acc;
}, {} as ChartConfig);

// Example competitive data per source (values are illustrative — replace with real data)
// Raw mention counts per source (these will be normalized to percentage shares per row)
const rawData: Array<Record<string, number | string>> = [
  { source: "Instagram", Massinart: 320, Concurrent1: 220, Concurrent2: 180, Concurrent3: 150, Concurrent4: 90, Concurrent5: 130 },
  { source: "Facebook", Massinart: 280, Concurrent1: 200, Concurrent2: 180, Concurrent3: 180, Concurrent4: 160, Concurrent5: 160 },
  { source: "Tiktok", Massinart: 350, Concurrent1: 250, Concurrent2: 200, Concurrent3: 120, Concurrent4: 80, Concurrent5: 80 },
  { source: "X", Massinart: 250, Concurrent1: 200, Concurrent2: 150, Concurrent3: 200, Concurrent4: 200, Concurrent5: 200 },
  { source: "Youtube", Massinart: 300, Concurrent1: 240, Concurrent2: 180, Concurrent3: 160, Concurrent4: 120, Concurrent5: 120 },
  { source: "Presse", Massinart: 430, Concurrent1: 330, Concurrent2: 180, Concurrent3: 460, Concurrent4: 320, Concurrent5: 320 },
];

// Normalize counts into percentage shares per source (each row sums to ~100)

export default function ShareOfVoiceBySourceCard() {
  const [showInsight, setShowInsight] = React.useState(false);

  return (
    <Card className="relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>Part de Voix par Source</CardTitle>
          <ToolTipsProvider
            title="Affiche la répartition de la part de voix des marques selon les différentes sources (Instagram, Facebook, X, TikTok, YouTube, LinkedIn). Ce graphique met en évidence quelles plateformes génèrent le plus de mentions pour chaque marque, permettant d’identifier les canaux les plus performants et les dynamiques de visibilité."
          />
        </div>
      </CardHeader>

      <CardContent className="pb-16">
        <ChartContainer config={chartConfig} className="h-[360px] w-full">
          <ResponsiveContainer>
            <BarChart
              data={rawData}
              layout="horizontal"
              margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
              barCategoryGap="20%"
              barGap={6}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="source"
                type="category"
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={<CustomXAxisTick />}
                height={40}
              />
              <YAxis type="number" tickLine={false} axisLine={false} width={70} />
              <ChartTooltip content={<CustomTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />

              {companies.map((c) => (
                <Bar
                  key={c.key}
                  dataKey={c.key}
                  barSize={16}
                  fill={c.color}
                  isAnimationActive={false}
                >
                  {/* <LabelList dataKey={c.key} position="top" /> */}
                </Bar>
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
                  Instagram and Facebook drive the largest volumes for art and decor brands, while Massinart maintains strong presence across all channels. Use the stacked view to identify platform-specific strengths for your interior design and art collection campaigns.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}