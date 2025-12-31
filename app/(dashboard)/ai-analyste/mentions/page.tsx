"use client";
import CountriesSplit from "@/components/charts/CountriesSplit";
import MentionsBySentimentCard from "@/components/dashboard/MentionsBySentimentCard";
import MentionsBySource from "@/components/dashboard/MentionsBySource";
import MentionsNumberCard from "@/components/dashboard/MentionsNumberCard";
import TopBlogs from "@/components/dashboard/TopBlogs";
import TopEditorialSource from "@/components/dashboard/TopEditorialSource";
import TopOccupations from "@/components/dashboard/TopOccupations";
import TopSharedLinks from "@/components/dashboard/TopSharedLinks";
import WordCloud from "@/components/dashboard/WordsCloud";
import Cucumber from "@/components/ui/Cucumber";
import ActionsDropdown from "@/components/ui/ActionsDropdown";

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

export default function MentionsPage() {
    return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Cucumber />
        <ActionsDropdown />
      </div>
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        {/* Left content can go here if needed */}
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
    </div>
  );
}