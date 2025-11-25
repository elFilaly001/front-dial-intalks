/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "../ui/button";
import Loading from "../ui/Loading";
import ranking from "@/data/ranking.json";
import { getCountryCode } from "@/lib/country";
import { Badge } from "../ui/badge";
import Image from "next/image";

type Account = {
  _id: string;
  categories: any[];
  industries: Record<string, any>;
  brand_categories: {
    primary: boolean;
    name: string;
    root: string;
    root_name: string;
    id: string;
    state: number;
  }[];
  brand_industries: Record<
    string,
    {
      id: string;
      name: string;
      niches: Record<
        string,
        {
          id: string;
          name: string;
          primary: boolean;
          state: number;
        }
      >;
    }
  >;
  niche_count: number;
  custom_tops: any[];
  oa_description_parsed: boolean;
  country: {
    name: string;
    code: string;
  };
  language: {
    name: string;
    native: string;
    id: string;
    code2: string;
    slug: string;
  };
  picture_url: string;
  full_name: string;
  biography: string;
  follower_count: number;
  typologie: string | null;
  title: string;
  age: number | null;
  gender: string | null;
  is_a_brand: boolean;
  networks: {
    instagram?: NetworkInfo;
    twitter?: NetworkInfo;
    tiktok?: NetworkInfo;
    youtube?: NetworkInfo;
    linkedin?: NetworkInfo;
  };
  score: {
    score: string;
    raw: number;
    tier: number;
  };
  growth: {
    percentage: string;
    absolute: string;
    type: "greater" | "lower";
  };
  badges: {
    exceptionalGrowth: boolean;
    linkedinTopVoice: boolean;
    looseFollowers: boolean;
    wroteABook: boolean;
    hasANewsletter: boolean;
    hasAPodcast: boolean;
    hasTopics: boolean;
    hasCause: boolean;
    isInactive: boolean;
    verifiedCreator: boolean;
  };
  custom_creators: any[];
  rank: {
    rank: number;
  };
};

type NetworkInfo = {
  network: string;
  follower_count: string;
  profile_url: string;
  score: string;
  score_raw: number;
  growth: {
    value: string;
    type: "greater" | "lower";
  };
  engagement_rate: string | null;
  profile_views: string;
};

// interface Pagination {
//   data: Account[];
//   total: number;
//   perPage: number;
//   currentPage: number;
//   lastPage: number;
//   nextPage: number;
//   prevPage: number;
// }

const DataTableInfluencersRanking = () => {
  const columns: TableColumn<Account>[] = [
    {
      name: "Ranking",
      sortable: true,
      id: "rank",
      width: "110px",
      selector: (row) => row._id,
      cell(row, rowIndex) {
        return (
          <div className="flex justify-center text-whiteColor">
            {[1, 2, 3].includes(++rowIndex) ? (
              <div className="flex gap-2">
                <Image
                  width={25}
                  height={25}
                  src={`/icons/${rowIndex}.png`}
                  alt={row.full_name}
                />
                <p className="text-lg"># {rowIndex}</p>
              </div>
            ) : (
              <>
                <p className="text-lg"># {rowIndex}</p>
              </>
            )}
          </div>
        );
      },
    },
    {
      name: "Creator",
      sortable: true,
      id: "name",
      selector: (row) => row.full_name,
      width: "450px",
      cell: (row) => (
        <Link href={`/report/${row._id}`} style={{ textDecoration: "none" }}>
          <div className="flex items-center py-2 gap-2">
            <span>
              <div
                className="rounded-full h-[50px] w-[50px] mx-auto flex justify-start"
                style={{
                  background: "linear-gradient(45deg, #4ec6fb, #ff56e3)",
                }}
              >
                <div
                  className="rounded-full mx-auto w-12 h-12 bg-contain p-0.5"
                  style={{
                    backgroundImage: `url(${row.picture_url})`,
                  }}
                ></div>
              </div>
            </span>
            <div>
              <p className="text-sm">{row.full_name}</p>
              <p className="text-xs capitalize">{row.title}</p>
              <p className="text-xs text-gray-400">
                {row.biography.substring(0, 100)} ...
              </p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "Score",
      width: "150px",
      sortable: true,
      id: "growth",
      cell(row) {
        return (
          <Badge className="flex gap-1 items-center bg-emerald-500/20 text-black px-3 py-2 rounded-md text-xs">
            <span className="circle h-2 w-2 bg-green-500 rounded-full"></span>
            {row.networks.instagram?.engagement_rate} / 100
          </Badge>
        );
      },
    },
    {
      name: "Niche",
      sortable: true,
      id: "niche",
      width: "200px",
      selector: (row) => row.title,
      cell(row) {
        return (
          <div>
            {row.brand_categories.map((category) => (
              <Button
                key={category.name}
                size={"sm"}
                className="text-xs capitalize bg-bgDarkColor text-whiteColor rounded-md"
              >
                {category.name}
              </Button>
            ))}
          </div>
        );
      },
    },
    {
      name: "Country",
      sortable: true,
      id: "country",
      cell(row) {
        console.log(row);
        return (
          <div className="flex justify-center gap-0.5 items-center">
            <Image
              src={getCountryCode("Morocco")}
              alt=""
              className=" rounded-tr-md rounded-bl-md"
              height={25}
              width={25}
            />
            <p className="capitalize">Morocco</p>
          </div>
        );
      },
    },
    {
      name: "Followers",
      sortable: true,
      id: "followers",
      cell(row) {
        return (
          <div className={`flex py-2 flex-col gap-2`}>
            {Object.entries(row.networks)
              .slice(0, 4)
              .map(([key, value]) => (
                <div className="flex gap-1 items-center" key={key}>
                  <Image
                    width={15}
                    height={15}
                    src={`/media/${value.network}.png`}
                    alt={value.network}
                  />
                  {value.follower_count}
                </div>
              ))}
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState<any[]>();
  useEffect(() => {
    setData(ranking.influencers);
  }, []);

  return (
    <>
      <div className={`dark-datatable`}>
        <DataTable
          columns={columns}
          // progressPending={}
          data={data || []}
          progressComponent={<Loading />}
          pagination={true}
          paginationServer
          paginationTotalRows={200}
        />
      </div>
    </>
  );
};

export default DataTableInfluencersRanking;
