"use client";
import React from "react";
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

const mentionsBySentimentChartData = [
    { sentiment: "Positif", mentions: 275, fill: "#40bb3c" },
    { sentiment: "Neutre", mentions: 120, fill: "#ffbf26" },
    { sentiment: "Négatif", mentions: 80, fill: "#ff0c00" },
];

interface SentimentWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function SentimentWidget({ viewMode = "chart", dateRange }: SentimentWidgetProps) {
    const totalMentions = mentionsBySentimentChartData.reduce(
        (acc, curr) => acc + curr.mentions,
        0
    );

    return (
        <Card className="col-span-1 relative">
            <CardHeader>
                <CardTitle>Répartition des Mentions par Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={mentionsBySentimentChartData}
                                    dataKey="mentions"
                                    nameKey="sentiment"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    cornerRadius={4}
                                >
                                    {mentionsBySentimentChartData.map((entry, index) => (
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
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalMentions.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground text-xs"
                                                        >
                                                            Mentions
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
                                    <TableHead>Sentiment</TableHead>
                                    <TableHead className="text-right">Mentions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mentionsBySentimentChartData.map((row) => (
                                    <TableRow key={row.sentiment}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: row.fill }}
                                                />
                                                {row.sentiment}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{row.mentions}</TableCell>
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
