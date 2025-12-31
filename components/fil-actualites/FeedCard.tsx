import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Calendar, Trash, ChevronDown } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";

interface Mention {
  id: string;
  title: string;
  link: string;
  postedDate: string;
  thumbnail: string;
  snippet: string;
  source: string;
  type: string;
}
const FeedCard = ({ feed, onDelete, onUpdateSentiment }: { feed: Mention; onDelete?: (id: string) => void; onUpdateSentiment?: (id: string, newType: string) => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const normalizedType = feed.type === "Article" ? "NEUTRAL" : feed.type;

  return (
    <Card className="relative h-40 overflow-hidden">
      {onDelete && (
        <button
          onClick={() => onDelete(feed.id)}
          className="absolute bottom-3 right-3 p-1 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <Trash className="h-4 w-4 text-red-500" />
        </button>
      )}
      <div className="absolute top-3 right-3">
        <Badge
          onClick={() => setShowDropdown(!showDropdown)}
          className={`cursor-pointer flex items-center gap-1 ${normalizedType === "POSITIVE"
              ? "bg-green-500 text-white"
              : normalizedType === "NEGATIVE"
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white"
            }`}
        >
          {normalizedType}
          <ChevronDown className="h-3 w-3" />
        </Badge>
        {showDropdown && (
          <div className="absolute top-full mt-1 bg-white border rounded shadow-lg">
            {["POSITIVE", "NEGATIVE", "NEUTRAL"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  onUpdateSentiment?.(feed.id, type);
                  setShowDropdown(false);
                }}
                className={`block w-full px-3 py-1 text-left hover:bg-gray-100 ${type === "POSITIVE"
                    ? "text-green-600"
                    : type === "NEGATIVE"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
      <CardContent className="relative rounded-md flex items-center gap-4 p-4 h-full">
        <a
          key={feed.id}
          href={feed.link ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-shrink-0"
        >
          <div
            className="h-24 w-24 rounded-md bg-gray-700 bg-cover bg-center"
            style={{ backgroundImage: `url(${feed.thumbnail})` }}
          ></div>
        </a>
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <a
            key={feed.id}
            href={feed.link ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2"
          >
            <h2 className="text-sm font-semibold line-clamp-1 leading-tight">{feed.title}</h2>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{moment(feed.postedDate).format("MMM Do YYYY")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={`/media/${feed.source.toLowerCase()}.png`}
                  alt={`/media/${feed.source}.png`}
                  width={16}
                  height={16}
                />
                <span className="capitalize">{feed.source}</span>
              </div>
            </div>
            {feed.snippet && (
              <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
                {feed.snippet.slice(0, 120)}...
              </p>
            )}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedCard;
