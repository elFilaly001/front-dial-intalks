import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ToolTipsProvider from "../charts/ToolTipsProvider";

const MostHashtags = () => {
  const glovoMarocHashtags = [
    { keyword: "#GlovoMaroc", value: 45 },
    { keyword: "#GlovoMorocco", value: 38 },
    { keyword: "#LivraisonGlovo", value: 32 },
    { keyword: "#GlovoDelivery", value: 28 },
    { keyword: "#GlovoCasablanca", value: 25 },
    { keyword: "#GlovoMarrakech", value: 22 },
    { keyword: "#GlovoRabat", value: 19 },
    { keyword: "#GlovoFes", value: 16 },
    { keyword: "#GlovoTangier", value: 14 },
    { keyword: "#CommanderGlovo", value: 12 },
  ];

  return (
    <Card className="relative">
      <div className=" absolute top-0 right-0">
        <ToolTipsProvider
          title={`A list of popular hashtags related to Glovo in Morocco, highlighting trending topics and themes.`}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-center font-semibold">
          Top Hashtags
        </CardTitle>
        <p className="text-xs text-gray-500 text-center mt-3">
          Popular hashtags about Glovo in Morocco
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {glovoMarocHashtags
            .slice(0, 6)
            .sort((a, b) => b.value - a.value)
            .map(({ keyword, value }) => (
              <div className="flex justify-between items-center" key={keyword}>
                <p className="text-blue-600 font-medium">{keyword}</p>
                <div className="h-8 w-8 bg-primary rounded-full flex justify-center items-center text-white text-sm">
                  {value}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MostHashtags;
