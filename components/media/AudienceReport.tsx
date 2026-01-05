"use client";
import ChartGenderSplit from "../charts/ChartGenderSplit";
import ChartLangage from "../charts/ChartLangage";
import CountriesSplit from "../charts/CountriesSplit";
import QualitySplit from "../charts/QualitySplit";
import AgeGenderBreakdown from "../dashboard/AgeGenderBreakdown";
import AudienceSocialTable from "./AudienceSocialTable";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import Image from "next/image";
import Interset from "../charts/Interset";
import BrandAffinity from "../charts/BrandAffinity";
import ToolTipsProvider from "../charts/ToolTipsProvider";
import { useEffect, useState } from "react";
import {v1Api} from "@/services/axiosService";

type DataType = {
  id: string;
  femalePercentage: number;
  malePercentage: number;
  unknownPercentage: number;
  realPercentage: number;
  fakePercentage: number;
  countries: string;
  cities: string;
  ageSplit: string;
  interest: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  networkId: string;
};

// const data: DataType = {
//   id: "",
//   femalePercentage: 0,
//   malePercentage: 0,
//   unknownPercentage: 0,
//   realPercentage: 0,
//   fakePercentage: 0,
//   countries: "",
//   cities: "",
//   ageSplit: "",
//   interest: "",
//   language: "",
//   createdAt: "",
//   updatedAt: "",
//   networkId: "",
// };




const chartData2 = [
  { month: "< 500", desktop: 186 },
  { month: "500 - 1k", desktop: 305 },
  { month: "1k - 1.5k", desktop: 237 },
  { month: "3k - 4.5k", desktop: 73 },
  { month: "5k - 10k", desktop: 209 },
  { month: "<1k", desktop: 214 },
];

const totalChart2 = chartData2.reduce((s, it) => s + (it.desktop || 0), 0);

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number; color?: string; payload?: { desktop?: number; fill?: string } }[];
  label?: string | number;
}) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];
  const value = item?.value ?? item?.payload?.desktop ?? 0;
  const percent = totalChart2 ? Math.round((value / totalChart2) * 100) : 0;
  const color = item?.color || item?.payload?.fill || "var(--color-desktop)";

  return (
    <div className="bg-gray-900 text-white text-xs rounded-md px-2 py-1 shadow-lg flex items-center gap-2 whitespace-nowrap">
      <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: color }} />
      <div className="leading-none">
        <div className="font-medium">{label}</div>
        <div className="text-[11px] opacity-90">Audience %: {percent}</div>
      </div>
    </div>
  );
}

const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "#9c0274",
  },
} satisfies ChartConfig;

// const networks = [
//   {
//     network: "instagram",
//     profil: "/massinart.jpg",
//     username: "massinart.ma",
//     name: "Massinart",
//     followers: 90000,
//     er: 2.5,
//     avgEngage: 19000,
//     avgViews: 211400,
//     metrics: "85.4",
//     growth: 7.3,
//     activity: 14,
//   },
//   {
//     network: "tiktok",
//     profil: "/Massinart--Logo.png",
//     username: "massinart.ma",
//     name: "Massinart",
//     followers: 13100,
//     er: 1.8,
//     avgEngage: 8000,
//     avgViews: 90000,
//     metrics: "80.2",
//     growth: 1.2,
//     activity: 12,
//   },
//   {
//     network: "facebook",
//     profil: "/massinart.jpg",
//     username: "massinart.ma",
//     name: "Massinart",
//     followers: 8800,
//     er: 2.1,
//     avgEngage: 12000,
//     avgViews: 150000,
//     metrics: "83.7",
//     growth: 4.5,
//     activity: 8,
//   },
//   {
//     network: "youtube",
//     profil: "/massinart.jpg",
//     username: "massinart.ma",
//     name: "Massinart",
//     followers: 2350,
//     er: 3.2,
//     avgEngage: 5000,
//     avgViews: 200000,
//     metrics: "88.1",
//     growth: 12.8,
//     activity: 4,
//   },
// ];

const AudienceReport = () => {

  const [audienceData, setAudienceData] = useState<DataType | null>(null);
  const [networkData, setNetworkData] = useState<any | null>(null);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const response: any = await v1Api.get('/audience');
      setNetworkData(response?.data?.networks);
      setAudienceData(response?.data?.audience);
    };
    fetchData();
  }, []);

  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className="@container w-full flex flex-col gap-3">
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Audience
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>

      
      <div className="grid grid-cols-1 w-full">
        <AudienceSocialTable networks={networkData || []} />
      </div>


      {audienceData && (
        <div className="overflow-x-hidden">
          <div className="min-w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <QualitySplit
              percentages={{
                fakePeople: audienceData.fakePercentage,
                realPeople: audienceData?.realPercentage,
              }}
            />
            <ChartGenderSplit
              percentages={{
                male: audienceData.malePercentage,
                female: audienceData?.femalePercentage,
                unknown: audienceData?.unknownPercentage,
              }}
            />

            <Card className="relative">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    Répartition de la Portée de l&apos;Audience
                  </CardTitle>
                  <ToolTipsProvider
                    title={`Affiche le pourcentage d’abonnés segmentés selon le nombre de comptes qu’ils suivent : plus de 1 500, entre 1 000 et 1 500, 500 à 1 000, et moins de 500. Les abonnés qui suivent plus de 1 500 comptes sont moins susceptibles de voir du contenu sponsorisé.`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig2} className="aspect-none h-[340px] w-full">
                  <BarChart accessibilityLayer data={chartData2}>
                    <XAxis
                      dataKey="month"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis type="number" />
                    <ChartTooltip
                      cursor={false}
                      content={<CustomBarTooltip />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={5}
                      barSize={50}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <div className="absolute bottom-4 left-6">
                <div className="relative">
                  <div
                    className="text-sm text-black flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setShowInsight(true)}
                    onMouseLeave={() => setShowInsight(false)}
                  >
                    <Image
                      src="/icons/IN-TALKS-logo.png-2.webp"
                      alt="IN-TALKS Logo"
                      width={22}
                      height={22}
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    />
                    <span
                      className="font-semibold"
                      style={{
                        background:
                          "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                      }}
                    >
                      AI-Powered Insight
                    </span>
                  </div>
                  {showInsight && (
                    <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        L&apos;analyse de la portée de l&apos;audience montre
                        que 60% des abonnés ont moins de 500 connexions, ce qui
                        indique un fort potentiel de portée organique.
                        Concentrez-vous sur l&apos;engagement de ce segment très
                        accessible pour maximiser la visibilité et
                        l&apos;interaction du contenu.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <AgeGenderBreakdown />

            {audienceData.countries && (
              <CountriesSplit
                title="Abonnés par Pays"
                data={JSON.parse(audienceData.countries.toString())}
                tooltip={`Localisation de l’audience par pays.`}
              />
            )}

            {audienceData.cities && (
              <CountriesSplit
                title="Abonnés par Ville"
                data={JSON.parse(audienceData.cities.toString())}
                tooltip={`Localisation de l’audience par ville`}
              />
            )}

            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <BrandAffinity />

                  {audienceData.interest && (
                    <Interset
                      title="Affinité d&apos;Intérêt de l&apos;Audience"
                      data={JSON.parse(audienceData.interest.toString())}
                    />
                  )}

                {audienceData.language && JSON.stringify(audienceData.language) !== "{}" && (
                  <ChartLangage data={JSON.parse(audienceData.language.toString())} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudienceReport;
