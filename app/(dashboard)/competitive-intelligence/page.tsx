
import ShareOfVoiceByMentionsDonut from "@/components/dashboard/ShareOfVoiceByMentions";
import ShareOfVoiceBySourceCard from "@/components/dashboard/ShareOfVoiceBySource";
import SocialCoverage from "@/components/media/SocialCoverage";
import React from "react";

const networks = [
  {
    network: "instagram",
    profil: "/glovo-logo.jpg",
    username: "glovo_ma",
    name: "Glovo Maroc",
    followers: 122000,
    er: 2.5,
    avgEngage: 19000,
    avgViews: 211400,
    metrics: "85.4/100",
  },
  {
    network: "instagram",
    profil:
      "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/32229526303.jpg",
    username: "Yassir.ma",
    name: "Yassir.ma",
    followers: 42000,
    er: 1.5,
    avgEngage: 19000,
    avgViews: 21400,
    metrics: "75.4/100",
  },
];

const page = () => {
  return (
    <div className="@container/main flex flex-col">
      <div className="flex flex-col gap-5 container mx-auto">
        <SocialCoverage networks={networks} />
        <ShareOfVoiceByMentionsDonut />
        <ShareOfVoiceBySourceCard />
        {/* <div className="grid grid-cols-2 gap-5">
          <KeywordWithSetiments
            label="Sentiment by Source Type"
            data={dataNetworks}
          />
        </div> */}
      </div>
    </div>
  );
};

export default page;
