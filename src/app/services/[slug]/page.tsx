// React/Next
import React from "react";

// UI
import ServiceHero from "@/components/ServiceHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// sanity
import { client } from "../../../sanity/lib/client";
import {
  servicePageQuery,
  navbarServicesQuery,
  logoQuery,
} from "@/sanity/lib/queries";
import {
  ServicePageQueryResult,
  NavbarServicesQueryResult,
  LogoQueryResult,
} from "../../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface ServiceTemplateProps {
  params: {
    slug: string;
  };
}

const options = { next: { revalidate: 30 } };

export default async function ServiceTemplate({
  params,
}: ServiceTemplateProps) {
  const { slug } = params;
  const service: ServicePageQueryResult | null = await client.fetch(
    servicePageQuery,
    { slug },
    options
  );

  const servicesNav: NavbarServicesQueryResult = await client.fetch(
    navbarServicesQuery,
    {},
    options
  );
  const logoData: LogoQueryResult = await client.fetch(logoQuery, {}, options);
  const logo = logoData?.Logo ? urlFor(logoData.Logo).url() : "";

  return (
    <main>
      <Navbar services={servicesNav} logo={logo} />
      <div className="mt-28">
        <ServiceHero service={service} />
      </div>
      <Footer />
    </main>
  );
}
