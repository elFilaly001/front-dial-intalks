/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  XAxis,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const projectRevenueChartConfig = {
  actual: {
    label: "Actuel",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Restant",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--primary-foreground)",
  },
} as ChartConfig;

interface Propstype {
  label: string;
  data: any;
  tooltip?: string;
  insight?: string;
}
const KeywordWithSetiments = ({ label, data, tooltip, insight }: Propstype) => {
  const [showInsight, setShowInsight] = useState(false);

  // derive totals per keyword (sum of positive/neutral/negative)
  const totals: { name: string; total: number }[] = Array.isArray(data)
    ? data.map((d: any) => ({
      name: d.name,
      total: (d.positive || 0) + (d.neutral || 0) + (d.negative || 0),
    }))
    : [];

  const overallTotal = totals.reduce((s, t) => s + (t.total || 0), 0);
  const top = totals.length ? totals.reduce((p, c) => (c.total > p.total ? c : p), totals[0]) : null;

  const defaultInsight = top
    ? `${top.name} is the most mentioned keyword with ${top.total} mentions (${(
      overallTotal > 0 ? (top.total / overallTotal) * 100 : 0
    ).toFixed(1)}% of the sample).`
    : "No keyword insight available.";

  return (
    <Card className="relative min-w-0">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{label}</CardTitle>
          {tooltip && <ToolTipsProvider title={tooltip} />}
        </div>
        <CardDescription className="text-sm text-black">
          {insight}
        </CardDescription>
      </CardHeader>
      <CardContent className="size-full max-h-52">
        <ChartContainer
          config={projectRevenueChartConfig}
          className="size-full"
        >
          <BarChart accessibilityLayer data={data} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {/* Positive Bar */}
            <Bar
              stackId="sentiment"
              dataKey="positive"
              layout="vertical"
              fill="#40bb3c"
              radius={[6, 0, 0, 6]}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={8}
                className="fill-primary-foreground text-xs"
              />
              <LabelList
                dataKey="positive"
                position="insideRight"
                offset={8}
                className="fill-primary-foreground text-xs tabular-nums"
              />
            </Bar>

            {/* Neutral Bar */}
            <Bar
              stackId="sentiment"
              dataKey="neutral"
              layout="vertical"
              fill="#ffbf26"
            >
              <LabelList
                dataKey="neutral"
                position="insideRight"
                offset={8}
                className="fill-primary-foreground text-xs tabular-nums"
              />
            </Bar>

            {/* Negative Bar */}
            <Bar
              stackId="sentiment"
              dataKey="negative"
              layout="vertical"
              fill="#ff0c00"
              radius={[0, 6, 6, 0]}
            >
              <LabelList
                dataKey="negative"
                position="insideRight"
                offset={8}
                className="fill-primary-foreground text-xs tabular-nums"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
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
      <CardFooter></CardFooter>
    </Card>
  );
};

export default KeywordWithSetiments;
