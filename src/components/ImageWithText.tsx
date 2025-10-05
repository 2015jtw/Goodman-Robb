// React/Next
import Image from "next/image";
import React from "react";

// UI
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

// Sanity
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { TypedObject } from "sanity";

const ImageWithText = ({
  title,
  description,
  serviceLink,
  imageLink,
  imageAlt,
  chartComponent,
  swap,
  className,
  id,
  tallImage,
  idx,
  totalLength,
}: {
  title: string;
  description: TypedObject | TypedObject[];
  serviceLink: string;
  defaultTopic: string;
  imageLink?: string;
  className?: string;
  imageAlt?: string;
  chartComponent?: React.ReactNode;
  swap?: boolean;
  id?: string;
  tallImage?: boolean;
  idx: number;
  totalLength: number;
}) => {
  return (
    <div
      className={`w-full group ${className} ${
        idx === totalLength - 1 ? "" : "mb-24 lg:mb-32"
      }`}
      id={id}
    >
      <div
        className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
          swap ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Image/Chart Section */}
        <div
          className={`w-full lg:w-1/2 ${
            tallImage
              ? chartComponent
                ? "h-auto lg:h-[500px]"
                : "h-[450px] lg:h-[550px]"
              : "h-[400px] lg:h-[480px]"
          }`}
        >
          {chartComponent ? (
            <div className="h-full w-full">{chartComponent}</div>
          ) : (
            <div className="h-full w-full relative rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image
                src={imageLink || "/images/test-photo.jpg"}
                alt={imageAlt || title}
                fill
                style={{ objectFit: "cover" }}
                className="transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8">
          {/* Title */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
                      {children}
                    </p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="space-y-4 my-6">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="space-y-4 my-6 list-decimal list-inside">
                      {children}
                    </ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg 
                        className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span className="flex-1 text-base md:text-lg">{children}</span>
                    </li>
                  ),
                  number: ({ children }) => (
                    <li className="text-base md:text-lg text-gray-700">
                      {children}
                    </li>
                  ),
                },
                types: {
                  image: ({ value }) => (
                    <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={urlFor(value).url()}
                        alt={value?.alt || "Image"}
                        className="w-full h-auto"
                        width={600}
                        height={400}
                      />
                    </div>
                  ),
                },
              }}
            />
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href={`/services/${serviceLink}`}
              className={`${buttonVariants({ 
                variant: "default",
                size: "lg" 
              })} group/btn inline-flex items-center text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              Learn More
              <svg 
                className="ml-2 w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageWithText;