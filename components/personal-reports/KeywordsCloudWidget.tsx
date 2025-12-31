"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { keywords as rawKeywords } from "@/data/keywords";

type KeywordData = { keyword: string; count: number };

// Generate sample data
const keywords: KeywordData[] = rawKeywords.map((k, idx) => ({
    keyword: k,
    count: ((idx * 17 + 13) % 100) + 1,
}));

interface KeywordsCloudWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function KeywordsCloudWidget({ viewMode = "chart", dateRange }: KeywordsCloudWidgetProps) {
    // Sort keywords by count descending
    const sortedKeywords = [...keywords].sort((a, b) => b.count - a.count);

    // Find min/max count for scaling
    const counts = sortedKeywords.map(k => k.count);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);

    // Font size range
    const minFont = 14;
    const maxFont = 64;
    // Palette
    const colors = ["#ffbf26", "#ea1c80", "#8b0b6f", "#40bb3c", "#aea6cf", "#ff0c00"];
    const highlightColors = ["#ff0c00", "#ea1c80", "#40bb3c"];

    // Deterministic pseudo-random rotation based on index
    const getRotation = (idx: number): number => {
        const rotations = [-8, 5, -3, 7, -6, 4, -9, 2, -5, 8, -2, 6, -7, 3, -4, 9];
        return rotations[idx % rotations.length];
    };

    // Quadratic scale for font size
    const getStyles = (count: number, idx: number, sortedIdx: number): React.CSSProperties => {
        const fontSize = minCount === maxCount
            ? maxFont
            : minFont + Math.pow((count - minCount) / (maxCount - minCount), 2) * (maxFont - minFont);
        // Highlight top 3 keywords
        const color = sortedIdx < 3 ? highlightColors[sortedIdx] : colors[idx % colors.length];
        return {
            color,
            fontSize: `${Math.round(fontSize)}px`,
            transform: `rotate(${getRotation(idx)}deg)`,
            display: "inline-block",
            margin: "2px",
            cursor: "pointer",
            fontWeight: sortedIdx < 3 ? "bolder" : "bold",
            textShadow: sortedIdx < 3 ? "0 2px 8px rgba(0,0,0,0.15)" : undefined,
            transition: "transform 0.3s ease",
        };
    };

    return (
        <Card className="col-span-1 xl:col-span-2 relative">
            <CardHeader>
                <CardTitle className="font-semibold">
                    Nuage de Mots
                </CardTitle>
            </CardHeader>
            <CardContent className="pb-16">
                {viewMode === "chart" ? (
                    <div className="flex flex-wrap justify-center items-center gap-0 mt-8 text-center">
                        {sortedKeywords.map((item, idx) => (
                            <span
                                key={item.keyword}
                                className="mx-5 hover:scale-110 transition-colors duration-300 ease-in-out"
                                style={getStyles(item.count, idx, idx)}
                                dangerouslySetInnerHTML={{ __html: item.keyword }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mot-clé</TableHead>
                                    <TableHead className="text-right">Fréquence</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedKeywords.map((row) => (
                                    <TableRow key={row.keyword}>
                                        <TableCell className="font-medium" dangerouslySetInnerHTML={{ __html: row.keyword }} />
                                        <TableCell className="text-right">{row.count}</TableCell>
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
