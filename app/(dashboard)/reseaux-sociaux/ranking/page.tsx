import RankingDataTable from "@/components/Ranking/RankingDataTable";
// import RankingFilters from "@/components/Ranking/RankingFilters";
import StockMarket from "@/components/StockMarket";

import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
        
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Classement
          <div className="flex flex-row gap-1 mt-2  mb-4">
          <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
          <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <StockMarket />
      <Suspense>
        {/* <RankingFilters /> */}
        <RankingDataTable />
      </Suspense>
    </div>
  );
};

export default page;
