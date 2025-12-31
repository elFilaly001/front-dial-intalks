import React from "react";
import SocialCoverage from "../media/SocialCoverage";

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
    profil: "https://favikon-medias.s3.eu-west-3.amazonaws.com/in/32229526303.jpg",
    username: "Yassir.ma",
    name: "Yassir.ma",
    followers: 42000,
    er: 1.5,
    avgEngage: 19000,
    avgViews: 21400,
    metrics: "75.4/100",
  },
];

const Surveillance = () => {
  return (
    <div className="container mx-auto mt-12" >
      <SocialCoverage networks={networks} />
    </div>
  );
};

export default Surveillance;
