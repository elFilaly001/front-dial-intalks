import React from "react";
import Image from "next/image";
import { fetchImages } from "@/lib/fetchImages";
import { useSession } from "next-auth/react";

// Helper to map network key to an icon path (keeps logic similar to PostCard)
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

export interface PostRow {
  id: string;
  caption: string;
  network: string;
  // make label/icon optional so callers don't HAVE to provide them
  networkLabel?: string;
  networkIcon?: string;
  likes: number;
  comments: number;
  shares?: number | string;
  views: number;
  engagementRate: number;
  date: string;
}

interface PostsTableProps {
  posts: PostRow[];
}

const PostsTable: React.FC<PostsTableProps> = ({ posts }) => {
    const { data: session } = useSession();
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full border border-gray-200 rounded-lg bg-white">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2 font-semibold">Post</th>
            <th className="px-4 py-2 font-semibold">Social</th>
            <th className="px-4 py-2 font-semibold">Likes</th>
            <th className="px-4 py-2 font-semibold">Comments</th>
            <th className="px-4 py-2 font-semibold">Shares</th>
            <th className="px-4 py-2 font-semibold">Views</th>
            <th className="px-4 py-2 font-semibold">Eng. rate</th>
            <th className="px-4 py-2 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            const networkIcon = post.networkIcon || getNetworkIcon(post.network || "instagram");
            const networkLabel = post.networkLabel || post.network || "Social";

            // Safely handle likes, comments, views for toLocaleString
            const likes = typeof post.likes === 'number' && !isNaN(post.likes) ? post.likes : 0;
            const comments = typeof post.comments === 'number' && !isNaN(post.comments) ? post.comments : 0;
            const views = typeof post.views === 'number' && !isNaN(post.views) ? post.views : 0;

            return (
              <tr key={post.id} className="border-b">
                <td className="px-4 py-2 align-top">
                  <div className="flex gap-2 items-center">
                    <div
                      className="w-8 h-8 bg-gray-800 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${fetchImages(session?.user.image ?? "")})` }}
                    ></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-3">{post.caption}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 align-top">
                  <div className="flex gap-2 items-center">
                    {post.network === "x" ? (
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        <Image
                          src={networkIcon}
                          alt={networkLabel}
                          width={24}
                          height={24}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.innerHTML = `<svg width='24' height='24' viewBox='0 0 24 24'><path fill='black' d='M17.53 3H21L14.19 10.63L22.09 21H15.63L10.77 14.62L5.29 21H2L9.13 13L1.61 3H8.24L12.68 8.87L17.53 3ZM16.41 19H18.23L7.75 5H5.81L16.41 19Z'/></svg>`;
                            }
                          }}
                        />
                      </span>
                    ) : (
                      <Image src={networkIcon} alt={networkLabel} width={24} height={24} />
                    )}
                    <span className="font-medium">{networkLabel}</span>
                  </div>
                </td>
                <td className="px-4 py-2 align-top">{likes.toLocaleString()}</td>
                <td className="px-4 py-2 align-top">{comments.toLocaleString()}</td>
                <td className="px-4 py-2 align-top">{post.shares ?? '-'}</td>
                <td className="px-4 py-2 align-top">{views.toLocaleString()}</td>
                <td className="px-4 py-2 align-top">{post.engagementRate}%</td>
                <td className="px-4 py-2 align-top">{post.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;
