"use client";

import * as React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
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

const palette = [
    "#9c0274",
    "#ea1c80",
    "#8376ce",
    "#aea6cf",
    "#ffbf26",
    "#ff0c00",
];

const data = [
    { name: "Social Media", value: 22.5, fill: palette[0] },
    { name: "Blogger", value: 19.8, fill: palette[1] },
    { name: "Engineer", value: 11.2, fill: palette[2] },
    { name: "Student", value: 10.5, fill: palette[3] },
    { name: "Author/Writer", value: 8.9, fill: palette[4] },
    { name: "Artist/Art", value: 8.2, fill: palette[5] },
    { name: "Executive manager", value: 6.1, fill: palette[0] },
    { name: "Entrepreneur", value: 5.3, fill: palette[1] },
    { name: "Sales", value: 4.7, fill: palette[2] },
    { name: "Transportation", value: 4.1, fill: palette[3] },
];

interface TopOccupationsWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function TopOccupationsWidget({ viewMode = "chart", dateRange }: TopOccupationsWidgetProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Professions des auteurs</CardTitle>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                layout="vertical"
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={140}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Profession</TableHead>
                                    <TableHead className="text-right">Pourcentage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: row.fill }}
                                                />
                                                {row.name}
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
