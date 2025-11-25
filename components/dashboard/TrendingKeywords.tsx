import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";

const TrendingKeywords = ({ keywords }: { keywords: string[] }) => {
  return (
    <Card className="relative">
      <div className=" absolute top-0 right-0">
        <ToolTipsProvider
          title={`A list of popular and trending keywords related to Glovo in Morocco, highlighting key topics and themes.`}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-center font-semibold">
          Trending Keywords
        </CardTitle>
        <p className="text-xs text-gray-500 text-center mt-3">
          Popular and trending keywords about Glovo in Morocco
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {keywords
            .slice(8, 14)
            .map((keyword, index) => ({ keyword, value: (1 + index) * 5 })) // attach value
            .sort((a, b) => b.value - a.value) // sort by value
            .map(({ keyword, value }) => (
              <div className="flex justify-between items-center" key={keyword}>
                <p>{keyword}</p>
                <div className="h-8 w-8 bg-primary rounded-full flex justify-center items-center text-white text-sm">
                  {value}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingKeywords;
