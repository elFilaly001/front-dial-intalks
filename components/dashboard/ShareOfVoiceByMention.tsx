"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a legend";

const chartData = [
  { browser: "JumiaFood", visitors: 275, fill: "var(--color-JumiaFood)" },
  { browser: "CareemNow", visitors: 200, fill: "var(--color-CareemNow)" },
  { browser: "Yassir", visitors: 187, fill: "var(--color-Yassir)" },
  { browser: "Koul", visitors: 173, fill: "var(--color-Koul)" },
  { browser: "Livry", visitors: 90, fill: "var(--color-Livry)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  JumiaFood: {
    label: "JumiaFood",
    color: "var(--chart-1)",
  },
  CareemNow: {
    label: "CareemNow",
    color: "var(--chart-2)",
  },
  Yassir: {
    label: "Yassir",
    color: "var(--chart-3)",
  },
  Koul: {
    label: "Koul",
    color: "var(--chart-4)",
  },
  Livry: {
    label: "Livry",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

function ShareOfVoiceByMention() {
  return (
    <div className="col-span-2 grid grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Share of Voice by Mentions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie 
                data={chartData} 
                dataKey="visitors" 
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Share of Positive</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie 
                data={chartData} 
                dataKey="visitors" 
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Share of Negative</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie 
                data={chartData} 
                dataKey="visitors" 
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Share of Neutral</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <Pie 
                data={chartData} 
                dataKey="visitors" 
                nameKey="browser"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="browser" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShareOfVoiceByMention;