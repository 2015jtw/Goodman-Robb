// UI
import HeroSection from "@/components/HeroSection";
import ImageWithText from "@/components/ImageWithText";
import AboutUs from "@/components/AboutUs";
import HomepageForm from "@/components/HomepageForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sanity Data
import { client } from "@/sanity/lib/client";
import { serviceQuery } from "@/sanity/lib/queries";
import { ServiceQueryResult } from "../../sanity.types";
import { servicesData } from "@/data/dummy-data";

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const services: ServiceQueryResult = await client.fetch(
    serviceQuery,
    {},
    options
  );

  console.log("services: ", services);
  return (
    <>
      <Navbar />
      <main className="container mx-auto ">
        <HeroSection />
        <div className="flex flex-col gap-30 w-full container mx-auto px-4">
          <h2 className="text-center text-5xl py-8">Our Services</h2>
          {servicesData.map((service, idx) => {
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
        <HomepageForm />
      </main>

      <Footer />
    </>
  );
}
