import React from "react";
import CountriesSplit from "../charts/CountriesSplit";
import MentionsNumberCard from "../dashboard/MentionsNumberCard";
import WordCloud from "../dashboard/WordsCloud";
import MentionsBySentimentCard from "../dashboard/MentionsBySentimentCard";
import TopEditorialSource from "../dashboard/TopEditorialSource";
import TopSharedLinks from "../dashboard/TopSharedLinks";
import TopBlogs from "../dashboard/TopBlogs";
import MentionsBySource from "../dashboard/MentionsBySource";
import TopOccupations from "../dashboard/TopOccupations";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookmarkIcon,
  // Heart,
  // Users,
} from "lucide-react";
// import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompactDatePicker } from "../ui/CompactDatePicker";
import Image from "next/image";
// import Mentions from "../fil-actualites/Mentions";

// const followersData = [
//   {
//     name: "YouTube",
//     value: 50000,
//     label: 50000,
//     color: "url(#color-youtube)",
//     icon: "/media/youtube.png",
//   },
//   {
//     name: "Instagram",
//     value: 150000,
//     label: 150000,
//     color: "url(#color-instagram)",
//     icon: "/media/instagram.png",
//   },
//   {
//     name: "TikTok",
//     value: 175000,
//     label: 175000,
//     color: "url(#color-tiktok)",
//     icon: "/media/tiktok.png",
//   },
//   {
//     name: "Twitter",
//     value: 60000,
//     label: 60000,
//     color: "url(#color-twitter)",
//     icon: "/media/twitter.png?v=12",
//   },
//   {
//     name: "LinkedIn",
//     value: 20000,
//     label: 20000,
//     color: "url(#color-linkedin)",
//     icon: "/media/linkedin.png",
//   },
//   {
//     name: "Facebook",
//     value: 110000,
//     label: 110000,
//     color: "url(#color-facebook)",
//     icon: "/media/facebook.png",
//   },
// ].sort((a, b) => b.value - a.value);

const data = {
  id: "cmhjwf73e0013kqz0in94r25z",
  femalePercentage: 52.17,
  malePercentage: 34.78,
  unknownPercentage: 13.04,
  realPercentage: 84.78,
  fakePercentage: 15.22,
  countries:
    '{"Morocco":60.87,"France":13.04,"Turkey":6.52,"Saudi Arabia":4.35,"Algeria":4.35,"Egypt":2.17,"undetermined":8.7}',
  cities:
    '{"Marrakech":15.22,"Tanger":8.7,"Casablanca":6.52,"Rabat":4.35,"Fes":4.35,"Istanbul":4.35,"undetermined":56.52}',
  ageSplit:
    '{"13-17":10.87,"18-24":45.65,"25-34":28.26,"35-44":6.52,"45-54":2.17,"55+":0,"undetermined":6.52}',
  language:
    '{"Arabic":60.87,"French":19.57,"English":8.7,"Turkish":4.35,"Spanish":2.17,"Portuguese":2.17,"undetermined":2.17}',
  createdAt: "2025-11-04T01:37:03.914Z",
  updatedAt: "2025-11-04T01:37:03.914Z",
  networkId: "cmhjwf16z0002kqz0qttwcbp8",
};

const media = [
  {
    label: "Tous les réseaux sociaux",
    // no image for the 'All' option - render an icon instead
  },
  {
    label: "Instagram",
    image: "/media/instagram.png",
  },
  {
    label: "Youtube",
    image: "/media/youtube.png",
  },
  {
    label: "X",
    image: "/media/twitter.png",
  },
  {
    label: "Tiktok",
    image: "/media/tiktok.png",
  },
  {
    label: "Facebook",
    image: "/media/facebook.png",
  },
  {
    label: "Linkedin",
    image: "/media/linkedin.png",
  },
];

const MentionsFeed = () => {
  const [dateRange, setDateRange] = useState({
    from: undefined as Date | undefined,
    to: undefined as Date | undefined,
  });

  const [source, setSource] = useState<string | undefined>(undefined);
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        {/* Left content can go here if needed */}
      </div>
      <div className="flex justify-end items-center gap-2">
        <CompactDatePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        <Select value={source} onValueChange={(v) => setSource(v)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Par source" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Par source</SelectLabel>
              {media.map((item) => (
                <SelectItem key={item.label} value={item.label}>
                  {item.label === "X" ? (
                    <Image
                      src="/media/twitter.png"
                      alt="X logo"
                      width={20}
                      height={20}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const svg = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                          );
                          svg.setAttribute("width", "20");
                          svg.setAttribute("height", "20");
                          svg.setAttribute("viewBox", "0 0 24 24");
                          svg.innerHTML =
                            '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                          parent.insertBefore(svg, parent.firstChild);
                        }
                      }}
                    />
                  ) : item.image ? (
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <BookmarkIcon className="h-4 w-4 text-gray-500 mr-2" />
                  )}
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-5 col-span-3">
        <div className="grid grid-cols-2 gap-5">
          <MentionsBySource />
          <MentionsNumberCard malePercent={60} femalePercent={40} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <TopBlogs />
          <TopSharedLinks />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <TopEditorialSource />
          {data.countries && (
            <CountriesSplit
              title="Top des localisations"
              data={JSON.parse(data.countries.toString())}
              tooltip={`La répartition des mentions par localisation, aidant à identifier les zones géographiques clés d'intérêt et d'engagement.`}
            />
          )}
        </div>
        <TopOccupations />
        <MentionsBySentimentCard />
        <WordCloud />
      </div>
      {/* <div className="flex flex-col">
        <Mentions />
      </div> */}
    </div>
  );
};

export default MentionsFeed;
