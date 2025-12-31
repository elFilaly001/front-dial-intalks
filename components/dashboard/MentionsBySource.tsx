"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ToolTipsProvider from "../charts/ToolTipsProvider"
import Image from "next/image"
import formatNumber from "@/lib/numbers"

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
    icon: "/media/twitter.png",
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
].sort((a, b) => b.value - a.value)

export default function MentionsBySource() {
  const [showInsight, setShowInsight] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>(undefined)
  const totalValue = followersData.reduce((sum, entry) => sum + entry.value, 0)
  const chartData = followersData.map((entry) => ({
    ...entry,
    totalValue,
    percent: ((entry.value / totalValue) * 100).toFixed(1)
  }))

  return (
    <Card className="flex-1 relative overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Mentions par source</CardTitle>
            <ToolTipsProvider title="Répartition des mentions par plateforme sociale, montrant la portée et l'engagement sur chaque canal." />
          </div>
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
        {/* Legend */}
        <div className="flex flex-col gap-2">
          {chartData.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${activeIndex === index ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(undefined)}
            >
              <Image
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
      </CardContent>

      {/* AI Insight Footer */}
      <div className="absolute bottom-4 left-6 right-6">
        <div className="relative">
          <div
            className="text-sm flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image
              src="/icons/IN-TALKS-logo.png-2.webp"
              alt="IN-TALKS Logo"
              width={20}
              height={20}
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span
              className="font-medium text-sm"
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 w-auto min-w-80 max-w-xl backdrop-blur-sm">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                TikTok leads with 175K followers, followed by Instagram at 150K, indicating strong visual content engagement. Facebook and LinkedIn show solid presence, while YouTube and Twitter have room for growth in follower acquisition.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}