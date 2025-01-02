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
            Meet our leadership
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
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 text-center">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600 text-center">
                    {person.jobTitle}
                  </p>
                  <div className="text-base leading-7 text-black">
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
