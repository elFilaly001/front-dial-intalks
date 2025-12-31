import React from "react";
import ReportBuilder from "@/components/personal-reports/ReportBuilder";

export const dynamic = 'force-dynamic';

export default function PersonalReportsPage() {
    return (
        <div className="h-full w-full">
            <ReportBuilder />
        </div>
    );
}
