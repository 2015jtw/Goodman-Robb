// UI
import HeroSection from "@/components/HeroSection";
import ImageWithText from "@/components/ImageWithText";
import AboutUs from "@/components/AboutUs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import MultipleBarChart from "@/components/BarGraph";

// Sanity Data
import { client } from "@/sanity/lib/client";
import { serviceQuery, topicsQuery } from "@/sanity/lib/queries";
import { ServiceQueryResult, TopicsQueryResult } from "../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const servicesData: ServiceQueryResult = await client.fetch(
    serviceQuery,
    {},
    options
  );

  const topicsData: TopicsQueryResult = await client.fetch(
    topicsQuery,
    {},
    options
  );

  return (
    <>
      <Navbar services={servicesData} />
      <main className="container mx-auto">
        <HeroSection />
        <div className="flex flex-col gap-30 w-full px-4 pb-32">
          <h2 className="text-center text-5xl py-8 pb-12">Our Services</h2>
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
                description={service.body || []}
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
                  service.title === "Grant Program Management" ||
                  service.title === "GHG Data Consulting"
                } // Conditionally set tallImage
                id={service.slug?.current || ""}
                idx={idx}
                totalLength={servicesData.length}
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
