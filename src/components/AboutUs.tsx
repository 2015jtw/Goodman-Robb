// UI
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Sanity
import { client } from "@/sanity/lib/client";
import { aboutQuery } from "@/sanity/lib/queries";
import { AboutQueryResult } from "../../sanity.types";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const options = { next: { revalidate: 30 } };

export default async function AboutUs() {
  const about: AboutQueryResult = await client.fetch(aboutQuery, {}, options);
  console.log("about: ", about);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Text Section */}
        <div className="max-w-2xl mx-auto text-center xl:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who Are We
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
            elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>

        {/* List Section */}
        <ul
          role="list"
          className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-2"
        >
          {about.map((person) => (
            <li key={person._id}>
              <div className="flex flex-col items-center justify-center gap-x-6">
                {person.aboutImage && (
                  <Avatar className="rounded-full w-16 h-16">
                    <AvatarImage src={urlFor(person.aboutImage).url()} />
                    <AvatarFallback>
                      {person.name &&
                        person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="py-2 text-black">
                  <h3 className="text-lg font-semibold leading-7 tracking-tight text-center">
                    {person.name}
                  </h3>
                  <p className="text-base italic font-semibold leading-6 text-primary text-center pb-2">
                    {person.jobTitle}
                  </p>
                  <div className="text-base leading-7 ">
                    {person.bio && <PortableText value={person.bio} />}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
