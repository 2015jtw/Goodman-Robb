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
import { servicesHardcodedData } from "@/data/dummy-data";

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

  console.log("services: ", servicesData);
  return (
    <>
      <Navbar services={servicesData} />
      <main className="container mx-auto ">
        <HeroSection />
        <div className="flex flex-col gap-30 w-full container mx-auto px-4">
          <h2 className="text-center text-5xl py-8">Our Services</h2>
          {servicesHardcodedData.map((service, idx) => {
            return (
              <ImageWithText
                className="py-14"
                key={idx}
                title={service.title}
                description={service.description}
                contactCTA={service.contactCTA}
                serviceLink={service.routingLink || ""}
                imageLink={service.image}
                imageAlt={service.imageAlt}
                chartComponent={service.chartComponent}
                swap={idx % 2 === 0}
                id={service.routingLink}
                defaultTopic={service.defaultTopic}
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
