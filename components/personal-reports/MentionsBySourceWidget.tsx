"use client";

import * as React from "react";
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
import formatNumber from "@/lib/numbers";

const followersData = [
    {
        name: "YouTube",
        value: 50000,
        label: 50000,
        color: "#FF0000",
        icon: "/media/youtube.png",
    },
    {
        name: "Instagram",
        value: 150000,
        label: 150000,
        color: "#E4405F",
        icon: "/media/instagram.png",
    },
    {
        name: "TikTok",
        value: 175000,
        label: 175000,
        color: "#000000",
        icon: "/media/tiktok.png",
    },
    {
        name: "Twitter",
        value: 60000,
        label: 60000,
        color: "#1DA1F2",
        icon: "/media/twitter.png?v=12",
    },
    {
        name: "LinkedIn",
        value: 20000,
        label: 20000,
        color: "#0077B5",
        icon: "/media/linkedin.png",
    },
    {
        name: "Facebook",
        value: 110000,
        label: 110000,
        color: "#1877F2",
        icon: "/media/facebook.png",
    },
].sort((a, b) => b.value - a.value);

interface MentionsBySourceWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function MentionsBySourceWidget({ viewMode = "chart", dateRange }: MentionsBySourceWidgetProps) {
    const totalValue = followersData.reduce((sum, entry) => sum + entry.value, 0);
    const chartData = followersData.map((entry) => ({
        ...entry,
        totalValue,
        percent: ((entry.value / totalValue) * 100).toFixed(1)
    }));

    return (
        <Card className="flex-1 relative overflow-hidden">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Mentions par source</CardTitle>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {formatNumber(totalValue)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Total
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-16">
                {viewMode === "chart" ? (
                    <div className="flex flex-col gap-2">
                        {chartData.map((entry, index) => (
                            <div
                                key={`legend-${index}`}
                                className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                                <img
                                    src={entry.icon}
                                    alt={entry.name}
                                    width={24}
                                    height={24}
                                    className="rounded"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                            {entry.name}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white ml-2">
                                            {formatNumber(entry.value)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-300"
                                                style={{
                                                    width: `${entry.percent}%`,
                                                    backgroundColor: entry.color
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 w-10 text-right">
                                            {entry.percent}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead className="text-right">Mentions</TableHead>
                                    <TableHead className="text-right">Pourcentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chartData.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={row.icon}
                                                    alt={row.name}
                                                    width={20}
                                                    height={20}
                                                    className="rounded"
                                                />
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{formatNumber(row.value)}</TableCell>
                                        <TableCell className="text-right">{row.percent}%</TableCell>
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
