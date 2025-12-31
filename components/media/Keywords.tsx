import React from "react";
import ChartAgeSplit from "../charts/ChartAgeSplit";
import CountriesSplit from "../charts/CountriesSplit";
import ChartLangage from "../charts/ChartLangage";
import TopOccupations from "../dashboard/TopOccupations";



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

const Keywords = () => {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-3 gap-5">
        {data.countries && (
            <CountriesSplit
              title="Keyword by Location"
              data={JSON.parse(data.countries.toString())}
              tooltip={`The audience location by country.`}
            />
          )}
        {data.ageSplit && (
          <ChartAgeSplit
            title={"Keyword by Age"}
            data={
              JSON.parse(data.ageSplit.toString()) as Record<string, number>
            }
          />
        )}
        {data.language && JSON.stringify(data.language) !== "{}" && (
          <ChartLangage data={JSON.parse(data.language.toString())} />
        )}
      </div>
      <TopOccupations />
    </div>
  );
};

export default Keywords;
