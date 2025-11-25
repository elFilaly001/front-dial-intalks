"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaMale, FaFemale } from "react-icons/fa";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

type Props = {
  title?: string;
  malePercent: number;
  femalePercent: number;
};

const MentionsNumberCard: React.FC<Props> = ({
  title = "Mentions By Gender",
  malePercent,
  femalePercent,
}) => {
  const [showInsight, setShowInsight] = useState(false);
  const maleColor = "#06B6D4";
  const femaleColor = "#f161f9ff";

  const genderData = [
    { label: "Male", percent: malePercent, color: maleColor, icon: <FaMale size={96} color={maleColor} /> },
    { label: "Female", percent: femalePercent, color: femaleColor, icon: <FaFemale size={96} color={femaleColor} /> },
  ];

  return (
    <Card className={`relative`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-gray-700">{title}</CardTitle>
          <ToolTipsProvider title={`Breakdown of mentions by gender. Shows the share of mentions attributed to each gender based on available profile data.`} />
        </div>
      </CardHeader>

      <CardContent>
        {/* Centered icons row with labels underneath each icon */}
        <div className="flex flex-col items-center gap-6 mt-2 w-full">
          <div className="flex items-center justify-center gap-12 w-full">
            {genderData.map((g) => (
              <div key={g.label} className="flex flex-col items-center gap-2">
                <span aria-hidden>{g.icon}</span>
                <span className="text-xl font-medium" style={{ color: g.color }}>
                  {g.label}
                </span>
                <span className="text-3xl font-bold" style={{ color: g.color }}>
                  {g.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* AI insight trigger / panel (bottom-left) */}
      <div className="absolute bottom-3 left-4">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={20} height={20} />
            <span className="font-semibold" style={{
              background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
            }}>
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-80">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {femalePercent > malePercent
                  ? `Female audience leads with ${femalePercent}%. Consider prioritizing content and campaigns that resonate with female interests to increase engagement.`
                  : `Male audience leads with ${malePercent}%. Consider tailoring content and messaging to male preferences to maximize reach and engagement.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MentionsNumberCard;
