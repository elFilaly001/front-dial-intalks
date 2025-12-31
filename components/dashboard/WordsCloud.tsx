import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import Image from "next/image";

interface Word {
  text: string;
  value: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  theme: 'emerging' | 'decreasing' | 'new';
}

interface Rectangle {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// Professional color palette - brand colors
const themeConfig = {
  emerging: { color: '#40bb3c', label: 'Thèmes émergents' },    // green
  decreasing: { color: '#ff0c00', label: 'Thèmes en baisse' },  // red
  new: { color: '#ffbf26', label: 'Nouveaux thèmes' },          // blue
};

const WordCloud = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const [showInsight, setShowInsight] = useState(false);

  // Sample data - replace with your own
  const wordData = useMemo(() => [
    { text: 'Art', value: 95 },
    { text: 'Design', value: 90 },
    { text: 'Décoration', value: 85 },
    { text: 'Interior', value: 80 },
    { text: 'Modern', value: 75 },
    { text: 'Painting', value: 70 },
    { text: 'Sculpture', value: 65 },
    { text: 'Gallery', value: 60 },
    { text: 'Artiste', value: 55 },
    { text: 'Maison', value: 50 },
    { text: 'Collection', value: 45 },
    { text: 'Élégant', value: 42 },
    { text: 'فن', value: 40 },
    { text: 'ديكور', value: 38 },
    { text: 'تصميم', value: 35 },
    { text: 'لوحة', value: 33 },
    { text: 'معرض', value: 30 },
    { text: 'حديث', value: 28 },
    { text: 'منزل', value: 25 },
    { text: 'فنان', value: 22 },
    { text: 'Canvas', value: 20 },
    { text: 'Vintage', value: 18 },
    { text: 'Aesthetic', value: 15 },
    { text: 'Handmade', value: 12 },
    { text: 'Unique', value: 10 }
  ], []);

  useEffect(() => {
    const minValue = Math.min(...wordData.map(w => w.value));
    const maxValue = Math.max(...wordData.map(w => w.value));

    const containerWidth = 700;
    const containerHeight = 320;
    const padding = 30;
    const availableWidth = containerWidth - 2 * padding;
    const availableHeight = containerHeight - 2 * padding;

    const rectanglesOverlap = (rect1: Rectangle, rect2: Rectangle) => {
      return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    };

    const getWordBounds = (word: Word, fontSize: number): Rectangle => {
      const textWidth = word.text.length * fontSize * 0.55;
      const textHeight = fontSize * 1.1;
      return {
        left: word.x - textWidth / 2 - 4,
        right: word.x + textWidth / 2 + 4,
        top: word.y - textHeight / 2 - 2,
        bottom: word.y + textHeight / 2 + 2
      };
    };

    const positioned: Word[] = [];

    // Sort by value descending to place larger words first
    const sortedData = [...wordData].sort((a, b) => b.value - a.value);

    sortedData.forEach((word) => {
      const fontSize = 14 + ((word.value - minValue) / (maxValue - minValue)) * 28;
      let placed = false;
      let attempts = 0;
      const maxAttempts = 200;

      // Determine theme and color based on value percentile
      const percentile = (word.value - minValue) / (maxValue - minValue);
      let theme: 'emerging' | 'decreasing' | 'new';
      let color: string;

      if (percentile >= 0.66) {
        theme = 'emerging';
        color = themeConfig.emerging.color;
      } else if (percentile >= 0.33) {
        theme = 'decreasing';
        color = themeConfig.decreasing.color;
      } else {
        theme = 'new';
        color = themeConfig.new.color;
      }

      while (!placed && attempts < maxAttempts) {
        // Spiral placement for more compact cloud
        const angle = attempts * 0.4;
        const radius = attempts * 1.8;
        const x = Math.cos(angle) * radius * (availableWidth / availableHeight);
        const y = Math.sin(angle) * radius * 0.7;

        // Add some randomness
        const jitterX = (Math.random() - 0.5) * 15;
        const jitterY = (Math.random() - 0.5) * 15;

        const finalX = Math.max(-availableWidth / 2, Math.min(availableWidth / 2, x + jitterX));
        const finalY = Math.max(-availableHeight / 2, Math.min(availableHeight / 2, y + jitterY));

        const testWord: Word = {
          ...word,
          x: finalX,
          y: finalY,
          color,
          rotation: 0,
          theme
        };

        const bounds = getWordBounds(testWord, fontSize);

        let hasOverlap = false;
        for (const existingWord of positioned) {
          const existingFontSize = 14 + ((existingWord.value - minValue) / (maxValue - minValue)) * 28;
          const existingBounds = getWordBounds(existingWord, existingFontSize);
          if (rectanglesOverlap(bounds, existingBounds)) {
            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) {
          positioned.push(testWord);
          placed = true;
        }

        attempts++;
      }

      // Fallback placement
      if (!placed) {
        const x = (Math.random() - 0.5) * availableWidth * 0.8;
        const y = (Math.random() - 0.5) * availableHeight * 0.8;
        positioned.push({
          ...word,
          x,
          y,
          color,
          rotation: 0,
          theme
        });
      }
    });

    setWords(positioned);
  }, [wordData]);

  const getFontSize = (value: number) => {
    const minSize = 14;
    const maxSize = 42;
    const minValue = Math.min(...wordData.map(w => w.value));
    const maxValue = Math.max(...wordData.map(w => w.value));
    return minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);
  };

