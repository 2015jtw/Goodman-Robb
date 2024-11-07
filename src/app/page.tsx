import HeroSection from "@/components/HeroSection";
import ImageWithText from "@/components/ImageWithText";
import AboutUs from "@/components/AboutUs";
import HomepageForm from "@/components/HomepageForm";
import { servicesData } from "@/data/dummy-data";

export default function Home() {
  return (
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
            />
          );
        })}
      </div>
      <AboutUs />
      <HomepageForm />
    </main>
  );
}
