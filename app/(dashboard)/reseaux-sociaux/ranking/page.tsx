import RankingDataTable from "@/components/Ranking/RankingDataTable";
// import RankingFilters from "@/components/Ranking/RankingFilters";
import StockMarket from "@/components/StockMarket";

import React, { Suspense } from "react";

const page = () => {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <StockMarket />
      <Suspense>
        {/* <RankingFilters /> */}
        <RankingDataTable />
      </Suspense>
    </div>
  );
};

export default page;
