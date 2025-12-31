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
  title = "Mentions par Genre",
  malePercent,
  femalePercent,
}) => {
  const [showInsight, setShowInsight] = useState(false);
  const maleColor = "#06B6D4";
  const femaleColor = "#f161f9ff";

  const genderData = [
    { label: "Homme", percent: malePercent, color: maleColor, icon: <FaMale size={80} color={maleColor} /> },
    { label: "Femme", percent: femalePercent, color: femaleColor, icon: <FaFemale size={80} color={femaleColor} /> },
  ];

  return (
    <Card className="relative h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <ToolTipsProvider title="Répartition des mentions par genre. Affiche la part des mentions attribuée à chaque genre selon les données de profil disponibles." />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center pt-4 pb-12">
        <div className="flex items-center justify-center gap-16 w-full">
          {genderData.map((g) => (
            <div
              key={g.label}
              className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="p-3 rounded-full bg-gray-50 dark:bg-gray-800/30">
                <span aria-hidden>{g.icon}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                  {g.label}
                </span>
                <span className="text-4xl font-bold tracking-tight" style={{ color: g.color }}>
                  {g.percent}%
                </span>
              </div>
            </div>
          ))}
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
