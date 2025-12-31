import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Small logo component that falls back to an inline SVG with initials when the
// requested image is missing (this avoids rendering broken images when the
// repository doesn't contain the expected brand files).
const BrandLogo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  const initials = (alt || "")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='56' fill='%236b7280'>${initials}</text></svg>`;
  const fallback = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    // use a plain img tag so we can swap to the data-uri fallback on error
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-full object-contain rounded-md"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};
import ToolTipsProvider from "./ToolTipsProvider";

type BrandItem = {
  name: string;
  logo: string;
  value: number; // percentage 0-100
};

// Use Clearbit's logo API as a lightweight CDN for brand logos. If the
// remote request fails (CORS, rate-limit or missing), the local inline-SVG
// fallback (initials) will display instead.
const defaultBrands: BrandItem[] = [
  { name: "Yan&One", logo: "/yanandone.png", value: 8 },
  { name: "INWI", logo: "/inwi.png", value: 7 },
  { name: "Marjane", logo: "/MARJANE.jpg", value: 4 },
  { name: "Nike", logo: "https://logo.clearbit.com/nike.com", value: 4 },
  { name: "ZARA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/512px-Zara_Logo.svg.png", value: 3 },
];

const BrandAffinity = ({ title = "Marques préférées de l’audience", data = defaultBrands }:{ title?: string; data?: BrandItem[] }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <Card className="flex flex-col rounded-md gap-5 relative">
      <CardHeader className="pb-0">
        <div className="flex items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <ToolTipsProvider
            title={`Identifie les marques préférées de l’audience à partir des légendes, mentions, hashtags et tags de localisation.`}
          />
        </div>
      </CardHeader>

  <CardContent className="justify-center pb-16 bg-transparent mt-3 flex flex-col gap-3">
        {data.map((brand, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center text-sm justify-between">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <BrandLogo src={brand.logo} alt={brand.name} />
                </div>
                <p className="font-medium text-sm">{brand.name}</p>
              </div>
              <p className="text-sm">{brand.value}%</p>
            </div>

            <span
              className="w-full block h-1 rounded-full bg-[#ea1c80] "
              style={{
                width: `${brand.value.toFixed(2)}%`,
              }}
            ></span>
          </div>
        ))}
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
              style={{ display: "inline-block", verticalAlign: "middle" }}
            />
            <span
              className="font-semibold"
              style={{
                background: 'linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              AI-Powered Insight
            </span>
          </div>

          {showInsight && (
            <div className="absolute bottom-full left-0 mb-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 w-auto min-w-80 max-w-xl">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Les logos représentent des marques courantes associées à l&apos;audience. Utilisez ces insights pour identifier des partenaires potentiels ou benchmarker l&apos;affinité de la marque.
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BrandAffinity;
