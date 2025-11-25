"use client";

import React, { Suspense } from "react";
import FilterFeed from "@/components/fil-actualites/FilterFeed";
import MentionPagination from "@/components/fil-actualites/MentionPagination";
import Mentions from "@/components/fil-actualites/Mentions";
import MentionsFeed from "@/components/media/MentionsFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
    {
        label: "Overview",
        value: "overview",
        component: (
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2 flex flex-col gap-5">
                    <Suspense>
                        <Mentions />
                        <MentionPagination
                            pagination={{ page: 1, pageSize: 10, total: 300, totalPages: 30 }}
                        />
                    </Suspense>
                </div>

                <Suspense>
                    <FilterFeed />
                </Suspense>
            </div>
        ),
    },
    {
        label: "Statistics",
        value: "statistics",
        component: <MentionsFeed />,
    },
];

export default function MentionsPanel() {
    return (
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
    );
}
