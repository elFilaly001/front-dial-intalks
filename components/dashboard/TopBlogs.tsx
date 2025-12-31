
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
import { ExternalLink, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
interface Mention {
  id: string
  title: string
  link: string
  postedDate: string
  thumbnail: string
  snippet?: string
  source?: string
  type?: string
  mentionCount: number
}

interface TopBlogsProps {
  feeds?: Mention[]
  itemsPerPage?: number
}

// Constants
const ITEMS_PER_PAGE_DEFAULT = 10

const DEFAULT_MENTIONS: Mention[] = [
  {
    id: "1",
    title: "Le renouveau de l’art contemporain marocain",
    link: "https://macaalblog.org",
    postedDate: "2025-12-01",
    thumbnail: "",
    snippet:
      "Analyse des artistes émergents et expositions majeures au Maroc.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 120,
  },
  {
    id: "2",
    title: "Design marocain : les tendances 2025",
    link: "https://designmag.ma",
    postedDate: "2025-11-28",
    thumbnail: "",
    snippet:
      "Nouvelles influences, artisans contemporains et studios créatifs marocains.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 85,
  },
  {
    id: "3",
    title: "Les jeunes créatifs marocains à suivre",
    link: "https://creative-morocco.com",
    postedDate: "2025-11-25",
    thumbnail: "",
    snippet:
      "Portraits d’artistes, designers graphiques et photographes marocains.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 65,
  },
  {
    id: "4",
    title: "Street Art au Maroc : Casablanca en mouvement",
    link: "https://urbanart.ma",
    postedDate: "2025-11-20",
    thumbnail: "",
    snippet:
      "Zoom sur les fresques, festivals et collectifs de street-art.",
    source: "twitter",
    type: "NEUTRAL",
    mentionCount: 55,
  },
  {
    id: "5",
    title: "Artisanat moderne : quand tradition rime avec innovation",
    link: "https://craftstories.ma",
    postedDate: "2025-11-15",
    thumbnail: "",
    snippet:
      "Focus sur les créateurs marocains qui modernisent le patrimoine artisanal.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 45,
  },
  {
    id: "6",
    title: "Massinart Community : les projets qui inspirent 2025",
    link: "https://massinart.blog",
    postedDate: "2025-11-10",
    thumbnail: "",
    snippet:
      "Sélection d’œuvres, témoignages et initiatives de la communauté Massinart.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 40,
  },
  {
    id: "7",
    title: "Photographie marocaine : lumière et identité",
    link: "https://photoatlas.ma",
    postedDate: "2025-11-05",
    thumbnail: "",
    snippet:
      "Blog très suivi par les amateurs de photographie et arts visuels.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 35,
  },
  {
    id: "8",
    title: "Mode & culture : les designers marocains en pleine ascension",
    link: "https://fashionmaroc.net",
    postedDate: "2025-11-01",
    thumbnail: "",
    snippet:
      "Échos de la scène fashion marocaine et ses créateurs contemporains.",
    source: "tiktok",
    type: "NEUTRAL",
    mentionCount: 30,
  },
  {
    id: "9",
    title: "Architecture marocaine : un patrimoine revisité",
    link: "https://archimaroc.org",
    postedDate: "2025-10-28",
    thumbnail: "",
    snippet:
      "Articles sur l’architecture moderne, durable, et les restaurations patrimoniales.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 28,
  },
  {
    id: "10",
    title: "Musique alternative au Maroc : la scène 2024–2025",
    link: "https://leboulevardblog.ma",
    postedDate: "2025-10-25",
    thumbnail: "",
    snippet:
      "Très suivi par les jeunes artistes, musiciens et amateurs d'art urbain.",
    source: "twitter",
    type: "POSITIVE",
    mentionCount: 25,
  },
  {
    id: "11",
    title: "Culture numérique : IA & art au Maroc",
    link: "https://digitalculture.ma",
    postedDate: "2025-10-20",
    thumbnail: "",
    snippet:
      "Réflexions sur l’IA, la création digitale et le futur des industries culturelles.",
    source: "linkedin",
    type: "NEUTRAL",
    mentionCount: 20,
  },
  {
    id: "12",
    title: "Carnet de voyage artistique : Maroc & Afrique",
    link: "https://artnomad.africa",
    postedDate: "2025-10-15",
    thumbnail: "",
    snippet:
      "Explorations artistiques autour du continent, avec une forte communauté marocaine.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 15,
  },
]

// Sub-components
const BlogItem = ({ feed, rank }: { feed: Mention; rank: number }) => (
  <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
    <span className="flex-shrink-0 w-6 text-xs font-medium text-muted-foreground">
      #{rank}
    </span>
    <div
      className="flex-shrink-0 w-10 h-10 rounded-md bg-muted bg-cover bg-center"
      style={{ backgroundImage: `url(${feed.thumbnail})` }}
    >
      {!feed.thumbnail && (
        <div className="w-full h-full flex items-center justify-center bg-cyan-100">
          <FileText className="h-4 w-4 text-cyan-600" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <a
        href={feed.link}
        target="_blank"
        rel="noopener noreferrer"
        title={feed.title}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="truncate">{feed.title}</span>
        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
      {feed.snippet && (
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {feed.snippet.slice(0, 60)}...
        </p>
      )}
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
export default function TopBlogs({
  feeds = [],
  itemsPerPage = ITEMS_PER_PAGE_DEFAULT,
}: TopBlogsProps) {
  const [currentPage, setCurrentPage] = React.useState(1)

  const displayFeeds = React.useMemo(
    () => (feeds.length > 0 ? feeds : DEFAULT_MENTIONS),
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
            <CardTitle className="text-lg">Top des blogs</CardTitle>
            <ToolTipsProvider title="Affiche les blogs les plus mentionnés. Utilisez ces données pour identifier les blogs les plus référencés par votre audience." />
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {displayFeeds.length} blogs
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-3 pb-4">
        <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="space-y-1">
            {currentItems.map((feed, index) => (
              <BlogItem
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