import React from "react";
import CategoriesFilter from "./CategoriesFilter";
import GenderFilter from "./GenderFilter";
import CountryFilter from "./CountryFilter";
import OrderByFilter from "./OrderByFilter";
import { Button } from "../ui/button";
import { RotateCcwIcon } from "lucide-react";
import PageSize from "./PageSize";
import Link from "next/link";

const FiltersInfluencers = () => {
  return (
    <div className="flex gap-5 items-center">
      <div className="grid grid-cols-4 gap-5 items-center flex-1">
        <CategoriesFilter />
        <GenderFilter />
        <CountryFilter />
        <OrderByFilter />
      </div>
      <div className="flex items-center gap-2.5">
        <PageSize />
        <Button
          className=" dark:bg-input/30 border border-input text-gray-200"
          size={"icon"}
          asChild
        >
          <Link href={"/influencers"}>
            <RotateCcwIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FiltersInfluencers;
