"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Download,
  Eye,
  MessageCircle,
  Smile,
  Key,
  TrendingUp,
} from "lucide-react";
import { CompactDatePicker } from "@/components/ui/CompactDatePicker";
import { useState } from "react";

const reports = [
  {
    id: "overview",
    title: "Overview Report",
    desc: "Get a complete view of your brand&apos;s digital presence — mentions, reach, sentiment, and engagement, all in one dashboard.",
    href: "/reports/overview",
    Icon: Eye,
    image: "/image-report.png",
  },
  {
    id: "mentions",
    title: "Mentions Report",
    desc: "Track total and daily mentions across channels to understand visibility peaks and audience activity trends.",
    href: "/reports/mentions-summary",
    Icon: MessageCircle,
    image: "/image-report.png",
  },
  {
    id: "sentiment",
    title: "Sentiment Report",
    desc: "Analyze the tone of conversations to identify positive, neutral, and negative trends shaping your brand&apos;s reputation.",
    href: "/reports/sentiment",
    Icon: Smile,
    image: "/image-report.png",
  },
  {
    id: "keywords",
    title: "Keyword Report",
    desc: "Discover top keywords and topics driving discussions around your brand or industry to uncover what really matters to your audience.",
    href: "/reports/keywords",
    Icon: Key,
    image: "/image-report.png",
  },
  {
    id: "competitive",
    title: "Competitive Intelligence Report",
    desc: "Compare your brand&apos;s performance with competitors through mentions, share of voice, and sentiment to spot opportunities and threats.",
    href: "/reports/share-of-voice",
    Icon: TrendingUp,
    image: "/image-report.png",
  },
];

const Page = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });
  return (
    <div className="@container/main mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="px-2">
            <h2 className="text-2xl my-3 font-semibold text-purple-700">Rapports</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Générez et téléchargez des rapports détaillés sur vos performances sur
              les réseaux sociaux, les insights d&apos;audience et plus encore.
            </p>
          </div>
          <CompactDatePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-2 gap-6">
          {reports.map((r) => (
            <Link key={r.id} href={r.href} className="block">
              <Card className="relative hover:shadow-lg transition-shadow h-full flex flex-col justify-between overflow-hidden">
                {/* header band / thumbnail */}
                <Image
                  src={r.image}
                  alt={r.title}
                  width={400}
                  height={128}
                  className="w-full h-32 object-cover"
                />

                <CardContent className="pt-2 pb-4">
                  <CardHeader className="p-0 mb-1">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <r.Icon className="w-5 h-5 text-sky-600" />
                      <span className="font-medium">{r.title}</span>
                    </CardTitle>
                  </CardHeader>

                  <p className="text-sm text-muted-foreground mb-2">{r.desc}</p>

                  <div className="mt-4">
                    <div className="w-full h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center gap-2 text-sky-600 font-medium hover:bg-sky-100 cursor-pointer transition">
                      Télécharger
                      <Download className="w-4 h-4 text-sky-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
