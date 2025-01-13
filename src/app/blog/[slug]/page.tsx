// React/Next
import React from "react";

// UI
import BlogPost from "@/components/BlogPost";

// sanity
import { client } from "../../../sanity/lib/client";
import {
  SINGLE_BLOG_POST_QUERY,
  RECENT_BLOGS_QUERY,
} from "@/sanity/lib/queries";
import {
  SINGLE_BLOG_POST_QUERYResult,
  RECENT_BLOGS_QUERYResult,
} from "../../../../sanity.types";

const options = { next: { revalidate: 30 } };

type BlogPostPageProps = {
  params: { slug: string }; // `params` is used in Next.js's App Router
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  const post: SINGLE_BLOG_POST_QUERYResult | null = await client.fetch(
    SINGLE_BLOG_POST_QUERY,
    { slug },
    options
  );

  const recentPosts: RECENT_BLOGS_QUERYResult = await client.fetch(
    RECENT_BLOGS_QUERY,
    { limit: 6 },
    options
  );

  return <BlogPost post={post} recentPosts={recentPosts} />;
}
