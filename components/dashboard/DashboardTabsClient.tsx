"use client";

import React, { useEffect, useState } from "react";
import Overview from "@/components/media/Overview";
import PostsGrid from "@/components/media/PostsGrid";
import AudienceReport from "@/components/media/AudienceReport";
import Sentiment from "@/components/media/Sentiment";
import MentionsPanel from "@/components/social-listening/MentionsPanel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";

const tabs = [
    { label: "Écoute sociale", value: "overView", component: <Overview /> },
    { label: "Audience", value: "audience", component: <AudienceReport /> },
    { label: "Publications", value: "posts", component: <PostsGrid /> },
    { label: "Mentions", value: "mentions", component: <MentionsPanel /> },
    { label: "Sentiment", value: "sentiment", component: <Sentiment /> },
];

export default function DashboardTabsClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initial = searchParams?.get("tab") ?? "overView";
    const [tabValue, setTabValue] = useState<string>(initial);

    useEffect(() => {
        const p = searchParams?.get("tab") ?? "overView";
        if (p !== tabValue) setTabValue(p);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams?.toString()]);

    const handleTabChange = (value: string) => {
        setTabValue(value);
        const params = new URLSearchParams(searchParams?.toString() ?? "");
        params.set("tab", value);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div>
            <div className="mb-6">
                <Tabs value={tabValue} onValueChange={handleTabChange}>
                    <TabsList>
                        {tabs.map((t) => (
                            <TabsTrigger key={t.value} value={t.value}>
                                {t.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <div>
                {tabs.map((t) => (
                    <div key={t.value} style={{ display: t.value === tabValue ? "block" : "none" }}>
                        {t.component}
                    </div>
                ))}
            </div>
        </div>
    );
}
