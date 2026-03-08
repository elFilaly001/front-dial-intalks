import React, { useState, useEffect } from "react";
import PostsTable, { PostRow } from "./PostsTable";
import PostCard from "./PostCard";
import Image from "next/image";
import { BookmarkIcon, LayoutGrid, List } from "lucide-react";
import OrderByFilter from "../FiltersInfluencers/OrderByFilter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import ExportButton from "../ui/ExportButton";
import { v1Api } from "@/services/axiosService";

const media = [
  {
    label: "Tous les réseaux sociaux",
    // no image for the 'All' option - render an icon instead
  },
  {
    label: "Instagram",
    image: "/media/instagram.png",
  },
  {
    label: "Youtube",
    image: "/media/youtube.png",
  },
  {
    label: "Tiktok",
    image: "/media/tiktok.png",
  },
  {
    label: "Facebook",
    image: "/media/facebook.png",
  },
  {
    label: "Linkedin",
    image: "/media/linkedin.png",
  },
  {
    label: "X Platform",
    image: "/media/twitter.png",
  },
];
const influencer = {
  id: "cmhjwf16z0002kqz0qttwcbp8",
  avgLike: 305,
  avgComment: 27,
  avgViews: 327863,
  egRate: 0.3,
  username: "massinart.ma",
  verified: true,
  followersExact: 112206,
  accountLocation: "Morocco",
  name: "Massinart",
  bio: "Commandez tout ce dont vous avez besoin sur Massinart💛",
  followers: "112K",
  following: "13",
  postsCount: 392,
  profilePic: "/massinart.jpg",
  gender: "male",
  createdAt: "2025-11-04T01:36:56.267Z",
  updatedAt: "2025-11-04T01:36:56.267Z",
  categoryId: "cmhjwf11y0000kqz0qgcp56si",
  network: "instagram",
  countryId: "cmeu1k5h100020lsizz214mhf",
  accountId: null,
};

interface Post {
  id: string;
  date: string;
  displayURL: string;
  mediaUrl: string;
  caption: string;
  postedDate: string;
  totalLikes: number;
  totalComments: number;
  viewsCount: number;
  type: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  networkId: string;
  network: {
    name: string;
    username: string;
    profil: string;
    network: string;
  };
  likesCount: number; // added for compatibility
  commentsCount: number; // added for compatibility
}

interface DataType {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

const PostsGrid = () => {
  const [source, setSource] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [postsData, setPostsData] = useState<DataType | null>(null);
  const [orderBy, setOrderBy] = useState<string | undefined>(undefined);

  const sortPosts = (posts: Post[], orderBy: string | undefined) => {
    if (!orderBy) return posts;
    const sorted = [...posts];
    switch (orderBy) {
      case "updated_at":
        return sorted.sort(
          (a, b) =>
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
        );
      case "followers_desc":
        return sorted.sort((a, b) => b.totalLikes - a.totalLikes);
      case "followers_asc":
        return sorted.sort((a, b) => b.totalLikes - a.totalLikes);
      case "engagement_desc":
        return sorted.sort((a, b) => b.totalComments - a.totalComments);
      case "engagement_asc":
        return sorted.sort((a, b) => a.totalComments - b.totalComments);
      case "engagement_asc2":
        return sorted.sort((a, b) => b.viewsCount - a.viewsCount);
      default:
        return posts;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await v1Api.get("/dashboard/posts");
        const data = response.data;
        const posts = data.posts.map((p: any) => ({
          ...p,
          likesCount: p.totalLikes,
          commentsCount: p.totalComments,
        }));
        data.posts = sortPosts(posts, orderBy);
        setPostsData(data);
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    }
    fetchData();
  }, [orderBy]);

  const labelToNetwork: Record<string, string> = {
    Instagram: "instagram",
    Youtube: "youtube",
    Tiktok: "tiktok",
    Facebook: "facebook",
    Linkedin: "linkedin",
    "X Platform": "x",
  };

