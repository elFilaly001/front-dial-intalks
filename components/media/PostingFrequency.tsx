/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ToolTipsProvider from "../charts/ToolTipsProvider";

export const description = "An interactive bar chart";

const chartConfig = {
  views: {
    label: "Posts",
  },
} satisfies ChartConfig;

function PostingFrequency({ data }: { data: any }) {
  return (
    <Card className="py-0  border dark:border-gray-800 border-gray-200 relative">
      <div className=" absolute top-0 right-0">
        <ToolTipsProvider
          title={`Posting Frequency indicates how often content is published on average per day, week, and month. Maintaining a consistent posting schedule can enhance audience engagement and visibility.`}
        />
      </div>
      <CardHeader className="flex flex-col items-stretch border-b dark:border-gray-800 border-gray-200 !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Posting Frequency</CardTitle>
        </div>
        <div className="flex flex-1">
          <button className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Avg posts per day
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              {data.avgPerDay}
            </span>
          </button>
          <button className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Avg posts per week
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              {data.avgPerWeek}
            </span>
          </button>
          <button className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col text-center justify-center gap-1 border-t dark:border-gray-800 border-gray-200 px-6 py-4 even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-gray-500 text-xs capitalize">
              Avg posts per month
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl dark:text-gray-200 text-gray-600">
              {data.avgPerMonth}
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data.monthlyPosts}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0} // <-- show every tick
            />
            <ChartTooltip
              label={"Posts"}
              content={
                <ChartTooltipContent
                  label={"Posts"}
                  labelFormatter={(value) => value}
                />
              }
            />
            <Bar
              dataKey="count"
              fill="var(--chart-2)"
              barSize={10}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PostingFrequency;
