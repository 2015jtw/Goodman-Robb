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
    <section className="w-full pb-32" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {data?.title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {data?.subtitle}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[900px] mt-12">
          <Card className="relative overflow-hidden shadow-md">
            <CardHeader className="space-y-1 md:space-y-2">
              <CardTitle className="text-2xl md:text-3xl font-bold">
                {data?.cardTitle}
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                {data?.cardSubtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:gap-6">
              <div className="grid gap-4">
                <PortableText
                  value={data?.cardContent || []}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {children}
                        </p>
                      ),
                      h4: ({ children }) => (
                        <h4 className="font-semibold leading-none">
                          {children}
                        </h4>
                      ),
                    },
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 min-h-[60px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-md font-medium">{data?.hook}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