  const filteredPosts =
    !source || source === "Tous les réseaux sociaux"
      ? (postsData?.posts ?? [])
      : (postsData?.posts ?? []).filter(
          (p) =>
            (p.network?.network ?? "").toLowerCase() ===
            (labelToNetwork[source] ?? source.toLowerCase()),
        );

  // Prepare export data for posts
  const exportHeaders = [
    "ID",
    "Légende",
    "URL",
    "Date",
    "Type",
    "Likes",
    "Commentaires",
    "Vues",
  ];
  const exportRows = filteredPosts.map((post) => [
    post.id,
    post.caption,
    post.displayURL,
    post.postedDate,
    post.type,
    post.totalLikes,
    post.totalComments,
    post.viewsCount,
  ]);

  // Map posts data to table rows for PostsTable
  const postsTableRows: PostRow[] = filteredPosts.map((post) => {
    return {
      id: post.id,
      caption: post.caption,
      network: post.network?.network || influencer?.network,
      likes: post.totalLikes,
      comments: post.totalComments,
      shares: "-", // no shares in data
      views: post.viewsCount,
      engagementRate: 9.9, // placeholder
      date: post.postedDate,
    };
  });

  return (
    <div>
      <div className="">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white inline-flex flex-col">
          Publication
          <div className="flex flex-row gap-1 mt-2  mb-4">
            <div className="w-[20%] h-1 bg-[#f02cb9] rounded-full"></div>
            <div className="w-[10%] h-1 bg-[#35b9f4] rounded-full"></div>
          </div>
        </h2>
      </div>
      <div className="">
        <div className="flex justify-between items-center pt-4 pb-4">
          {/* Left side: Export button */}
          <div className="flex items-center">
            <ExportButton
              data={{
                headers: exportHeaders,
                rows: exportRows,
                filename: "publications",
              }}
            />

            {/* View mode segmented control (grid / list) */}
            <div
              className="ml-2 flex items-center rounded-md shadow-sm overflow-hidden"
              role="tablist"
              aria-label="View switch"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`rounded-r-none ${
                  viewMode === "grid"
                    ? "bg-main text-white border-main"
                    : "text-gray-600"
                }`}
              >
                <LayoutGrid
                  className={`h-4 w-4 ${
                    viewMode === "grid" ? "text-white" : "text-gray-600"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={`rounded-l-none ${
                  viewMode === "list"
                    ? "bg-main text-white border-main"
                    : "text-gray-600"
                }`}
              >
                <List
                  className={`h-4 w-4 ${
                    viewMode === "list" ? "text-white" : "text-gray-600"
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Right side: controls group */}
          <div className="flex items-center gap-2">
            <OrderByFilter value={orderBy} onChange={setOrderBy} />

            <Select value={source} onValueChange={(v) => setSource(v)}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Par source" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Par source</SelectLabel>
                  {media.map((item) => (
                    <SelectItem key={item.label} value={item.label}>
                      {item.image ? (
                        item.label === "X Platform" ? (
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={20}
                            height={20}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                const svg = document.createElementNS(
                                  "http://www.w3.org/2000/svg",
                                  "svg",
                                );
                                svg.setAttribute("width", "20");
                                svg.setAttribute("height", "20");
                                svg.setAttribute("viewBox", "0 0 24 24");
                                svg.innerHTML =
                                  '<path fill="black" d="M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z"/>';
                                parent.insertBefore(svg, parent.firstChild);
                              }
                            }}
                          />
                        ) : (
                          <Image
                            src={item.image}
                            alt={item.label}
                            width={20}
                            height={20}
                          />
                        )
                      ) : (
                        <BookmarkIcon className="h-4 w-4 text-gray-500 mr-2" />
                      )}
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <p className="text-xs">
              The audience data is based on {source ?? "All Social Medias"}
            </p> */}
          </div>
        </div>

        {viewMode === "list" ? (
          <PostsTable posts={postsTableRows} />
        ) : (
          <div className={`grid grid-cols-4 gap-3`}>
            {filteredPosts.length > 0 &&
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} influencer={influencer} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsGrid;
