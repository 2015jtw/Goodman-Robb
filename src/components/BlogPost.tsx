import React from "react";
import Link from "next/link";
import Image from "next/image";

// UI
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

// sanity
import { urlFor } from "@/sanity/lib/image";
import {
  SINGLE_BLOG_POST_QUERYResult,
  RECENT_BLOGS_QUERYResult,
} from "../../sanity.types";
import { PortableText } from "next-sanity";
import RecentPostsCarousel from "./RecentBlogPosts";

const BlogPost = ({
  post,
  recentPosts,
}: {
  post: SINGLE_BLOG_POST_QUERYResult;
  recentPosts: RECENT_BLOGS_QUERYResult;
}) => {
  return (
    <article className="min-h-screen bg-gray-50">
      <div key={post?._id}>
        <div className="w-full h-[300px] md:h-[400px] relative bg-black">
          <Image
            src={post && post.mainImage ? urlFor(post.mainImage).url() : ""}
            alt={post?.mainImage?.alt || "Blog Post"}
            className="w-full h-full object-cover opacity-80"
            width={400}
            height={300}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="container mx-auto max-w-4xl">
              <Badge className="mb-4 bg-blue-500 hover:bg-blue-600 text-white">
                {post &&
                  post.categories?.map((category) => category.title).join(", ")}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {post && post.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {post && post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown date"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post && post.readTime} minute read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto p-4 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Navigation */}
            <div className="mb-4">
              <Link href="/blog" className="gap-2">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
              {/* Main Content */}
              <div className="max-w-none">
                {/* Author Card */}
                <Card className="mb-8">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Image
                      src={
                        post?.author?.image
                          ? urlFor(post.author.image).url()
                          : ""
                      }
                      alt={post?.author?.name || "Author"}
                      className="w-16 h-16 rounded-full"
                      width={64}
                      height={64}
                    />
                    <div>
                      {/* TODO: Add type safety to post --> needs to be in query */}
                      <h4 className="font-semibold text-lg">
                        {post?.author?.name}
                      </h4>
                      <p className="text-gray-600">{post?.author?.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* FUTURE TODO: This is where the Share button will live */}
            </div>
            {/* INTRO */}
            {post?.intro && (
              <div className="mb-6">
                <h2 className="font-semibold text-xl mb-2">Summary</h2>
                <PortableText
                  value={post?.intro || []}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="italic">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
            )}

            {/* MAIN CONTENT */}
            {post?.main_content && (
              <div>
                <PortableText
                  value={post?.main_content || []}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mt-6 mb-2">
                          {children}
                        </h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
                          {children}
                        </blockquote>
                      ),
                    },
                    types: {
                      image: ({ value }) => (
                        <div className="my-6">
                          <Image
                            src={urlFor(value).url()}
                            alt={value?.alt || "Image"}
                            className="w-full h-auto rounded-lg shadow-md"
                            width={600}
                            height={400}
                          />
                        </div>
                      ),
                    },
                  }}
                />
              </div>
            )}

            <RecentPostsCarousel recentPosts={recentPosts || []} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
