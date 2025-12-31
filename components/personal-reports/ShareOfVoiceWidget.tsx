"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
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
    { month: "Livraison", desktop: 186, fill: "#9c0274" },
    { month: "Restaurants", desktop: 305, fill: "#ea1c80" },
    { month: "Supermarket", desktop: 237, fill: "#8376ce" },
    { month: "Commande", desktop: 273, fill: "#aea6cf" },
    { month: "Nourriture", desktop: 209, fill: "#ffbf26" },
    { month: "Paiement", desktop: 214, fill: "#ff0c00" },
];

interface ShareOfVoiceWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function ShareOfVoiceWidget({ viewMode = "chart", dateRange }: ShareOfVoiceWidgetProps) {
    const total = chartData.reduce((sum, item) => sum + item.desktop, 0);

    return (
        <Card className="flex flex-col relative">
            <CardHeader className="items-center">
                <CardTitle>Part de Voix</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
                {viewMode === "chart" ? (
                    <>
                        <div className="h-[300px] w-full max-w-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Tooltip />
                                    <Pie
                                        data={chartData}
                                        dataKey="desktop"
                                        nameKey="month"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        cornerRadius={4}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" pointerEvents="none">
                                        <tspan x="50%" dy={-6} style={{ fontSize: 18, fontWeight: 700, fill: '#0f172a' }}>{total}</tspan>
                                        <tspan x="50%" dy={18} style={{ fontSize: 12, fill: '#64748b' }}>Mentions</tspan>
                                    </text>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center w-full items-center gap-3 my-2">
                            {chartData.map((item) => (
                                <div
                                    key={item.month}
                                    className="flex items-center text-sm px-2 py-1 whitespace-nowrap"
                                >
                                    <div className="flex gap-2 items-center">
                                        <span
                                            className="h-3 w-3 block rounded-full flex-shrink-0"
                                            style={{ backgroundColor: `${item.fill}` }}
                                        />
                                        <p className="capitalize">{item.month}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Catégorie</TableHead>
                                    <TableHead className="text-right">Mentions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chartData.map((row) => (
                                    <TableRow key={row.month}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="h-3 w-3 rounded-full"
                                                    style={{ backgroundColor: row.fill }}
                                                />
                                                {row.month}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{row.desktop}</TableCell>
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
