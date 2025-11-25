
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

type Mention = {
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

const defaultMentions: Mention[] = [
  {
    id: "1",
    title: "Glovo expands in Morocco",
    link: "https://example.com/thumb1.jpg ",
    postedDate: "2025-11-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is expanding its delivery services to more cities in Morocco, aiming to cover both major urban centers and smaller towns. This expansion includes increasing the number of delivery partners, introducing faster delivery times, and offering more variety in the types of goods available for delivery. The company is also investing in local marketing campaigns to raise awareness and attract new users to its platform.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 120,
  },
  {
    id: "2",
    title: "Fast Delivery Trends 2025",
    link: "https://example.com/fast-delivery-trends",
    postedDate: "2025-10-28",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "The fast delivery market in North Africa is experiencing significant growth in 2025, with trends showing an increase in demand for same-day delivery, more sustainable packaging solutions, and innovative technology integration. Companies like Glovo and other regional players are adapting by expanding their networks, improving logistics efficiency, and offering a wider range of products, from groceries to electronics. Consumers are increasingly relying on app-based delivery services for convenience and speed.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 85,
  },
  {
    id: "3",
    title: "Glovo partners with local restaurants",
    link: "https://example.com/glovo-partners",
    postedDate: "2025-10-30",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo has partnered with over 50 local restaurants in Casablanca to expand its offerings and provide more diverse meal options to customers. However, some restaurant owners have raised concerns about commission fees and delivery logistics. While Glovo aims to strengthen its presence in the Moroccan market, balancing profitability for the restaurants and customer satisfaction remains a key challenge. The partnership is expected to increase overall app usage and drive more orders, but the company will need to address these concerns carefully.",
    source: "instagram",
    type: "NEGATIVE",
    mentionCount: 65,
  },
  {
    id: "4",
    title: "Rabat sees growth in app-based deliveries",
    link: "https://example.com/rabat-growth",
    postedDate: "2025-10-25",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Rabat has seen a remarkable growth in app-based delivery services this year, with a 35% increase in demand compared to the previous year. The surge is driven by changing consumer behavior, urbanization, and the increasing availability of smartphones. Businesses across the city are integrating delivery apps to meet customer expectations, and logistics companies are upgrading their infrastructure to handle higher order volumes. Experts predict that this trend will continue as more residents embrace digital solutions for everyday needs, from food delivery to groceries and retail products.",
    source: "instagram",
    type: "Article",
    mentionCount: 45,
  },
  {
    id: "5",
    title: "Glovo job opportunities in Morocco",
    link: "https://example.com/glovo-jobs",
    postedDate: "2025-10-20",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo is actively hiring delivery partners, customer support staff, and other roles across Morocco as part of its expansion strategy. The company offers competitive benefits, flexible working hours, and opportunities for career growth. While some potential employees have expressed concerns about workload and job stability, Glovo continues to focus on creating an efficient recruitment process and training programs. The goal is to support the increasing demand for delivery services while maintaining high-quality service and customer satisfaction.",
    source: "tiktok",
    type: "NEGATIVE",
    mentionCount: 30,
  },
  {
    id: "6",
    title: "New delivery zones in Marrakech",
    link: "https://example.com/marrakech-zones",
    postedDate: "2025-10-15",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has announced the addition of new delivery zones in Marrakech, covering popular tourist areas and residential neighborhoods. This move is expected to boost local businesses and provide faster service to customers in these areas.",
    source: "twitter",
    type: "POSITIVE",
    mentionCount: 55,
  },
  {
    id: "7",
    title: "Customer feedback on Glovo app",
    link: "https://example.com/app-feedback",
    postedDate: "2025-10-12",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Users have shared mixed feedback on the Glovo app's user interface and delivery tracking features. While many appreciate the real-time updates, some complain about occasional glitches and slow loading times.",
    source: "facebook",
    type: "NEUTRAL",
    mentionCount: 40,
  },
  {
    id: "8",
    title: "Glovo sustainability initiatives",
    link: "https://example.com/sustainability",
    postedDate: "2025-10-10",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Glovo is implementing eco-friendly practices, including the use of electric vehicles for deliveries and biodegradable packaging. This initiative aims to reduce the company's carbon footprint and appeal to environmentally conscious consumers.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 70,
  },
  {
    id: "9",
    title: "Delivery delays during peak hours",
    link: "https://example.com/delays",
    postedDate: "2025-10-08",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Customers have reported longer wait times during peak hours, leading to dissatisfaction. Glovo is working on optimizing their logistics to handle increased demand more efficiently.",
    source: "tiktok",
    type: "NEGATIVE",
    mentionCount: 25,
  },
  {
    id: "10",
    title: "Partnership with local supermarkets",
    link: "https://example.com/supermarkets",
    postedDate: "2025-10-05",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has expanded its grocery delivery options by partnering with major supermarkets across Morocco. This collaboration offers customers a wider selection of products and competitive pricing.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 90,
  },
  {
    id: "11",
    title: "Glovo customer loyalty program",
    link: "https://example.com/loyalty",
    postedDate: "2025-10-03",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "The new loyalty program rewards frequent users with discounts and free deliveries. Early feedback indicates that it has increased customer retention and app usage.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 60,
  },
  {
    id: "12",
    title: "Challenges in rural delivery",
    link: "https://example.com/rural-delivery",
    postedDate: "2025-10-01",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Delivering to rural areas remains a challenge due to infrastructure limitations. Glovo is exploring solutions like drone deliveries to improve service in these regions.",
    source: "twitter",
    type: "NEUTRAL",
    mentionCount: 35,
  },
  {
    id: "13",
    title: "Glovo app security updates",
    link: "https://example.com/security",
    postedDate: "2025-09-28",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Recent security updates have enhanced data protection for users. This includes improved encryption and secure payment methods, addressing previous concerns about privacy.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 50,
  },
  {
    id: "14",
    title: "Increase in delivery fees",
    link: "https://example.com/fees",
    postedDate: "2025-09-25",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Glovo has adjusted delivery fees to cover rising operational costs. While necessary, this has sparked debates among users about affordability.",
    source: "instagram",
    type: "NEGATIVE",
    mentionCount: 45,
  },
  {
    id: "15",
    title: "New features in Glovo app",
    link: "https://example.com/new-features",
    postedDate: "2025-09-22",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "The latest app update introduces features like group ordering and scheduled deliveries. Users are excited about these additions, which enhance convenience.",
    source: "tiktok",
    type: "POSITIVE",
    mentionCount: 75,
  },
  {
    id: "16",
    title: "Glovo's impact on local economy",
    link: "https://example.com/economy",
    postedDate: "2025-09-20",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "By connecting consumers with local businesses, Glovo has stimulated economic growth in Morocco. Small vendors report increased sales through the platform.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 80,
  },
  {
    id: "17",
    title: "Customer service improvements",
    link: "https://example.com/service",
    postedDate: "2025-09-18",
    thumbnail: "/mentions/Glovo-1.png",
    snippet:
      "Glovo has upgraded its customer support with 24/7 chat assistance. Response times have improved, leading to higher satisfaction rates.",
    source: "instagram",
    type: "POSITIVE",
    mentionCount: 55,
  },
  {
    id: "18",
    title: "Weather-related delivery issues",
    link: "https://example.com/weather",
    postedDate: "2025-09-15",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Heavy rains have caused delays in deliveries. Glovo is advising customers to plan ahead and offering rain checks for affected orders.",
    source: "twitter",
    type: "NEUTRAL",
    mentionCount: 30,
  },
  {
    id: "19",
    title: "Glovo expands to new categories",
    link: "https://example.com/categories",
    postedDate: "2025-09-12",
    thumbnail: "/mentions/Glovo-2.webp",
    snippet:
      "Beyond food and groceries, Glovo now offers delivery for electronics and household items. This diversification is attracting a broader customer base.",
    source: "facebook",
    type: "POSITIVE",
    mentionCount: 65,
  },
  {
    id: "20",
    title: "Feedback on delivery personnel",
    link: "https://example.com/personnel",
    postedDate: "2025-09-10",
    thumbnail: "/mentions/glovo.webp",
    snippet:
      "Delivery partners are praised for their professionalism, but there are occasional complaints about package handling. Glovo is providing additional training.",
    source: "instagram",
    type: "MIXED",
    mentionCount: 40,
  },
]

export default function TopBlogs({ feeds = defaultMentions }: { feeds?: Mention[] }) {
  const [showInsightBlogs, setShowInsightBlogs] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 15
  const totalPages = Math.ceil(feeds.length / itemsPerPage)

  return (
    <Card className="flex-1 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Top Blogs</CardTitle>
          <ToolTipsProvider title="Latest mentions from various sources, providing quick access to recent conversations and insights." />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2.5 pb-8">
        <div className="max-h-96 overflow-y-auto">
          {(() => {
            const startIndex = (currentPage - 1) * itemsPerPage
            const endIndex = startIndex + itemsPerPage
            const currentItems = feeds.slice(startIndex, endIndex)
            return currentItems.map((feed) => (
              <div key={feed.id} className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-md bg-gray-700 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feed.thumbnail})` }}
                ></div>
                <div className="flex flex-1 justify-between items-center">
                  <div>
                    <a
                      href={feed.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline cursor-pointer block"
                    >
                      {feed.title}
                    </a>
                    {feed.snippet && (
                      <a
                        href={feed.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-600 hover:underline cursor-pointer block"
                        dangerouslySetInnerHTML={{ __html: feed.snippet.slice(0, 60) }}
                      />
                    )}
                  </div>
                  <div className="h-10 w-10 bg-primary text-white rounded-full flex justify-center items-center text-xs">
                    {formatNumber(feed.mentionCount)}
                  </div>
                </div>
              </div>
            ))
          })()}
        </div>
      </CardContent>

      <CardFooter className="gap-2 pb-12">
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