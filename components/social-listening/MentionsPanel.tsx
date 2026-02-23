"use client";

import React, { Suspense } from "react";
import FilterFeed from "@/components/fil-actualites/FilterFeed";
// import MentionPagination from "@/components/fil-actualites/MentionPagination";
import Mentions from "@/components/fil-actualites/Mentions";
import MentionsFeed from "@/components/media/MentionsFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {v1Api} from "@/services/axiosService";

const tabs = [
  {
    label: "Aperçu",
    value: "overview",
    component: (
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-5">
          <Suspense>
            <Mentions />
          </Suspense>
        </div>

        <Suspense>
          <FilterFeed />
        </Suspense>
      </div>
    ),
  },
  {
    label: "Statistiques",
    value: "statistics",
    component: <MentionsFeed />,
  },
];

export default function MentionsPanel() {

  const [data , setData] = React.useState(null);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await v1Api.get("/dashboard/mentions");
        setData(response.data);
        console.log("Mentions data:", response.data);
      } catch (error) {
        console.error("Error fetching mentions data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Mentions
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <Tabs defaultValue={"overview"} className="my-2">
        <TabsList className="grid grid-cols-2 w-full b text-white border dark:border-gray-800 border-gray-200">
          {tabs.map((tab) => (
            <TabsTrigger
              className="bg-white dark:data-[state=active]:bg-main data-[state=active]:bg-main data-[state=active]:text-white text-gray-700"
              key={tab.label}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
