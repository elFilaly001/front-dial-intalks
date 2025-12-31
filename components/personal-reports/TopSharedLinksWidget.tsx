"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ExternalLink, Link2 } from "lucide-react";
import formatNumber from "@/lib/numbers";

const feeds = [
    { id: "1", link: "https://techcrunch.com/glovo-expansion", mentionCount: 120 },
    { id: "2", link: "https://forbes.com/glovo-partnerships", mentionCount: 95 },
    { id: "3", link: "https://medium.com/glovo-commissions", mentionCount: 60 },
    { id: "4", link: "https://wired.com/glovo-growth", mentionCount: 45 },
    { id: "5", link: "https://theverge.com/glovo-vendors", mentionCount: 30 },
    { id: "6", link: "https://bbc.com/glovo-morocco", mentionCount: 85 },
    { id: "7", link: "https://cnn.com/glovo-delivery", mentionCount: 70 },
    { id: "8", link: "https://nytimes.com/glovo-app", mentionCount: 55 },
];

// Helper function to extract domain from URL
const extractDomain = (url: string): string => {
    try {
        const domain = new URL(url).hostname.replace("www.", "");
        return domain;
    } catch {
        return url;
    }
};

interface TopSharedLinksWidgetProps {
    viewMode?: "chart" | "table";
    dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function TopSharedLinksWidget({ viewMode = "chart", dateRange }: TopSharedLinksWidgetProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Top Liens Partagés</CardTitle>
            </CardHeader>
            <CardContent>
                {viewMode === "chart" ? (
                    <div className="flex flex-col gap-2">
                        {feeds.map((feed, index) => (
                            <div key={feed.id} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800">
                                <span className="flex-shrink-0 w-6 text-xs font-medium text-muted-foreground">
                                    #{index + 1}
                                </span>
                                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-cyan-100 flex items-center justify-center dark:bg-cyan-900/30">
                                    <Link2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <a
                                        href={feed.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors truncate"
                                    >
                                        <span className="truncate">{extractDomain(feed.link)}</span>
                                        <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                                        {feed.link}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 min-w-8 h-8 px-2 bg-cyan-100 text-cyan-600 rounded-md flex items-center justify-center text-xs font-semibold dark:bg-cyan-900/30 dark:text-cyan-400">
                                    {formatNumber(feed.mentionCount)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">#</TableHead>
                                    <TableHead>Lien</TableHead>
                                    <TableHead className="text-right">Mentions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {feeds.map((feed, index) => (
                                    <TableRow key={feed.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>
                                            <a
                                                href={feed.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 hover:underline"
                                            >
                                                {extractDomain(feed.link)}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </TableCell>
                                        <TableCell className="text-right">{formatNumber(feed.mentionCount)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
