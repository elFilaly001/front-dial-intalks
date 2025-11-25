"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ToolTipsProvider from "../charts/ToolTipsProvider"
import Image from "next/image"
import formatNumber from "@/lib/numbers"
import { ExternalLink } from "lucide-react"

type Feed = { id: string; link: string; mentionCount: number }

// Mock data for feeds
const mockFeeds: Feed[] = [
  { id: "1", link: "https://techcrunch.com/glovo-expansion", mentionCount: 120 },
  { id: "2", link: "https://forbes.com/glovo-partnerships", mentionCount: 95 },
  { id: "3", link: "https://medium.com/glovo-commissions", mentionCount: 60 },
  { id: "4", link: "https://wired.com/glovo-growth", mentionCount: 45 },
  { id: "5", link: "https://theverge.com/glovo-vendors", mentionCount: 30 },
  { id: "6", link: "https://bbc.com/glovo-morocco", mentionCount: 85 },
  { id: "7", link: "https://cnn.com/glovo-delivery", mentionCount: 70 },
  { id: "8", link: "https://nytimes.com/glovo-app", mentionCount: 55 },
  { id: "9", link: "https://wsj.com/glovo-business", mentionCount: 40 },
  { id: "10", link: "https://bloomberg.com/glovo-trends", mentionCount: 35 },
  { id: "11", link: "https://reuters.com/glovo-expansion", mentionCount: 50 },
  { id: "12", link: "https://apnews.com/glovo-partners", mentionCount: 65 },
  { id: "13", link: "https://guardian.com/glovo-issues", mentionCount: 25 },
  { id: "14", link: "https://economist.com/glovo-economy", mentionCount: 75 },
  { id: "15", link: "https://ft.com/glovo-growth", mentionCount: 60 },
  { id: "16", link: "https://businessinsider.com/glovo-app", mentionCount: 45 },
  { id: "17", link: "https://techradar.com/glovo-features", mentionCount: 30 },
  { id: "18", link: "https://mashable.com/glovo-social", mentionCount: 55 },
  { id: "19", link: "https://engadget.com/glovo-tech", mentionCount: 40 },
  { id: "20", link: "https://gizmodo.com/glovo-innovation", mentionCount: 35 },
]

export default function TopSharedLinks({ feeds = [] as Feed[] }) {
  const [showInsightBlogs, setShowInsightBlogs] = React.useState(false)
  const displayFeeds = feeds && feeds.length > 0 ? feeds : mockFeeds
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 15
  const totalPages = Math.ceil(displayFeeds.length / itemsPerPage)

  return (
    <Card className="flex-1 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Top Shared Links</CardTitle>
          <ToolTipsProvider title="Latest mentions from various sources, providing quick access to recent conversations and insights." />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2.5 pb-8">
        <div className="max-h-96 overflow-y-auto">
          {(() => {
            const startIndex = (currentPage - 1) * itemsPerPage
            const endIndex = startIndex + itemsPerPage
            const currentItems = displayFeeds.slice(startIndex, endIndex)
            return currentItems.map((feed) => (
              <div key={feed.id} className="flex items-center gap-4">
                <ExternalLink className="h-5 w-5 text-primary" />
                <a
                  href={feed.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={feed.link}
                  className="flex-1 text-sm text-blue-600 underline cursor-pointer break-words"
                >
                  {feed.link}
                </a>
                <div className="h-8 w-8 bg-primary rounded-full flex justify-center items-center text-white text-sm">
                  {formatNumber(feed.mentionCount)}
                </div>
              </div>
            ))
          })()}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pb-4">
        <div className="flex justify-between items-center w-full">
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <span className="text-sm">Page {currentPage} of {totalPages}</span>
          <Button size="sm" variant="outline" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </CardFooter>

      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsightBlogs(true)}
            onMouseLeave={() => setShowInsightBlogs(false)}
          >
            <Image
              src="/icons/IN-TALKS-logo.png-2.webp"
              alt="IN-TALKS Logo"
              width={22}
              height={22}
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span
              className="font-semibold"
              style={{
                background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
              }}
            >
              AI-powered insight
            </span>
          </div>
          {showInsightBlogs && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Recent mentions focus on Glovo&apos;s expansion and partnerships, with positive sentiment indicating growing acceptance. Negative feedback on commissions suggests opportunities for improved vendor relations.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}