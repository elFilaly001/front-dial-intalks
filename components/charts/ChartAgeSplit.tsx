"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolTipsProvider from "./ToolTipsProvider";

type ChartItem = {
  category: string;
  fill: string;
  percentage?: number;
};

type ChartAgeSplitProps = {
  data: Record<string, number>;
  title?: string;
  tooltip?: string;
  insight?: string;
};

const chartConfig = {
  age: {
    label: "Age Split",
  },
  "13-17": { color: "#FF6384" },
  "18-24": { color: "#36A2EB" },
  "25-34": { color: "#FFCE56" },
  "35-44": { color: "#4BC0C0" },
  "45+": { color: "#9966FF" },
  undetermined: { color: "#C9CBCF" },
};

function ChartAgeSplit({ data, title, tooltip, insight }: ChartAgeSplitProps) {
  // local state for showing insight popup
  const [showInsight, setShowInsight] = React.useState(false);

  // Convert props data to chartData[]
  const chartData: ChartItem[] = [
    {
      category: "13-17",
      percentage: data["13-17"],
      fill: chartConfig["13-17"].color,
    },
    {
      category: "18-24",
      percentage: data["18-24"],
      fill: chartConfig["18-24"].color,
    },
    {
      category: "25-34",
      percentage: data["25-34"],
      fill: chartConfig["25-34"].color,
    },
    {
      category: "35-44",
      percentage: data["35-44"],
      fill: chartConfig["35-44"].color,
    },
    {
      category: "45+",
      percentage: (data["45-54"] || 0) + (data["55+"] || 0),
      fill: chartConfig["45+"].color,
    },
    {
      category: "undetermined",
      percentage: data["undetermined"],
      fill: chartConfig["undetermined"].color,
    },
  ];

  // derive a simple insight from data if none provided
  const top = chartData.reduce((prev, curr) => {
    return (curr.percentage || 0) > (prev.percentage || 0) ? curr : prev;
  }, chartData[0]);

  const defaultInsight = top
    ? `${top.category} is the largest segment at ${(
        top.percentage || 0
      ).toFixed(2)}% — this suggests content and campaigns should prioritize this age group.`
    : "Age distribution insight not available.";

  return (
    <Card className="flex flex-col   rounded-md gap-5 relative">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <CardTitle>
            {title ? title : "Age Distribution"}
          </CardTitle>
          <ToolTipsProvider
            title={
              tooltip ??
              `Age Distribution provides insights into the age demographics of your audience, helping tailor content and marketing strategies to better engage specific age groups.`
            }
          />
        </div>
      </CardHeader>
      <CardContent className="justify-center pb-0 bg-transparent mt-12 ">
        <div className="flex flex-col gap-3">
          {chartData.map((item) => (
            <div key={item.category} className="flex flex-col gap-2.5">
              <div className="flex items-center text-sm justify-between">
                <div className="flex gap-2 items-center">
                  <span
                    className={`h-3 w-3 block rounded-full`}
                    style={{ backgroundColor: `${item.fill}` }}
                  ></span>
                  <p>{item.category}</p>
                </div>
                <p>{item.percentage?.toFixed(2)} %</p>
              </div>
              <span
                className="w-full block h-1 rounded-full"
                style={{
                  backgroundColor: item.fill,
                  width: `${item.percentage?.toFixed(2)}%`,
                }}
              ></span>
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
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{display: 'inline-block', verticalAlign: 'middle'}} />
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
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {insight ?? defaultInsight}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ChartAgeSplit;
