import React, { use, useEffect } from "react";
import KeywordWithSetiments from "../dashboard/KeywordWithSetiments";
import MentionsBySentiments from "../dashboard/MentionsBySentiments";
import KeywordsWithSentiment from "../dashboard/KeywordsWithSentiment";
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

  const [data , setData] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await v1Api.get("/dashboard");
        console.log("Sentiment data:", response.data);
      } catch (error) {
        console.error("Error fetching sentiment data:", error);
      }
    }
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
        <MentionsBySentiments />
        <KeywordsWithSentiment />
        <div className="flex flex-col lg:flex-row gap-6 [&>*]:flex-1 [&>*]:min-w-0">
          <KeywordWithSetiments
            label="Répartition des Sentiments par Source"
            data={dataNetworks}
            tooltip={`Ce graphique montre la répartition des sentiments (positif, neutre, négatif) générés par la marque sur chaque plateforme sociale. Il permet d'identifier les canaux qui suscitent le plus d'engagement positif, ceux où les conversations sont plus mitigées, ainsi que les sources où le sentiment négatif est le plus élevé.`}
          />
          <TopLocationsWithSentiment />
        </div>
      </div>
    </div>
  );
};

export default Sentiment;
