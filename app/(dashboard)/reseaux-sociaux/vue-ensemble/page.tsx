"use client";
import Profil from "@/components/media/Profil";
import React, { Suspense } from "react";
import Overview from "@/components/media/Overview";
import PostsGrid from "@/components/media/PostsGrid";
import AudienceReport from "@/components/media/AudienceReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const tabs = [
  {
    label: "Overview",
    value: "overView",
    component: <Overview />,
  },
  {
    label: "Posts",
    value: "posts",
    component: <PostsGrid />,
  },
  // {
  //   label: "Competitive Intelligence",
  //   value: "Competitive-Intelligence",
  //   // component: <CreatorNetworkCircle id={data.id} />,
  // },
  {
    label: "Audience",
    value: "audience",
    component: <AudienceReport />,
  },
];

const Page = () => {
  return (
    <Suspense>
      <div className="@container/main flex flex-col">
        <Profil />
        <Tabs defaultValue={"overView"} className="my-2">
          <TabsList className="grid grid-cols-3 w-full b text-white border dark:border-gray-800 border-gray-200">
            {tabs.map((tab) => (
              <TabsTrigger
                className="bg-white dark:data-[state=active]:bg-main data-[state=active]:bg-main data-[state=active]:text-white text-gray-700"
                key={tab.label}
                value={tab.value}
                // onClick={() => {
                //   handlechange(tab.value);
                // }}
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
    </Suspense>
  );
};

export default Page;
