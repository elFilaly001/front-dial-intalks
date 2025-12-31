/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react";
import Image from "next/image";
import React, { use } from "react";
import Link from "next/link";
import moment from "moment";
import formatNumber from "@/lib/numbers";
import { fetchImages } from "@/lib/fetchImages";
import { useSession } from "next-auth/react";

interface InfluencerType {
  verified: boolean;
  username: string;
  name: string;
  profilePic: string;
  network?: string;
}

const PostCard = ({
  post,
  influencer,
}: {
  post: any;
  influencer: InfluencerType | undefined;
}) => {
  // Determine network from post data or influencer
  const getNetworkIcon = (network: string) => {
    const networkIcons: { [key: string]: string } = {
      instagram: "/media/instagram.png",
      youtube: "/media/youtube.png",
      tiktok: "/media/tiktok.png",
      facebook: "/media/facebook.png",
      linkedin: "/media/linkedin.png",
      twitter: "/media/twitter.png",
      x: "/media/twitter.png",
    };
    return networkIcons[network] || "/media/instagram.png";
  };

  const network = post.network || influencer?.network || "instagram";
  const networkIcon = getNetworkIcon(network);
  const { data: session } = useSession();

  return (
    <div className="bg-white border dark:border-gray-800 border-gray-200 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 rounded-md px-2 hover:shadow-lg flex flex-col gap-5 justify-between">
      {/* Avatar User */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center gap-2 px-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-12 h-12 bg-gray-800 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${fetchImages(session?.user.image ?? "")})` }}
              ></div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-sm flex-1 truncate">
                    {session?.user.name || ""}
                  </p>

                  {influencer?.verified && (
                    <Image
                      src="/verified.png"
                      alt="Verified badge"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  )}
                </div>

                <p className="text-xs">{post.location}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={networkIcon}
              alt={`${network} icon`}
              width={20}
              height={20}
              className="rounded"
            />
            {post?.displayURL ? (
              <Link
                href={post.displayURL}
                target="_blank"
                className="border dark:border-gray-800 border-gray-200 h-8 w-8 flex justify-center items-center dark:text-gray-700 text-gray-600 rounded-md"
              >
                <SquareArrowOutUpRight className="h-5 w-5" />
              </Link>
            ) : (
              <div
                className="border dark:border-gray-800 border-gray-200 h-8 w-8 flex justify-center items-center text-gray-400 rounded-md opacity-60 cursor-not-allowed"
                aria-hidden
              >
                <SquareArrowOutUpRight className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div
          className="h-[350px] w-full rounded-md bg-cover bg-no-repeat bg-center bg-gray-700"
          style={{ backgroundImage: `url(${fetchImages(post.mediaUrl)})` }}
        ></div>
        <p className="text-xs text-end flex justify-end items-center gap-2.5">
          <Calendar className="h-4 w-4" />
          {moment(post.postedDate, "YYYYMMDD").fromNow()}
        </p>
      </div>

      <div className="flex flex-col gap-5 mb-5 text-sm">
        <p className="dark:text-gray-300 text-gray-800 text-sm">
          {post.caption && post.caption.substring(0, 150)} ...
        </p>

        <div
          className={`grid gap-3 divide-x divide-gray-600 ${post.viewsCount ? "grid-cols-3 " : "grid-cols-2"
            }`}
        >
          <div className="flex items-center gap-2 justify-center">
            <Heart className="w-4 h-4" />
            <p className="text-xs">{formatNumber(post.likesCount)}</p>
          </div>

          <div className="flex items-center gap-2 justify-center">
            <MessageCircle className="w-4 h-4" />
            <p className="text-xs">{formatNumber(post.commentsCount)}</p>
          </div>

          {post.viewsCount > 0 && (
            <div className="flex items-center gap-2 justify-center">
              <Eye className="w-4 h-4" />
              <p className="text-xs">{formatNumber(post.viewsCount)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
