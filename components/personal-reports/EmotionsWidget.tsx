"use client";

import * as React from "react";
import { Label, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const chartData = [
    { emotion: "Joie", value: 90.4, fill: "#fbbf24" },
    { emotion: "Tristesse", value: 3.2, fill: "#3b82f6" },
    { emotion: "Colère", value: 2.1, fill: "#ef4444" },
    { emotion: "Peur", value: 2.8, fill: "#8b5cf6" },
    { emotion: "Surprise", value: 1.5, fill: "#ec4899" },
];

interface EmotionsWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function EmotionsWidget({ viewMode = "chart", dateRange }: EmotionsWidgetProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Analyse des Émotions</CardTitle>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="emotion"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    cornerRadius={4}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
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
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-2xl font-bold"
                                                        >
                                                            Émotions
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Émotion</TableHead>
                                    <TableHead className="text-right">Pourcentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chartData.map((row) => (
                                    <TableRow key={row.emotion}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: row.fill }}
                                                />
                                                {row.emotion}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{row.value}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
