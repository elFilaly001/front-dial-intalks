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

const MentionsFeed = () => {

  return (
    <div className="grid grid-cols-3 gap-5">
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
              title="Top Locations"
              data={JSON.parse(data.countries.toString())}
              tooltip={`The distribution of mentions by location, helping to identify key geographic areas of interest and engagement.`}
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
