// React/Next
import Link from "next/link";

// UI
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

// Sanity
import { client } from "@/sanity/lib/client";
import { footerQuery } from "@/sanity/lib/queries";
import { FooterQueryResult } from "../../sanity.types";

const options = { next: { revalidate: 30 } };

export default async function Footer() {
  const footerData: FooterQueryResult = await client.fetch(
    footerQuery,
    {},
    options
  );

  const socialLinks =
    footerData && footerData[0] && footerData[0].socialLinks
      ? [
          {
            url: footerData[0].socialLinks[0],
            label: footerData[0].socialAltText
              ? footerData[0].socialAltText[0]
              : "",
          },
          {
            url: footerData[0].socialLinks[1],
            label: footerData[0].socialAltText
              ? footerData[0].socialAltText[1]
              : "",
          },
          {
            url: footerData[0].socialLinks[2],
            label: footerData[0].socialAltText
              ? footerData[0].socialAltText[2]
              : "",
          },
        ]
      : [];

  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex justify-center items-center space-x-4">
            {socialLinks.map(
              (link, index) =>
                link.url && (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    <span className="w-6 h-6 flex items-center justify-center">
                      <LinkedInLogoIcon className="w-4 h-4" />
                    </span>
                    <span className="sr-only">{link.label}</span>
                  </Link>
                )
            )}
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-center">
            © {new Date().getFullYear()} Martii LLC | All Rights Reserved
          </h3>
        </div>
      </div>
    </footer>
  );
}
