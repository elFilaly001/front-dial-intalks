"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";

type KeywordData = { keyword: string; count: number };

const KeywordsNuage = ({ keywords }: { keywords: KeywordData[] }) => {
  const [showInsight, setShowInsight] = useState(false);

  // Sort keywords by count descending
  const sortedKeywords = [...keywords].sort((a, b) => b.count - a.count);

  // Find min/max count for scaling
  const counts = sortedKeywords.map(k => k.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  // Font size range
  const minFont = 14;
  const maxFont = 64;
  const colors = ["#1DA1F2", "#FF4500", "#FFAA00", "#6A5ACD", "#17A589"];
  const highlightColors = ["#e91e63", "#009688", "#ff9800"];

  // Quadratic scale for font size
  const getStyles = (count: number, idx: number, sortedIdx: number): React.CSSProperties => {
    const fontSize = minCount === maxCount
      ? maxFont
      : minFont + Math.pow((count - minCount) / (maxCount - minCount), 2) * (maxFont - minFont);
    // Highlight top 3 keywords
    const color = sortedIdx < 3 ? highlightColors[sortedIdx] : colors[idx % colors.length];
    return {
      color,
      fontSize: `${fontSize}px`,
      transform: `rotate(${Math.floor(Math.random() * 21) - 10}deg)`,
      display: "inline-block",
      margin: "2px",
      cursor: "pointer",
      fontWeight: sortedIdx < 3 ? "bolder" : "bold",
      textShadow: sortedIdx < 3 ? "0 2px 8px rgba(0,0,0,0.15)" : undefined,
      transition: "transform 0.3s ease",
    };
  };

  return (
    <Card className="col-span-1 xl:col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="font-semibold">
            Words Cloud
          </CardTitle>
          <ToolTipsProvider
            title={`A visual representation of the most frequently mentioned keywords related to Glovo Maroc, highlighting trending topics and themes.`}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-16">
        <div className="flex flex-wrap justify-center items-center gap-0 mt-8 text-center">
          {sortedKeywords.map((item, idx) => (
            <span
              key={item.keyword}
              className="mx-5 hover:scale-110 transition-colors duration-300 ease-in-out"
              style={getStyles(item.count, idx, idx)}
              dangerouslySetInnerHTML={{ __html: item.keyword }}
            />
          ))}
        </div>
      </CardContent>
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
                The word cloud reveals &quot;Glovo&quot; as the most prominent keyword, indicating strong brand recognition. Delivery-related terms dominate, suggesting consumer focus on logistics and service speed.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KeywordsNuage;
