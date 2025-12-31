"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CredibilityChartProps {
  value?: number; // 0 to 100
}

function CredibilityChart({ value = 98.5 }: CredibilityChartProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));
  const remaining = 100 - clampedValue;
  
  // Determine credibility status
  const getStatus = () => {
    if (clampedValue >= 80) return { label: "FIABLE", color: "#10b981" };
    if (clampedValue >= 50) return { label: "MODÉRÉ", color: "#f59e0b" };
    return { label: "FAIBLE", color: "#ef4444" };
  };

  const status = getStatus();

  const chartData = [
    { name: "credibility", value: clampedValue, fill: status.color },
    { name: "remaining", value: remaining, fill: "#e5e7eb" },
  ];

  const chartConfig = {
    value: {
      label: "Crédibilité",
    },
    credibility: {
      label: "Crédibilité",
      color: status.color,
    },
    remaining: {
      label: "Restant",
      color: "#e5e7eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-gray-500 mb-2">Crédibilité</p>
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
            nameKey="name"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={2}
            cornerRadius={4}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
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
                        fill={status.color}
                      >
                        {clampedValue.toFixed(1)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 14}
                        fontSize="10"
                        fontWeight="600"
                        fill={status.color}
                      >
                        {status.label}
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

export default CredibilityChart;
