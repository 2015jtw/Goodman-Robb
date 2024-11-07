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
        <h2 className="text-center text-3xl py-8">Our Services</h2>
        {servicesData.map((service, idx) => {
          return (
            <ImageWithText
              key={idx}
              title={service.title}
              description={service.description}
              cta={service.cta}
              link={service.link}
              image={service.image}
              swap={idx % 2 === 0}
              id={service.link}
            />
          );
        })}
      </div>
      <AboutUs />
      <HomepageForm />
    </main>
  );
}
