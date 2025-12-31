"use client";

import React from "react";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
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

// Data from InsightCards.tsx
const mentionsByPeriodData = [
    { period: "1 Fev", x: 80, facebook: 40, instagram: 60, tiktok: 90, news: 15 },
    { period: "2 Mar", x: 95, facebook: 30, instagram: 55, tiktok: 110, news: 12 },
    { period: "3 Avr", x: 70, facebook: 35, instagram: 58, tiktok: 105, news: 18 },
    { period: "4 Mai", x: 75, facebook: 38, instagram: 62, tiktok: 98, news: 20 },
];

const mentionsByPeriodConfig = {
    x: {
        label: "Twitter/X",
        color: "#000000",
    },
    facebook: {
        label: "Facebook",
        color: "#f97316",
    },
    instagram: {
        label: "Instagram",
        color: "#ec4899",
    },
    tiktok: {
        label: "TikTok",
        color: "#d946ef",
    },
    news: {
        label: "News",
        color: "#38bdf8",
    },
};

interface MentionsOverTimeWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function MentionsOverTimeWidget({ viewMode = "chart", dateRange }: MentionsOverTimeWidgetProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CardTitle>Mentions au fil du temps</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mentionsByPeriodData}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="period"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                />
                                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="x"
                                    stroke={mentionsByPeriodConfig.x.color}
                                    strokeWidth={2}
                                    dot={false}
                                    name={mentionsByPeriodConfig.x.label}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="facebook"
                                    stroke={mentionsByPeriodConfig.facebook.color}
                                    strokeWidth={2}
                                    dot={false}
                                    name={mentionsByPeriodConfig.facebook.label}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="instagram"
                                    stroke={mentionsByPeriodConfig.instagram.color}
                                    strokeWidth={2}
                                    dot={false}
                                    name={mentionsByPeriodConfig.instagram.label}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="tiktok"
                                    stroke={mentionsByPeriodConfig.tiktok.color}
                                    strokeWidth={2}
                                    dot={false}
                                    name={mentionsByPeriodConfig.tiktok.label}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="news"
                                    stroke={mentionsByPeriodConfig.news.color}
                                    strokeWidth={2}
                                    dot={false}
                                    name={mentionsByPeriodConfig.news.label}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Période</TableHead>
                                    <TableHead>Twitter/X</TableHead>
                                    <TableHead>Facebook</TableHead>
                                    <TableHead>Instagram</TableHead>
                                    <TableHead>TikTok</TableHead>
                                    <TableHead>Actualités</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mentionsByPeriodData.map((row) => (
                                    <TableRow key={row.period}>
                                        <TableCell className="font-medium">{row.period}</TableCell>
                                        <TableCell>{row.x}</TableCell>
                                        <TableCell>{row.facebook}</TableCell>
                                        <TableCell>{row.instagram}</TableCell>
                                        <TableCell>{row.tiktok}</TableCell>
                                        <TableCell>{row.news}</TableCell>
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
