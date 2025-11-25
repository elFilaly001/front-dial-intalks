"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Smile, Frown, Meh } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";
// ShareOfVoice palette used across the dashboard
const palette = [
  "#10B981", // green
  "#6B7280", // gray
  "#EF4444", // red
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
];

// Default brands palette (used if parent doesn't pass rows)
const defaultBrands = [
    { label: 'Jumia Food', value: 35000, color: palette[0] }, // green
    { label: 'Yasser Market', value: 25000, color: palette[1] }, // gray
    { label: 'Kool', value: 18000, color: palette[2] }, // red
    { label: 'Livery', value: 15000, color: palette[3] }, // orange/amber
    { label: 'Creem Food', value: 9000, color: palette[4] }, // purple
];

// Sentiment breakdowns for the five Moroccan competitors (positive / negative).
const defaultPositive = [3500, 2600, 1800, 1500, 800];
const defaultNegative = [4200, 3000, 2000, 1700, 900];

function parseFollowersCount(s: string | number | undefined) {
    if (typeof s === 'number') return s
    if (!s) return 0
    const v = String(s).trim().toUpperCase()
    const clean = v.replace(/[,\s]/g, '')
    const m = clean.match(/^([0-9]*\.?[0-9]+)\s*([KM]?)$/)
    if (!m) return Number(clean) || 0
    const num = parseFloat(m[1])
    const suffix = m[2]
    if (suffix === 'M') return Math.round(num * 1_000_000)
    if (suffix === 'K') return Math.round(num * 1_000)
    return Math.round(num)
}

type BrandRow = { label: string; followers?: string | number; color?: string }

type Props = {
    rows?: BrandRow[]
}

function buildData(labels: string[], values: number[], colors: string[]) {
    return labels.map((label, index) => ({
        name: label,
        value: values[index],
        fill: colors[index],
    }));
}

export default function ShareOfVoiceByMentionsDonut({ rows }: Props) {
    const [showInsight, setShowInsight] = useState(false);

    const brands = rows && rows.length > 0 ? rows.map((r, i) => ({ label: r.label, value: parseFollowersCount(r.followers), color: r.color || palette[i % palette.length] })) : defaultBrands

    const positive = rows && rows.length > 0 ? brands.map((b) => Math.round(b.value * 0.1)) : defaultPositive
    const negative = rows && rows.length > 0 ? brands.map((b) => Math.round(b.value * 0.12)) : defaultNegative
    const neutral = brands.map((b, i) => b.value - (positive[i] || 0) - (negative[i] || 0))

    const brandValues = brands.map((b) => b.value)
    const brandColors = brands.map((b) => b.color)

    const labels = brands.map((b) => b.label)
    const mainData = buildData(labels, brandValues, brandColors)
    const posData = buildData(labels, positive, brandColors)
    const negData = buildData(labels, negative, brandColors)
    const neuData = buildData(labels, neutral, brandColors)

    const totalMentions = brandValues.reduce((a, b) => a + b, 0);

    // helper to format legend rows (count + percent)
    const legendRows = (values: number[]) => {
        const total = values.reduce((a, b) => a + b, 0) || 1;
        return brands.map((b, i) => ({
            label: b.label,
            color: b.color,
            count: values[i],
            percent: ((values[i] / total) * 100),
        }));
    };

    const mainLegend = legendRows(brandValues);
    const posLegend = legendRows(positive);
    const negLegend = legendRows(negative);
    const neuLegend = legendRows(neutral);

    return (
        <Card className="relative">
            <CardHeader className="items-center">
                <div className="flex items-center gap-2">
                    <CardTitle>Share of Voice by Mentions</CardTitle>
                    <ToolTipsProvider
                        title="Breakdown of mentions across topics with sentiment analysis. The main chart shows share of voice by brand, while the smaller charts show positive, negative, and neutral sentiment distribution."
                    />
                </div>
            </CardHeader>

            <CardContent className="pb-16">
                <div className="grid grid-cols-3 gap-6">
                {/* Left: large donut (spans 2/3) */}
                <div className="col-span-2 flex flex-col">
                    <div className="relative w-full h-64 md:h-72 lg:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={mainData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    dataKey="value"
                                >
                                    {mainData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-2xl font-bold text-gray-800">{totalMentions.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Jan 06, 2023 - Feb 04, 2023</div>
                        </div>
                    </div>

                    {/* bottom compact legend, centered under the big donut and wraps as needed */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-600">
                        {mainLegend.map((l) => (
                            <div key={l.label} className="flex items-center gap-2">
                                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: l.color }} />
                                <span className="whitespace-nowrap">{l.label}: {l.count.toLocaleString()} ({l.percent.toFixed(1)}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: three small donuts (1/3) */}
                <div className="col-span-1 flex flex-col gap-3">
                    {/* Positive */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={posData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={15}
                                        outerRadius={35}
                                        dataKey="value"
                                    >
                                        {posData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Smile className="w-4 h-4 text-green-600" />
                                    <div className="text-xs font-medium">Share of Positive</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {posLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Negative */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={negData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={15}
                                        outerRadius={35}
                                        dataKey="value"
                                    >
                                        {negData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Frown className="w-4 h-4 text-red-600" />
                                    <div className="text-xs font-medium">Share of Negative</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {negLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Neutral */}
                    <div className="flex items-center gap-3 p-2 border rounded-md">
                        <div className="w-20 h-20 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={neuData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={15}
                                        outerRadius={35}
                                        dataKey="value"
                                    >
                                        {neuData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Meh className="w-4 h-4 text-gray-500" />
                                    <div className="text-xs font-medium">Share of Neutral</div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {neuLegend.map((l) => (
                                    <div key={l.label} className="flex items-center gap-2">
                                        <span className="w-2 h-2 inline-block rounded-sm" style={{ background: l.color }} />
                                        <span className="truncate">{l.count.toLocaleString()} ({l.percent.toFixed(2)}%)</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-6">
                <div className="relative">
                    <div
                        className="text-sm text-black flex items-center gap-2 cursor-pointer"
                        onMouseEnter={() => setShowInsight(true)}
                        onMouseLeave={() => setShowInsight(false)}
                    >
                        <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} className="inline-block align-middle" />
                        <span
                            className="font-semibold"
                            style={{
                                background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                color: 'transparent',
                                display: 'inline-block',
                            }}
                        >
                            AI-powered insight
                        </span>
                    </div>
                    {showInsight && (
                        <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Ryanair dominates mentions with 35,000 total mentions, representing the largest share of voice. The sentiment breakdown shows positive mentions are highest across all brands, indicating generally favorable perception in the market.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
    );
}
