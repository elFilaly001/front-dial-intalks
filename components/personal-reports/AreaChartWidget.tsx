"use client";
import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
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
    { date: "2024-04-01", positive: 122, negative: 80, neutral: 170 },
    { date: "2024-04-02", positive: 67, negative: 25, neutral: 185 },
    { date: "2024-04-03", positive: 97, negative: 60, neutral: 130 },
    { date: "2024-04-04", positive: 142, negative: 85, neutral: 275 },
    { date: "2024-04-05", positive: 223, negative: 130, neutral: 310 },
    { date: "2024-04-06", positive: 181, negative: 105, neutral: 355 },
    { date: "2024-04-07", positive: 145, negative: 85, neutral: 195 },
    { date: "2024-04-08", positive: 259, negative: 130, neutral: 340 },
    { date: "2024-04-09", positive: 39, negative: 15, neutral: 115 },
    { date: "2024-04-10", positive: 161, negative: 85, neutral: 205 },
];

interface AreaChartWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function AreaChartWidget({ viewMode = "chart", dateRange }: AreaChartWidgetProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Évolution des Sentiments</CardTitle>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => {
                                        const date = new Date(value);
                                        return date.toLocaleDateString("fr-FR", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="positive"
                                    name="Positif"
                                    stackId="1"
                                    stroke="#40bb3c"
                                    fill="#40bb3c"
                                    fillOpacity={0.4}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="neutral"
                                    name="Neutre"
                                    stackId="1"
                                    stroke="#ffbf26"
                                    fill="#ffbf26"
                                    fillOpacity={0.4}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="negative"
                                    name="Négatif"
                                    stackId="1"
                                    stroke="#ff0c00"
                                    fill="#ff0c00"
                                    fillOpacity={0.4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="h-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Positif</TableHead>
                                    <TableHead className="text-right">Neutre</TableHead>
                                    <TableHead className="text-right">Négatif</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chartData.map((row) => (
                                    <TableRow key={row.date}>
                                        <TableCell className="font-medium">{row.date}</TableCell>
                                        <TableCell className="text-right">{row.positive}</TableCell>
                                        <TableCell className="text-right">{row.neutral}</TableCell>
                                        <TableCell className="text-right">{row.negative}</TableCell>
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
