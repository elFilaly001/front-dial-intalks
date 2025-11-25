import React from "react";
import KeywordWithSetiments from "../dashboard/KeywordWithSetiments";
import MentionsBySentiments from "../dashboard/MentionsBySentiments";
import KeywordsWithSentiment from "../dashboard/KeywordsWithSentiment";
import TopLocationsWithSentiment from "../dashboard/TopLocationsWithSentiment";



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
    positive: 395,
    negative: 90,
    neutral: 160,
  },
  {
    name: "LinkedIn",
    actual: 68000,
    target: 80000,
    positive: 330,
    negative: 65,
    neutral: 140,
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
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <MentionsBySentiments />
      <KeywordsWithSentiment />
      <div className="grid grid-cols-4 gap-6">
        <KeywordWithSetiments
          label="Sentiment by Source Type"
          data={dataNetworks}
          tooltip={`Shows the sentiment breakdown by source type for the last 7 days. Hover over each bar to see the count and percentage for each sentiment type. Use this data to identify which sources drive positive or negative conversations.`}
        />
        <TopLocationsWithSentiment/>
      </div>
      
    </div>
  );
};

export default Sentiment;
