// UI
import HeroSection from '@/components/HeroSection';
import ImageWithText from '@/components/ImageWithText';
import AboutUs from '@/components/AboutUs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import ContactForm from '@/components/ContactForm';
import MultipleBarChart from '@/components/BarGraph';

// Sanity Data
import { client } from '@/sanity/lib/client';
import {
  serviceQuery,
  topicsQuery,
  logoQuery,
  navbarServicesQuery,
} from '@/sanity/lib/queries';
import {
  ServiceQueryResult,
  TopicsQueryResult,
  LogoQueryResult,
  NavbarServicesQueryResult,
} from '../../sanity.types';
import { urlFor } from '@/sanity/lib/image';

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const servicesData: ServiceQueryResult = await client.fetch(
    serviceQuery,
    {},
    options
  );

  const servicesNav: NavbarServicesQueryResult = await client.fetch(
    navbarServicesQuery,
    {},
    options
  );

  const topicsData: TopicsQueryResult = await client.fetch(
    topicsQuery,
    {},
    options
  );

  const logoData: LogoQueryResult = await client.fetch(logoQuery, {}, options);
  const logo = logoData?.Logo ? urlFor(logoData.Logo).url() : '';

  return (
    <>
      <Navbar services={servicesNav} logo={logo} />
      <main className="container mx-auto">
        <HeroSection />
        {/* <div className="flex flex-col gap-30 w-full px-4 pb-32">
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
                description={service.homepageContent || []}
                serviceLink={service.slug?.current || ""}
                defaultTopic={service.title || ""}
                imageLink={
                  service.homepageImage
                    ? urlFor(service.homepageImage).url()
                    : ""
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
        </div> */}

        <section className="bg-gradient-to-b from-white via-gray-50 to-white pb-20">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Comprehensive solutions designed to transform your business and
                drive measurable results
              </p>
            </div>

            {/* Services List */}
            <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
              {servicesData.map((service, idx) => {
                const chartData =
                  service.chartData && Array.isArray(service.chartData)
                    ? service.chartData.map((data) => ({
                        month: data.month || '',
                        ghgEmissionsWithoutDataConsulting:
                          data.ghgEmissionsWithoutDataConsulting || 0,
                        ghgEmissionsWithDataConsulting:
                          data.ghgEmissionsWithDataConsulting || 0,
                      }))
                    : [];

                return (
                  <ImageWithText
                    key={service._id}
                    title={service.title || ''}
                    description={service.homepageContent || []}
                    serviceLink={service.slug?.current || ''}
                    defaultTopic={service.title || ''}
                    imageLink={
                      service.homepageImage
                        ? urlFor(service.homepageImage).url()
                        : ''
                    }
                    swap={idx % 2 === 0}
                    chartComponent={
                      chartData.length > 0 ? (
                        <MultipleBarChart
                          data={chartData}
                          title={service.chartTitle || ''}
                          description={service.chartDescription || ''}
                          trendPercentage={service.chartTrendPercentage || ''}
                          chartTimeline={service.chartTimeline || ''}
                        />
                      ) : null
                    }
                    tallImage={
                      service.title === 'Grant Program Management' ||
                      service.title === 'GHG Data Consulting'
                    }
                    id={service.slug?.current || ''}
                    idx={idx}
                    totalLength={servicesData.length}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <AboutUs />
        <Pricing />
        <ContactForm topics={topicsData} />
      </main>

      <Footer />
    </>
  );
}
