import KeywordsNuage from "@/components/dashboard/KeywordsNuage";
import MostHastags from "@/components/dashboard/MostHastags";
import TopKeywords from "@/components/dashboard/TopKeywords";
import TrendingKeywords from "@/components/dashboard/TrendingKeywords";
import { keywords } from "@/data/keywords";
import React from "react";



const page = () => {
  // Transform string[] to KeywordData[] for KeywordsNuage
  const keywordData = keywords.map((keyword) => ({
    keyword,
    count: Math.floor(Math.random() * 100) + 10, // Random count for demo
  }));

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-3 gap-5">
        <TrendingKeywords keywords={keywords} />
        <TopKeywords keywords={keywords} />
        <MostHastags />
      </div>
      <KeywordsNuage keywords={keywordData} />
    </div>
  );
};
// test
export default page;
