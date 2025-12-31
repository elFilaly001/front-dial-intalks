"use client";

// import Profil from "@/components/media/Profil";
import React, { Suspense, useEffect, useState } from "react";
// import Overview from "@/components/media/Overview";
// import PostsGrid from "@/components/media/PostsGrid";
// import AudienceReport from "@/components/media/AudienceReport";
import { useSearchParams } from "next/navigation";
// import Sentiment from "@/components/media/Sentiment";
// import MentionsPanel from "@/components/social-listening/MentionsPanel";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initial = searchParams?.get("tab") ?? "overView";
  const [tabValue, setTabValue] = useState<string>(initial);

  useEffect(() => {
    const p = searchParams?.get("tab") ?? "overView";
    if (p !== tabValue) setTabValue(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to InTalks</h1>
      <p className="mt-3 text-neutral-600">This is your workspace. Use the sidebar to open different dashboard sections.</p>
    </main>
  );
}

const Page = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

export default Page;
