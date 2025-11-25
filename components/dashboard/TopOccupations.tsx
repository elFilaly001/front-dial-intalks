"use client";

import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";

type OccupationItem = {
  name: string;
  value: number;
  fill?: string;
};

// Use the same color palette as ShareOfVoice for visual consistency.
// Palette: green, gray, red, orange, purple, cyan (will cycle if more items)
const palette = [
  "#10B981",
  "#6B7280",
  "#EF4444",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

const sampleData: OccupationItem[] = [
  { name: "Social Media", value: 22.5, fill: palette[0] },
  { name: "Blogger", value: 19.8, fill: palette[1] },
  { name: "Engineer", value: 11.2, fill: palette[2] },
  { name: "Student", value: 10.5, fill: palette[3] },
  { name: "Author/Writer", value: 8.9, fill: palette[4] },
  { name: "Artist/Art", value: 8.2, fill: palette[5] },
  { name: "Executive manager", value: 6.1, fill: palette[0] },
  { name: "Entrepreneur", value: 5.3, fill: palette[1] },
  { name: "Sales", value: 4.7, fill: palette[2] },
  { name: "Transportation", value: 4.1, fill: palette[3] },
  { name: "Other", value: 9.8, fill: palette[4] },
];

export default function TopOccupations({
  data = sampleData,
  title = "Top Occupations",
  tooltip,
  insight,
}: {
  data?: OccupationItem[];
  title?: string;
  tooltip?: string;
  insight?: string;
}) {
  const [showInsight, setShowInsight] = useState(false);

  // compute default insight: top occupation
  const sorted = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
  const top = sorted[0];
  const defaultInsight = top
    ? `${top.name} leads at ${top.value.toFixed(1)}% of mentions — consider tailoring content to this audience.`
    : "No occupation data available.";

  return (
    <Card className="relative">
      <CardHeader className="items-center">
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <ToolTipsProvider title={tooltip ?? "Breakdown of occupations among your audience."} />
        </div>
      </CardHeader>

  <CardContent className="pb-16">
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <XAxis type="number" domain={[0, 'dataMax + 5']} tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={160} tick={{ fontSize: 13 }} />
              <ReTooltip formatter={(value: number | string) => [`${value}%`, "Share"]} />
              <Bar dataKey="value" barSize={18} radius={[8, 8, 8, 8]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || '#8884d8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

  <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-sm px-2 py-1 whitespace-nowrap">
              <span className="h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
              <span className="truncate">{d.name}</span>
            </div>
          ))}
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
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">{insight ?? defaultInsight}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
