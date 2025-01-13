// React/Next
import React from "react";

// UI
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sanity
import { client } from "@/sanity/lib/client";
import { navbarServicesQuery, logoQuery } from "@/sanity/lib/queries";
import {
  NavbarServicesQueryResult,
  LogoQueryResult,
} from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";

const options = { next: { revalidate: 30 } };

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const servicesNav: NavbarServicesQueryResult = await client.fetch(
    navbarServicesQuery,
    {},
    options
  );
  const logoData: LogoQueryResult = await client.fetch(logoQuery, {}, options);
  const logo = logoData?.Logo ? urlFor(logoData.Logo).url() : "";

  return (
    <main>
      <Navbar
        services={servicesNav}
        logo={logo}
        className="bg-white shadow-lg"
        secondClass="py-2"
        thirdClass="shadow-none"
      />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
