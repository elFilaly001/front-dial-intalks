"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { fetchImages } from "@/lib/fetchImages";

// Sample data for mentions over four sections (S1..S4) to match the target line chart
const mentionsByPeriodData = [
  { period: "1 Fev", x: 80, facebook: 40, instagram: 60, tiktok: 90, news: 15 },
  { period: "2 Mar", x: 95, facebook: 30, instagram: 55, tiktok: 110, news: 12 },
  { period: "3 Avr", x: 70, facebook: 35, instagram: 58, tiktok: 105, news: 18 },
  { period: "4 Mai", x: 75, facebook: 38, instagram: 62, tiktok: 98, news: 20 },
];

const mentionsByPeriodConfig = {
  x: {
    label: "Twitter/X",
    color: "#000000",
  },
  facebook: {
    label: "Facebook",
    color: "#f97316",
  },
  instagram: {
    label: "Instagram",
    color: "#ec4899",
  },
  tiktok: {
    label: "TikTok",
    color: "#d946ef",
  },
  news: {
    label: "News",
    color: "#38bdf8",
  },
};

const mentions = [
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
  },
];

interface MentionFeed {
  id: string;
  title: string;
  link: string;
  postedDate: string;
  thumbnail: string;
  snippet?: string;
  source: string;
  type: string;
}

interface SectionCardsProps {
  filters: any;
  data: any;
}

export function InsightCards({ filters, data }: SectionCardsProps) {
  const [showInsight1, setShowInsight1] = useState(false);
  const [showInsight2, setShowInsight2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Use only `data.latestMention` (passed from parent). Fallback to local sample `mentions`.
  const mentionsList: MentionFeed[] = Array.isArray(data?.latestMention)
    ? data!.latestMention
    : mentions;

  const totalPages = Math.max(1, Math.ceil(mentionsList.length / itemsPerPage));



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <Card className="relative w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Répartition des Mentions par Source</CardTitle>
            <ToolTipsProvider
              title="Répartition des mentions sur différentes sources (ex : Facebook, X, Instagram) au fil du temps. Utilisez cela pour voir quels canaux génèrent le plus de conversations."
            />
          </div>
        </CardHeader>
        <CardContent className="pb-16">
          <ChartContainer config={mentionsByPeriodConfig}>
            <LineChart data={mentionsByPeriodData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="x"
                stroke={mentionsByPeriodConfig.x.color}
                strokeWidth={2}
                dot={false}
                name={mentionsByPeriodConfig.x.label}
              />
              <Line
                type="monotone"
                dataKey="facebook"
                stroke={mentionsByPeriodConfig.facebook.color}
                strokeWidth={2}
                dot={false}
                name={mentionsByPeriodConfig.facebook.label}
              />
              <Line
                type="monotone"
                dataKey="instagram"
                stroke={mentionsByPeriodConfig.instagram.color}
                strokeWidth={2}
                dot={false}
                name={mentionsByPeriodConfig.instagram.label}
              />
              <Line
                type="monotone"
                dataKey="tiktok"
                stroke={mentionsByPeriodConfig.tiktok.color}
                strokeWidth={2}
                dot={false}
                name={mentionsByPeriodConfig.tiktok.label}
              />
              <Line
                type="monotone"
                dataKey="news"
                stroke={mentionsByPeriodConfig.news.color}
                strokeWidth={2}
                dot={false}
                name={mentionsByPeriodConfig.news.label}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <div className="absolute bottom-4 left-6">
          <div className="relative">
            <div
              className="text-sm text-black flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowInsight1(true)}
              onMouseLeave={() => setShowInsight1(false)}
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
                AI-Powered Insight
              </span>
            </div>
            {showInsight1 && (
              <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Facebook domine les mentions sur les réseaux sociaux avec une part de 38%, indiquant une forte présence de la marque sur cette plateforme. Le graphique en barres empilées montre un engagement constant sur tous les réseaux au cours des trois périodes.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
      <Card className="relative w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Dernières Mentions</CardTitle>
            <ToolTipsProvider
              title="Dernières mentions provenant de différentes sources, offrant un accès rapide aux conversations et insights récents."
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 mb-3 pb-8">
          <div className="max-h-96 overflow-y-auto space-y-3">
            {(() => {
              const startIndex = (currentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;


              const currentItems: MentionFeed[] = (mentionsList || []).slice(startIndex, endIndex);

              return (currentItems || []).map((feed: any) => (
                <div key={feed.id} className="flex items-center gap-2">
                  <div
                    className="h-16 w-16 rounded-md bg-gray-700 bg-cover bg-center"
                    style={{ backgroundImage: feed.thumbnail ? `url(${fetchImages(feed.thumbnail)})` : 'none' }}
                  ></div>
                  <div className="flex flex-1 justify-between items-center">
                    <div>
                      {feed.title}
                      {feed.snippet && (
                        <p
                          className="text-xs"
                          dangerouslySetInnerHTML={{
                            __html: feed.snippet.slice(0, 85),
                          }}
                        ></p>
                      )}
                    </div>
                    <div className="h-8 w-8 bg-main text-white rounded-full flex justify-center items-center">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </CardContent>
        <CardFooter className="gap-2 pb-8">
          <div className="flex justify-between items-center w-full">
            <Button size="sm" variant="outline" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Précédent
            </Button>
            <span className="text-sm">Page {currentPage} sur {totalPages}</span>
            <Button size="sm" variant="outline" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Suivant
            </Button>
          </div>
        </CardFooter>
        <div className="absolute bottom-4 left-6">
          <div className="relative">
            <div
              className="text-sm text-black flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setShowInsight2(true)}
              onMouseLeave={() => setShowInsight2(false)}
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
                AI-Powered Insight
              </span>
            </div>
            {showInsight2 && (
              <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Les mentions sur les réseaux sociaux montrent une augmentation de 25% du sentiment positif pour les services de livraison. Facebook arrive en tête avec 40% du total des mentions, suivi d&apos;Instagram à 30%. Les sujets clés incluent l&apos;expansion du service, les partenariats et l&apos;amélioration de la satisfaction client.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}