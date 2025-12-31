import KeywordsWithSentiment from "@/components/dashboard/KeywordsWithSentiment";
import KeywordWithSetiments from "@/components/dashboard/KeywordWithSetiments";
import MentionsBySentiments from "@/components/dashboard/MentionsBySentiments";
import TopLocationsWithSentiment from "@/components/dashboard/TopLocationsWithSentiment";
import Cucumber from "@/components/ui/Cucumber";
import ActionsDropdown from "@/components/ui/ActionsDropdown";

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

export default function SocialListeningPage() {
  return (
        <div className="@container/main flex flex-col gap-4 md:gap-6">
          <div className="flex items-center justify-between">
            <Cucumber />
            <ActionsDropdown />
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
}
