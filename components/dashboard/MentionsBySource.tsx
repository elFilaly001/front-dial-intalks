


"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ToolTipsProvider from "../charts/ToolTipsProvider"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import Image from "next/image"
import formatNumber from "@/lib/numbers"

const followersData = [
  {
    name: "YouTube",
    value: 50000,
    label: 50000,
    color: "url(#color-youtube)",
    icon: "/media/youtube.png",
  },
  {
    name: "Instagram",
    value: 150000,
    label: 150000,
    color: "url(#color-instagram)",
    icon: "/media/instagram.png",
  },
  {
    name: "TikTok",
    value: 175000,
    label: 175000,
    color: "url(#color-tiktok)",
    icon: "/media/tiktok.png",
  },
  {
    name: "Twitter",
    value: 60000,
    label: 60000,
    color: "url(#color-twitter)",
    icon: "/media/twitter.png?v=12",
  },
  {
    name: "LinkedIn",
    value: 20000,
    label: 20000,
    color: "url(#color-linkedin)",
    icon: "/media/linkedin.png",
  },
  {
    name: "Facebook",
    value: 110000,
    label: 110000,
    color: "url(#color-facebook)",
    icon: "/media/facebook.png",
  },
].sort((a, b) => b.value - a.value)

interface TooltipPayload {
  name: string;
  value: number;
  label: number;
  color: string;
  icon: string;
  totalValue?: number;
}

interface PayloadItem {
  payload: TooltipPayload;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomPieTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const entry = payload[0].payload;
    // Calculate percent
    const total =
      payload[0].payload.totalValue ||
      payload.reduce((sum: number, p: PayloadItem) => sum + p.payload.value, 0);
    const percent = total ? ((entry.value / total) * 100).toFixed(1) : "0";
    return (
      <div
        style={{
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          padding: "0.35rem 0.6rem",
          minWidth: "70px",
          color: "#222",
          fontSize: "0.85rem",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
          <Image
            src={entry.icon}
            alt={entry.name}
            width={16}
            height={16}
            style={{ borderRadius: "3px" }}
          />
          <span>{entry.name}</span>
          <span
            style={{ color: "#888", fontSize: "0.8em", marginLeft: "0.25em" }}
          >
            {percent}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function MentionsBySource() {
  const [showInsight, setShowInsight] = React.useState(false)
  const totalValue = followersData.reduce((sum, entry) => sum + entry.value, 0)
  const chartData = followersData.map((entry) => ({ ...entry, totalValue }))

  return (
    <Card className="flex-1 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Mentions by source</CardTitle>
          <ToolTipsProvider title="Distribution of followers across social media platforms, showing the reach and engagement on each channel." />
        </div>
      </CardHeader>
      <CardContent className="pb-16">
        <div className="flex flex-col items-center gap-5">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <defs>
                <linearGradient id="color-youtube" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff0000" />
                </linearGradient>
                <linearGradient id="color-tiktok" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="color-instagram" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4f5bd5" />
                  <stop offset="25%" stopColor="#962fbf" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="75%" stopColor="#fa7e1e" />
                  <stop offset="100%" stopColor="#feda75" />
                </linearGradient>
                <linearGradient id="color-twitter" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1DA1F2" />
                </linearGradient>
                <linearGradient id="color-linkedin" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0077B5" />
                  <stop offset="100%" stopColor="#005582" />
                </linearGradient>
                <linearGradient id="color-facebook" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1877F2" />
                  <stop offset="100%" stopColor="#145DBF" />
                </linearGradient>
              </defs>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={0} outerRadius={80} stroke="transparent" paddingAngle={0}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend flex justify-center w-full items-center gap-3">
            {chartData.map(
              (entry, index) =>
                entry.label && (
                  <div key={`legend-item-${index}`} className="legend-item flex items-center gap-2">
                    <Image src={entry.icon} alt={entry.icon} width={17} height={17} />
                    <span>{formatNumber(entry.label)}</span>
                  </div>
                )
            )}
          </div>
        </div>
      </CardContent>
      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div className="text-sm text-black flex items-center gap-2 cursor-pointer" onMouseEnter={() => setShowInsight(true)} onMouseLeave={() => setShowInsight(false)}>
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{ display: "inline-block", verticalAlign: "middle" }} />
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}>
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                TikTok leads with 175K followers, followed by Instagram at 150K, indicating strong visual content engagement. Facebook and LinkedIn show solid presence, while YouTube and Twitter have room for growth in follower acquisition.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}