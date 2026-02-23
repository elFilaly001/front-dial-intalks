import React, { useEffect } from "react";
import KeywordWithSetiments from "../dashboard/KeywordWithSetiments";
import MentionsBySentiments from "../dashboard/MentionsBySentiments";
import { DailyMention } from "../dashboard/MentionsBySentiments";
import KeywordsWithSentiment, { KeywordSentiment } from "../dashboard/KeywordsWithSentiment";
import TopLocationsWithSentiment from "../dashboard/TopLocationsWithSentiment";
import {v1Api} from "@/services/axiosService";



const dataNetworks = [
  {
    name: "Facebook",
    actual: 82000,
    target: 90000,
    positive: 420,
    negative: 85,
    neutral: 195,
  },
  {
    name: "Instagram",
    actual: 48000,
    target: 65000,
    positive: 310,
    negative: 70,
    neutral: 120,
  },
  {
    name: "TikTok",
    actual: 34000,
    target: 45000,
    positive: 180,
    negative: 45,
    neutral: 75,
  },
  {
    name: "Twitter (X)",
    actual: 77000,
    target: 90000,
    positive: 125,
    negative: 50,
    neutral: 60,
  },
  {
    name: "LinkedIn",
    actual: 68000,
    target: 80000,
    positive: 120,
    negative: 65,
    neutral: 40,
  },
  {
    name: "YouTube",
    actual: 52000,
    target: 70000,
    positive: 290,
    negative: 50,
    neutral: 110,
  },
];


const Sentiment = () => {
  // Remove unused data state
  type CitySentiment = {
    city: string;
    positif: number;
    neutre: number;
    negatif: number;
  };
  type SourceSentiment = {
    name: string;
    positive: number;
    neutral: number;
    negative: number;
  };
  const [citiesBySentiment, setCitiesBySentiment] = React.useState<CitySentiment[]>([]);
  const [sourcesBySentiment, setSourcesBySentiment] = React.useState<SourceSentiment[]>([]);
  const [keywordsBySentiment, setKeywordsBySentiment] = React.useState<KeywordSentiment[]>([]);
  const [dailyMentions, setDailyMentions] = React.useState<DailyMention[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await v1Api.get("/dashboard/sentiment");
        // Transform API data for TopLocationsWithSentiment
        if (response.data?.citiesBySentiment) {
          const cityData: CitySentiment[] = response.data.citiesBySentiment.map((item: any) => ({
            city: item.city,
            positif: item.POSITIVE || 0,
            neutre: item.NEUTRAL || 0,
            negatif: item.NEGATIVE || 0,
          }));
          setCitiesBySentiment(cityData);
        }
        if (response.data?.sourceWithSentiment) {
          const sourceData: SourceSentiment[] = response.data.sourceWithSentiment.map((item: any) => ({
            name: item.source,
            positive: item.POSITIVE || 0,
            neutral: item.NEUTRAL || 0,
            negative: item.NEGATIVE || 0,
          }));
          setSourcesBySentiment(sourceData);
        }
        if (response.data?.keywordsWithSentiment) {
          const keywordData: KeywordSentiment[] = response.data.keywordsWithSentiment.map((item: any) => ({
            keyword: item.keyword,
            positif: item.POSITIVE || 0,
            neutre: item.NEUTRAL || 0,
            negatif: item.NEGATIVE || 0,
          }));
          setKeywordsBySentiment(keywordData);
        }
        if (response.data?.dailyMentions) {
          setDailyMentions(response.data.dailyMentions);
        }
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Sentiments
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <MentionsBySentiments data={dailyMentions} />
        <KeywordsWithSentiment data={keywordsBySentiment} />
        <div className="flex flex-col lg:flex-row gap-6 [&>*]:flex-1 [&>*]:min-w-0">
          <KeywordWithSetiments
            label="Répartition des Sentiments par Source"
            data={sourcesBySentiment}
            tooltip={`Ce graphique montre la répartition des sentiments (positif, neutre, négatif) générés par la marque sur chaque plateforme sociale. Il permet d'identifier les canaux qui suscitent le plus d'engagement positif, ceux où les conversations sont plus mitigées, ainsi que les sources où le sentiment négatif est le plus élevé.`}
          />
          <TopLocationsWithSentiment data={citiesBySentiment} />
        </div>
      </div>
    </div>
  );
};

export default Sentiment;
