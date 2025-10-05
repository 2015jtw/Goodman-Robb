// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sanity
import { client } from "@/sanity/lib/client";
import { pricingQuery } from "@/sanity/lib/queries";
import { PricingQueryResult } from "../../sanity.types";
import { PortableText } from "next-sanity";

export default async function Pricing() {
  const data: PricingQueryResult = await client.fetch(pricingQuery);

  return (
    <section
      className="w-full py-20 lg:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50"
      id="pricing"
    >
      <div className="container px-6 md:px-8 mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16 lg:mb-20">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              {data?.title || "Transparent Pricing"}
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed">
              {data?.subtitle || "Flexible solutions tailored to your needs"}
            </p>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden shadow-xl border-2 border-gray-100 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl group">
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 via-blue-50/40 to-transparent rounded-full transform translate-x-40 -translate-y-40 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-indigo-50/40 to-transparent rounded-full transform -translate-x-32 translate-y-32 blur-3xl" />

            <CardHeader className="space-y-4 md:space-y-6 relative z-10 pb-8">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                {data?.cardTitle || "Custom Pricing"}
              </CardTitle>
              <CardDescription className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                {data?.cardSubtitle || "Get a personalized quote based on your specific requirements"}
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-8 md:gap-10 relative z-10">
              {/* Content Section */}
              <div className="grid gap-6">
                <div className="prose prose-base lg:prose-lg max-w-none">
                  <PortableText
                    value={data?.cardContent || []}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
                            {children}
                          </p>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-4">
                            {children}
                          </h4>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="space-y-4 my-6">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="space-y-4 my-6 list-decimal list-inside text-gray-700">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li className="flex items-start gap-3 text-base md:text-lg">
                            <svg
                              className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 flex-1">{children}</span>
                          </li>
                        ),
                        number: ({ children }) => (
                          <li className="text-gray-700 text-base md:text-lg">
                            {children}
                          </li>
                        ),
                      },
                    }}
                  />
                </div>
              </div>

              {/* CTA Box */}
              {data?.hook ? (
                <div className="relative group/cta">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-50/50 to-primary/10 rounded-2xl blur-xl opacity-50 group-hover/cta:opacity-70 transition-opacity duration-300" />
                  <div className="relative flex flex-col gap-3 min-h-[100px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/5 via-blue-50/50 to-primary/5 border-2 border-dashed border-primary/30 hover:border-primary/50 p-8 md:p-10 text-center transition-all duration-300 hover:scale-[1.02]">
                    <svg
                      className="w-12 h-12 text-primary/60 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {data.hook}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 max-w-md">
                      Contact us to discuss your project and receive a customized quote tailored to your needs
                    </p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm md:text-base text-gray-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              All pricing is customized based on project scope and requirements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