  return (
    <Card className="@container/card col-span-2 relative">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Nuage des Thématiques</CardTitle>
          <ToolTipsProvider title="Visualisation des principaux thèmes associés aux conversations autour de la marque. La taille des mots reflète leur fréquence d'apparition dans les mentions." />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 pb-16">

        <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="relative h-[320px] w-full flex items-center justify-center mx-auto overflow-hidden">
            {words.map((word, index) => {
              const fontSize = getFontSize(word.value);
              const isHovered = hoveredWord === index;
              const opacity = word.theme === 'emerging' ? 1 : word.theme === 'decreasing' ? 0.9 : 0.8;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-200 cursor-pointer select-none"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
                    fontSize: `${fontSize}px`,
                    color: word.color,
                    opacity: isHovered ? 1 : opacity,
                    fontWeight: isHovered ? 600 : 500,
                    letterSpacing: '-0.01em',
                    zIndex: isHovered ? 100 : Math.floor(word.value),
                  }}
                  onMouseEnter={() => setHoveredWord(index)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}
                  {isHovered && (
                    <div
                      className="absolute top-full left-1/2 mt-1 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2.5 py-1 rounded whitespace-nowrap shadow-lg"
                      style={{ zIndex: 101 }}
                    >
                      <span className="font-medium">{word.value}</span>
                      <span className="text-gray-400 ml-1">mentions</span>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center items-center gap-6 flex-wrap">
          {Object.entries(themeConfig).map(([key, { color, label }]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{words.length}</span>
            <span>thématiques</span>
          </div>
        </div>
      </CardContent>

      <div className="absolute bottom-4 left-6">
        <div className="relative">
          <div
            className="text-sm text-black flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setShowInsight(true)}
            onMouseLeave={() => setShowInsight(false)}
          >
            <Image src="/icons/IN-TALKS-logo.png-2.webp" alt="IN-TALKS Logo" width={22} height={22} style={{ display: "inline-block", verticalAlign: "middle" }} />
            <span className="font-semibold" style={{
              background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              display: "inline-block",
            }}>
              AI-powered insight
            </span>
          </div>
          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Massinart&apos;s thematic analysis reveals strong interest in modern art and interior design across all audiences. Arabic speakers show particular appreciation for handmade and traditional pieces, while French customers emphasize elegance and home décor. English speakers focus on unique collections and gallery experiences.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WordCloud;
