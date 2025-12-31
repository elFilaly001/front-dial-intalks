"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RankingFilters = () => {
  return (
    <div>
      <div>
        <Card className="py-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🏆 Top 200 Brands · Maroc
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <div className="flex gap-5 items-center">
              <div className="grid grid-cols-2 gap-5 items-center flex-1">
                <CategoriesFilter />
                <SocailMedia />
      
              </div>
              <div className="flex items-center gap-2.5">
                <PageSize />
                <Button
                  className=" dark:bg-input/30 border border-input text-gray-200"
                  size={"icon"}
                  asChild
                >
                  <Link href={"/reseaux-sociaux/ranking"}>
                    <RotateCcwIcon />
                  </Link>
                </Button>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RankingFilters;
