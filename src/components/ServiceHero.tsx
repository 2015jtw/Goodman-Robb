// React/Next
import Image from "next/image";
import Fragment from "react";

// UI
import ContactForm from "./ContactForm";

// Sanity
import { ServicePageQueryResult } from "../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { topicsQuery } from "@/sanity/lib/queries";
import { TopicsQueryResult } from "../../sanity.types";

const options = { next: { revalidate: 30 } };

const ServiceHero = async ({
  service,
}: {
  service: ServicePageQueryResult;
}) => {
  const topicsData: TopicsQueryResult = await client.fetch(
    topicsQuery,
    {},
    options
  );

  return (
    <>
      {/* Image Section */}
      <div className="bg-white bg-dot-black/[0.2] relative">
        <div className="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <div className="relative isolate flex items-center justify-center h-[740px]">
          <Image
            src={
              service && service.servicePageHeroImage
                ? urlFor(service.servicePageHeroImage).url()
                : ""
            }
            alt={
              (service && service.servicePageHeroImage?.alt) ||
              "Service Hero Image"
            }
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="mx-auto max-w-4xl w-full relative">
            <div className="relative mx-auto px-10 md:px-0 max-w-2xl">
              <div className="text-center">
                <h1 className="text-3xl font-light tracking-tight text-accent sm:text-6xl">
                  {service && service.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Service Description */}
        <div className="pt-12">
          <div className="mx-auto max-w-3xl px-6 lg:px-0">
            {/* Intro section */}
            <div className="mb-10">
              <PortableText
                value={service?.servicePageIntro || []}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="pb-2 italic">{children}</p>
                    ),
                  },
                }}
              />
            </div>
            {/* Approach Section */}
            <div className="mb-10">
              <PortableText
                value={service?.servicePageContent || []}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="pb-2">{children}</p>
                    ),
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
            {(service?.servicePageSpecialImages?.length ?? 0) > 0 && (
              <div className="mb-10">
                <div className="flex justify-between">
                  {service?.servicePageSpecialImages?.map((image, index) => (
                    <Image
                      key={index}
                      height={100}
                      width={100}
                      src={urlFor(image).url()}
                      alt="Special Image"
                    />
                  ))}
                </div>
              </div>
            )}{" "}
            <div className="mb-10">
              <PortableText
                value={service?.servicePagePricing || []}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="pb-2">{children}</p>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-6 mb-2">
                        {children}
                      </h3>
                    ),
                  },
                }}
              />
            </div>
            <div className="mb-10">
              <ContactForm
                topics={topicsData}
                defaultTopic={service?.title || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceHero;
