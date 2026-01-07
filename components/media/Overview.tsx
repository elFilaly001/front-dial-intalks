import React, { useEffect, useState } from "react";
import { SectionCards } from "../ui/section-cards";
import { InsightCards } from "../dashboard/InsightCards";
import ChartSetiment from "../dashboard/ChartSetiment";
import ChartAreaInteractive from "../dashboard/chart-area-interactive";
import KeywordsNuage from "../dashboard/KeywordsNuage";
import { keywords as rawKeywords } from "@/data/keywords";
import ShareOfVoice from "../dashboard/ShareOfVoice";
import FilterOverView from "./FilterOverView";
import {v1Api} from "@/services/axiosService";

type OverviewDataType = {
  dashboard?: Object;
  mentions?: Object;
};

const Overview = () => {
  const [overviewData, setOverviewData] = useState<OverviewDataType | null>(null);
  const [loading, setLoading] = useState(false);

  // Move all filter state here
  const [filters, setFilters] = useState({
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    source: "",
    sentiment: "",
    author: "",
    format: "",
    language: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseDashboard = await v1Api.get("/dashboard/social-listening");
        setOverviewData(responseDashboard.data);
        console.log("fetched data", responseDashboard.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Ecoute Sociale
          <div className="flex flex-row gap-1 mt-2 mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>

      {/* Pass filters and setter to FilterOverView */}
      <FilterOverView filters={filters} onFiltersChange={setFilters} />

      <div className="@container/main flex flex-col gap-4 md:gap-6">

        <SectionCards filters={filters} data={overviewData} loading={loading} />
        <ChartAreaInteractive filters={filters} data={overviewData} loading={loading} />
        <InsightCards filters={filters} data={overviewData} />
        <div className="grid grid-cols-2 gap-6">
          <ShareOfVoice filters={filters} data={overviewData} />
          <ChartSetiment filters={filters} data={overviewData} />
        </div>
        <KeywordsNuage
          filters={filters}
          keywords={rawKeywords.map((k, idx) => ({
            keyword: k,
            count: ((idx * 17 + 13) % 100) + 1,
          }))}
        />
      </div>
    </div>
  );
};

export default Overview;