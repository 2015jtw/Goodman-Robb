import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { SiMinutemailer } from "react-icons/si";

// Sanity
import { client } from "../sanity/lib/client";
import { heroQuery } from "../sanity/lib/queries";
import { HeroQueryResult } from "../../sanity.types";

const options = { next: { revalidate: 30 } };

export default async function HeroSection() {
  const data: HeroQueryResult = await client.fetch(heroQuery, {}, options);
  const heroData = data[0];
  console.log("heroData", heroData);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-12rem)] sm:w-[68.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              {heroData.badgeContent}{" "}
              <Link
                href={heroData.badgeContentURL || "/services/industry-watch"}
                className="font-semibold text-indigo-600"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {heroData.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {heroData.subtitle}
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-6">
              <Link
                href="#contact-form"
                className={`${buttonVariants({
                  variant: "default",
                  size: "lg",
                })} text-lg !px-4 group`}
              >
                {heroData.buttonText}
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                  <SiMinutemailer />
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-background to-primary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
