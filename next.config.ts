import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "flagcdn.com",
      "favikon-medias.s3.eu-west-3.amazonaws.com",
      "in-talks.content-website.xyz",
    ],
  },
};

export default nextConfig;
