"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaMale, FaFemale } from "react-icons/fa";

interface MentionsNumberWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function MentionsNumberWidget({ viewMode = "chart", dateRange }: MentionsNumberWidgetProps) {
    const malePercent = 45;
    const femalePercent = 55;
    const maleColor = "#06B6D4";
    const femaleColor = "#f161f9ff";

    const genderData = [
        { label: "Homme", percent: malePercent, color: maleColor, icon: <FaMale size={80} color={maleColor} /> },
        { label: "Femme", percent: femalePercent, color: femaleColor, icon: <FaFemale size={80} color={femaleColor} /> },
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Mentions par Genre</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <div className="flex items-center justify-center gap-16 w-full">
                        {genderData.map((g) => (
                            <div
                                key={g.label}
                                className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                                <div className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/30">
                                    <span aria-hidden>{g.icon}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                                        {g.label}
                                    </span>
                                    <span className="text-4xl font-bold tracking-tight" style={{ color: g.color }}>
                                        {g.percent}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
