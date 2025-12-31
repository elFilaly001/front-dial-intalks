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
import { ExternalLink, ChevronLeft, ChevronRight, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface Feed {
  id: string
  link: string
  mentionCount: number
}

interface TopSharedLinksProps {
  feeds?: Feed[]
  itemsPerPage?: number
}

// Constants
const ITEMS_PER_PAGE_DEFAULT = 10

const MOCK_FEEDS: Feed[] = [
  { id: "1", link: "https://h24info.ma/culture/massinart-expo2025", mentionCount: 85 },
  { id: "2", link: "https://telquel.ma/culture/portrait-artiste-marocain", mentionCount: 70 },
  { id: "3", link: "https://lebrief.ma/culture/design-marocain-nouvelles-tendances", mentionCount: 55 },
  { id: "4", link: "https://afriqueart.ma/reportages/maroc-scene-artistique", mentionCount: 40 },
  { id: "5", link: "https://barlamane.com/arts/festival-lboulevard-2025", mentionCount: 35 },
  { id: "6", link: "https://morocco-world-news.com/art/massinart-community", mentionCount: 30 },
  { id: "7", link: "https://welovebuzz.com/lifestyle/creatifs-marocains-a-suivre", mentionCount: 25 },
  { id: "8", link: "https://onorient.com/artistes-marocains-nouvelle-scene", mentionCount: 20 },
  { id: "9", link: "https://artandabout.ma/musees-marocains-coups-de-coeur", mentionCount: 18 },
  { id: "10", link: "https://madeinmorocco.ma/design/artisanat-contemporain", mentionCount: 15 },
]

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname.replace("www.", "")
    return domain
  } catch {
    return url
  }
}

// Sub-components
const LinkItem = ({ feed, rank }: { feed: Feed; rank: number }) => (
  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
    <span className="flex-shrink-0 w-6 text-xs font-medium text-muted-foreground">
      #{rank}
    </span>
    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-cyan-100 flex items-center justify-center">
      <Link2 className="h-4 w-4 text-cyan-600" />
    </div>
    <div className="flex-1 min-w-0">
      <a
        href={feed.link}
        target="_blank"
        rel="noopener noreferrer"
        title={feed.link}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
      >
        <span className="truncate">{extractDomain(feed.link)}</span>
        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      <p className="text-xs text-muted-foreground truncate mt-0.5">
        {feed.link}
      </p>
    </div>
    <div className="flex-shrink-0 min-w-8 h-8 px-2 bg-cyan-100 text-cyan-600 rounded-md flex items-center justify-center text-xs font-semibold">
      {formatNumber(feed.mentionCount)}
    </div>
  </div>
)

const AIInsightBadge = ({ insight }: { insight: string }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative">
      <div
        className="text-sm text-black flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
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
      {isVisible && (
        <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {insight}
          </p>
        </div>
      )}
    </div>
  )
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => (
  <div className="flex items-center justify-between w-full">
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="gap-1"
    >
      <ChevronLeft className="h-4 w-4" />
      Précédent
    </Button>
    <div className="flex items-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-8 h-8 text-xs font-medium rounded-md transition-colors",
            currentPage === page
              ? "bg-cyan-500 text-white"
              : "hover:bg-cyan-100 text-muted-foreground"
          )}
        >
          {page}
        </button>
      ))}
    </div>
    <Button
      size="sm"
      variant="ghost"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="gap-1"
    >
      Suivant
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
)

// Main component
export default function TopSharedLinks({
  feeds = [],
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT,
}: TopSharedLinksProps) {
  const [currentPage, setCurrentPage] = React.useState(1)

  const displayFeeds = React.useMemo(
    () => (feeds.length > 0 ? feeds : MOCK_FEEDS),
    [feeds]
  )

  const totalPages = Math.ceil(displayFeeds.length / itemsPerPage)

  const currentItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return displayFeeds.slice(startIndex, startIndex + itemsPerPage)
  }, [displayFeeds, currentPage, itemsPerPage])

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  // Reset to first page when feeds change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [feeds])

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Top des liens partagés</CardTitle>
            <ToolTipsProvider title="Affiche les liens les plus partagés. Utilisez ces données pour identifier les sources les plus référencées par votre audience." />
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {displayFeeds.length} liens
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-3 pb-4">
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-1">
            {currentItems.map((feed, index) => (
              <LinkItem
                key={feed.id}
                feed={feed}
                rank={(currentPage - 1) * itemsPerPage + index + 1}
              />
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-4 pt-4 border-t">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="w-full flex justify-start">
          <AIInsightBadge
            insight="Recent mentions focus on Glovo's expansion and partnerships, with positive sentiment indicating growing acceptance. Negative feedback on commissions suggests opportunities for improved vendor relations."
          />
        </div>
      </CardFooter>
    </Card>
  )
}