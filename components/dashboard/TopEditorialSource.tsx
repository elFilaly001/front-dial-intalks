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
import formatNumber from "@/lib/numbers"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface EditorialSource {
  name: string
  mentionCount: number
}

interface TopEditorialSourceProps {
  sources?: EditorialSource[]
  itemsPerPage?: number
}

// Constants
const ITEMS_PER_PAGE_DEFAULT = 10

const DEFAULT_SOURCES: EditorialSource[] = [
  { name: "Art & Design Magazine", mentionCount: 120 },
  { name: "Interior Design Weekly", mentionCount: 95 },
  { name: "Home Decor Insider", mentionCount: 78 },
  { name: "Le Monde de l'Art", mentionCount: 64 },
  { name: "Décoration Moderne", mentionCount: 50 },
  { name: "Architectural Digest", mentionCount: 85 },
  { name: "Elle Décoration", mentionCount: 70 },
  { name: "Maison & Objet", mentionCount: 55 },
  { name: "Art Basel News", mentionCount: 40 },
  { name: "Design Milk", mentionCount: 35 },
  { name: "Dezeen", mentionCount: 50 },
  { name: "Wallpaper Magazine", mentionCount: 65 },
  { name: "Artsy Editorial", mentionCount: 25 },
  { name: "The Art Newspaper", mentionCount: 75 },
  { name: "AD France", mentionCount: 60 },
  { name: "Côté Maison", mentionCount: 45 },
  { name: "Art Review", mentionCount: 30 },
  { name: "Design Boom", mentionCount: 55 },
  { name: "Artnet News", mentionCount: 40 },
  { name: "Surface Magazine", mentionCount: 35 },
]

// Helper function
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("")
}

// Sub-components
const SourceItem = ({ source, rank }: { source: EditorialSource; rank: number }) => (
  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
    <span className="flex-shrink-0 w-6 text-xs font-medium text-muted-foreground">
      #{rank}
    </span>
    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-semibold">
      {getInitials(source.name)}
    </div>
    <div className="flex-1 min-w-0">
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(source.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Rechercher ${source.name}`}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="truncate">{source.name}</span>
        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </div>
    <div className="flex-shrink-0 min-w-8 h-8 px-2 bg-cyan-100 text-cyan-600 rounded-md flex items-center justify-center text-xs font-semibold">
      {formatNumber(source.mentionCount)}
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
export default function TopEditorialSource({
  sources = [],
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT,
}: TopEditorialSourceProps) {
  const [currentPage, setCurrentPage] = React.useState(1)

  const displaySources = React.useMemo(
    () => (sources.length > 0 ? sources : DEFAULT_SOURCES),
    [sources]
  )

  const totalPages = Math.ceil(displaySources.length / itemsPerPage)

  const currentItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return displaySources.slice(startIndex, startIndex + itemsPerPage)
  }, [displaySources, currentPage, itemsPerPage])

  const handlePageChange = React.useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  // Reset to first page when sources change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [sources])

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Top des sources éditoriales</CardTitle>
            <ToolTipsProvider title="Affiche les principales sources éditoriales selon le nombre de mentions. Utilisez ces données pour identifier les publications clés pour les relations publiques et la communication." />
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {displaySources.length} sources
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-3 pb-4">
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-1">
            {currentItems.map((source, index) => (
              <SourceItem
                key={source.name}
                source={source}
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
            insight="Recent mentions focus on Massinart's unique art collections and interior design partnerships, with positive sentiment indicating growing recognition in the decor industry. Feedback highlights opportunities for expanding artist collaborations and exclusive home decor offerings."
          />
        </div>
      </CardFooter>
    </Card>
  )
}