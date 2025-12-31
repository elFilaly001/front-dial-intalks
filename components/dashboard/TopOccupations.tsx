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
  "#9c0274",
  "#ea1c80",
  "#8376ce",
  "#aea6cf",
  "#ffbf26",
  "#ff0c00",
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
  title = "Professions des auteurs",
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
          <ToolTipsProvider title={tooltip ?? "Répartition des métiers des personnes ayant mentionné la marque, basée sur l’analyse de leurs profils publics."} />
        </div>
      </CardHeader>

      <CardContent className="pb-16">
        <div style={{ width: "100%", height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <XAxis
                type="number"
                domain={[0, 'dataMax + 5']}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={140}
                tick={{ fontSize: 13, fill: '#374151' }}
                axisLine={false}
                tickLine={false}
              />
              <ReTooltip
                formatter={(value: number | string) => [`${value}%`, "Share"]}
                labelFormatter={() => ''}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  padding: '10px 14px',
                }}
                itemStyle={{
                  color: '#6b7280',
                  fontSize: '13px',
                }}
                cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
              />
              <Bar dataKey="value" barSize={22} radius={[0, 0, 0, 0]}>
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
