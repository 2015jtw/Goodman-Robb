// UI
import HeroSection from "@/components/HeroSection";
import ImageWithText from "@/components/ImageWithText";
import AboutUs from "@/components/AboutUs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";

// Sanity Data
import { client } from "@/sanity/lib/client";
import { serviceQuery, topicsQuery } from "@/sanity/lib/queries";
import { ServiceQueryResult, TopicsQueryResult } from "../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import MultipleBarChart from "@/components/BarGraph";

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const servicesData: ServiceQueryResult = await client.fetch(
    serviceQuery,
    {},
    options
  );
  console.log("servicesData", servicesData);

  const topicsData: TopicsQueryResult = await client.fetch(
    topicsQuery,
    {},
    options
  );

  return (
    <>
      <Navbar services={servicesData} />
      <main className="container mx-auto ">
        <HeroSection />
        <div className="flex flex-col gap-30 w-full container mx-auto px-4">
          <h2 className="text-center text-5xl py-8">Our Services</h2>
          {servicesData.map((service, idx) => {
            const chartData =
              service.chartData && Array.isArray(service.chartData)
                ? service.chartData.map((data) => ({
                    month: data.month || "",
                    ghgEmissionsWithoutDataConsulting:
                      data.ghgEmissionsWithoutDataConsulting || 0,
                    ghgEmissionsWithDataConsulting:
                      data.ghgEmissionsWithDataConsulting || 0,
                  }))
                : []; // Default to empty array if chartData is null or invalid

            return (
              <ImageWithText
                key={service._id}
                title={service.title || ""}
                description={
                  service.body ? <PortableText value={service.body} /> : ""
                }
                serviceLink={service.slug?.current || ""}
                defaultTopic={service.title || ""}
                imageLink={
                  service.serviceImage ? urlFor(service.serviceImage).url() : ""
                }
                swap={idx % 2 === 0}
                chartComponent={
                  chartData.length > 0 ? (
                    <MultipleBarChart
                      data={chartData}
                      title={service.chartTitle || ""}
                      description={service.chartDescription || ""}
                      trendPercentage={service.chartTrendPercentage || ""}
                      chartTimeline={service.chartTimeline || ""}
                    />
                  ) : null
                }
                tallImage={
                  service._id === "12f875dc-ab2c-44ca-b884-9f4b893d68fc"
                } // Conditionally set tallImage
              />
            );
          })}
        </div>

        <AboutUs />
        <Pricing />
        <ContactForm topics={topicsData} />
      </main>

      <Footer />
    </>
  );
}
