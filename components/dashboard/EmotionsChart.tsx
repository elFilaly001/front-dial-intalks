"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface EmotionsChartProps {
  joy?: number;
  sadness?: number;
  anger?: number;
  fear?: number;
  surprise?: number;
}

const emotionLabels: Record<string, string> = {
  joy: "Joie",
  sadness: "Tristesse",
  anger: "Colère",
  fear: "Peur",
  surprise: "Surprise",
};

function EmotionsChart({ 
  joy = 90.4, 
  sadness = 3.2, 
  anger = 2.1, 
  fear = 2.8, 
  surprise = 1.5 
}: EmotionsChartProps) {
  const chartData = [
    { emotion: "joy", value: joy, fill: "#fbbf24" },
    { emotion: "sadness", value: sadness, fill: "#3b82f6" },
    { emotion: "anger", value: anger, fill: "#ef4444" },
    { emotion: "fear", value: fear, fill: "#8b5cf6" },
    { emotion: "surprise", value: surprise, fill: "#ec4899" },
  ];

  const chartConfig = {
    value: {
      label: "Valeur",
    },
    joy: {
      label: "Joie",
      color: "#fbbf24",
    },
    sadness: {
      label: "Tristesse",
      color: "#3b82f6",
    },
    anger: {
      label: "Colère",
      color: "#ef4444",
    },
    fear: {
      label: "Peur",
      color: "#8b5cf6",
    },
    surprise: {
      label: "Surprise",
      color: "#ec4899",
    },
  } satisfies ChartConfig;

  // Determine dominant emotion
  const dominant = chartData.reduce((prev, curr) => 
    curr.value > prev.value ? curr : prev
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-gray-500 mb-2">Émotions</p>
      <ChartContainer
        config={chartConfig}
        className="w-[180px] h-[180px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="emotion"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            cornerRadius={4}
            strokeWidth={0}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) - 4}
                        fontSize="20"
                        fontWeight="700"
                        fill={dominant.fill}
                      >
                        {dominant.value.toFixed(1)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 14}
                        fontSize="11"
                        fontWeight="600"
                        fill={dominant.fill}
                      >
                        {emotionLabels[dominant.emotion].toUpperCase()}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default EmotionsChart;
