// React/Next
import React from "react";

// UI
import ServiceHero from "@/components/ServiceHero";

// sanity
import { client } from "../../../sanity/lib/client";
import { servicePageQuery } from "@/sanity/lib/queries";
import { ServicePageQueryResult } from "../../../../sanity.types";

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

  return (
    <main>
      <ServiceHero service={service} />
    </main>
  );
}
