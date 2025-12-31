"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const data = [
    { city: "Marrakech", positive: 45, neutral: 12, negative: 3 },
    { city: "Tanger", positive: 20, neutral: 7, negative: 2 },
    { city: "Casablanca", positive: 35, neutral: 18, negative: 5 },
    { city: "Rabat", positive: 18, neutral: 6, negative: 1 },
    { city: "Fes", positive: 12, neutral: 5, negative: 1 },
    { city: "Agadir", positive: 8, neutral: 3, negative: 0 },
    { city: "Undetermined", positive: 10, neutral: 4, negative: 1 },
];

interface TopLocationsWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function TopLocationsWidget({ viewMode = "chart", dateRange }: TopLocationsWidgetProps) {
    const sortedData = React.useMemo(() => {
        return [...data].sort((a, b) => {
            const ta = (a.positive || 0) + (a.neutral || 0) + (a.negative || 0);
            const tb = (b.positive || 0) + (b.neutral || 0) + (b.negative || 0);
            return tb - ta;
        });
    }, []);

    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle>Analyse des Sentiments par Ville</CardTitle>
            </CardHeader>

            <CardContent>
                {viewMode === "chart" ? (
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={sortedData}
                                layout="vertical"
                                barSize={14}
                                margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
                            >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis type="number" tickLine={false} axisLine={false} />
                                <YAxis
                                    type="category"
                                    dataKey="city"
                                    width={100}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Legend />

                                <Bar dataKey="positive" name="Positif" stackId="a" fill="#40bb3c" />
                                <Bar dataKey="neutral" name="Neutre" stackId="a" fill="#ffbf26" />
                                <Bar dataKey="negative" name="Négatif" stackId="a" fill="#ff0c00" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ville</TableHead>
                                    <TableHead className="text-right">Positif</TableHead>
                                    <TableHead className="text-right">Neutre</TableHead>
                                    <TableHead className="text-right">Négatif</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedData.map((row) => (
                                    <TableRow key={row.city}>
                                        <TableCell className="font-medium">{row.city}</TableCell>
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
