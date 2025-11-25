import React, { Suspense } from "react";
import DashboardTabsClient from "@/components/dashboard/DashboardTabsClient";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Welcome to InTalks</h1>
      <p className="mt-3 text-neutral-600">This is your workspace. Use the sidebar to open different dashboard sections.</p>
    </main>
  );
}
