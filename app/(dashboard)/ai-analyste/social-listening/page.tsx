"use client";

import ChartAreaInteractive from "@/components/dashboard/chart-area-interactive";
import ChartSetiment from "@/components/dashboard/ChartSetiment";
import { InsightCards } from "@/components/dashboard/InsightCards";
import KeywordsNuage from "@/components/dashboard/KeywordsNuage";
import ShareOfVoice from "@/components/dashboard/ShareOfVoice";
import { SectionCards } from "@/components/ui/section-cards";
import { keywords as rawKeywords } from "@/data/keywords";
import Cucumber from "@/components/ui/Cucumber";
import ActionsDropdown from "@/components/ui/ActionsDropdown";


export default function SocialListeningPage() {
  return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
          <div className="flex items-center justify-between">
            <Cucumber />
            <ActionsDropdown />
          </div>
          <SectionCards filters={[]} data={[]} />
          <ChartAreaInteractive filters={[]} data={[]} />
          <InsightCards filters={[]} data={[]} />
          <div className="grid grid-cols-2 gap-6">
            <ShareOfVoice filters={[]} data={[]} />
            <ChartSetiment filters={[]} data={[]} />
          </div>
          {/* Convert string[] to KeywordData[] with deterministic counts based on keyword index */}
          <KeywordsNuage
            filters={[]}
            keywords={rawKeywords.map((k, idx) => ({
              keyword: k,
              count: ((idx * 17 + 13) % 100) + 1,
            }))}
          />
        </div>
  );
}
