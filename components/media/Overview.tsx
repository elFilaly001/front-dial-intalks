import React from "react";
import { SectionCards } from "../ui/section-cards";
import { InsightCards } from "../dashboard/InsightCards";
import ChartSetiment from "../dashboard/ChartSetiment";
import ChartAreaInteractive from "../dashboard/chart-area-interactive";
import KeywordsNuage from "../dashboard/KeywordsNuage";
import { keywords as rawKeywords } from "@/data/keywords";
import ShareOfVoice from "../dashboard/ShareOfVoice";
import FilterOverView from "./FilterOverView";

const Overview = () => {
  return (
    <div className="flex flex-col gap-10 ">
      <FilterOverView />
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <SectionCards />
        <ChartAreaInteractive />
        <InsightCards />
        <div className="grid grid-cols-2 gap-6">
          <ShareOfVoice />
          <ChartSetiment />
        </div>
  {/* Convert string[] to KeywordData[] with mock counts */}
  <KeywordsNuage keywords={rawKeywords.map((k) => ({ keyword: k, count: Math.floor(Math.random() * 100) + 1 }))} />
      </div>
    </div>
  );
};

export default Overview;
