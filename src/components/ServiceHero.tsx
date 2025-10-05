// React/Next
import Image from "next/image";

// Sanity
import { ServicePageQueryResult } from "../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import type { PortableTextComponents } from "next-sanity";

const introComponents = {
  block: {
    normal: ({ children }) => (
      <p className="pb-2 text-lg leading-relaxed italic text-slate-700">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
        {children}
      </h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-slate-800">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-700">{children}</em>
    ),
  },
} satisfies PortableTextComponents;

const basePortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="pb-2 text-base leading-relaxed text-slate-800">
        {children}
      </p>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-3 uppercase tracking-wide">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-slate-800">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-700">{children}</em>
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
} satisfies PortableTextComponents;

const contentComponents = {
  ...basePortableTextComponents,
} satisfies PortableTextComponents;

const pricingComponents = {
  ...basePortableTextComponents,
  block: {
    ...basePortableTextComponents.block,
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mt-12 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
        {children}
      </h4>
    ),
  },
} satisfies PortableTextComponents;

interface ServiceHeroProps {
  service: ServicePageQueryResult | null;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const heroImage = service?.servicePageHeroImage;
  const specialImages = service?.servicePageSpecialImages ?? [];

  return (
    <>
      {/* Image Section */}
      <div className="bg-white bg-dot-black/[0.2] relative mb-12">
        <div className="absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <div className="relative isolate flex items-center justify-center h-[740px]">
          {heroImage ? (
            <Image
              src={urlFor(heroImage).url()}
              alt={heroImage.alt || "Service Hero Image"}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : null}
          <div className="mx-auto max-w-4xl w-full relative">
            <div className="relative mx-auto px-10 md:px-0 max-w-2xl">
              <div className="text-center">
                {service?.title ? (
                  <h1 className="text-3xl font-light tracking-tight text-accent sm:text-6xl">
                    {service.title}
                  </h1>
                ) : null}
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
                components={introComponents}
              />
            </div>
            {/* Approach Section */}
            <div className="mb-10">
              <PortableText
                value={service?.servicePageContent || []}
                components={contentComponents}
              />
            </div>
            {specialImages.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between">
                  {specialImages.map((image, index) =>
                    image ? (
                      <Image
                        key={index}
                        height={100}
                        width={100}
                        src={urlFor(image).url()}
                        alt={image.alt || "Special Image"}
                      />
                    ) : null
                  )}
                </div>
              </div>
            )}
            <div className="mb-10">
              <PortableText
                value={service?.servicePagePricing || []}
                components={pricingComponents}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
