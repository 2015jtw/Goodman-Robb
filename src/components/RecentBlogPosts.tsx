// React/Next
import React from "react";
import Link from "next/link";
import Image from "next/image";

// UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sanity
import { urlFor } from "@/sanity/lib/image";
import { RECENT_BLOGS_QUERYResult } from "../../sanity.types";
import { PortableText } from "next-sanity";

interface RecentPostsCarouselProps {
  recentPosts: RECENT_BLOGS_QUERYResult;
}

export default function RecentPostsCarousel({
  recentPosts,
}: RecentPostsCarouselProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Recent posts</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {recentPosts.map((post) => (
            <CarouselItem key={post._id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/blog/${post.slug?.current}`}>
                <Card className="h-full shadow-sm hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="aspect-video relative mb-4">
                      <Image
                        src={
                          post && post.mainImage
                            ? urlFor(post.mainImage).url()
                            : ""
                        }
                        alt={post.title || "Blog post image"}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {post?.intro && (
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
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.categories?.map((category) => (
                        <Badge key={category._id} variant="secondary">
                          {category.title}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
