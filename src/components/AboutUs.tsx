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

  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32"
      id="about-us"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Meet Our Team
          </h2>
          <p className="text-lg leading-8 text-gray-600">
            Experienced professionals dedicated to delivering exceptional results
            and driving your success forward.
          </p>
        </div>

        {/* Team Grid */}
        <ul
          role="list"
          className="grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto"
        >
          {about.map((person) => {
            const initials = person.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <li key={person._id}>
                <article className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className="p-8">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      <Avatar className="rounded-full w-24 h-24 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        {person.aboutImage ? (
                          <AvatarImage src={urlFor(person.aboutImage).url()} alt={person.name || "Team member"} />
                        ) : null}
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                          {initials || "--"}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {person.name}
                      </h3>
                      <p className="text-base font-medium text-primary mb-4">
                        {person.jobTitle}
                      </p>
                      <div className="text-sm leading-7 text-gray-600 text-left prose prose-sm max-w-none">
                        {person.bio ? <PortableText value={person.bio} /> : null}
                      </div>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <div className="pointer-events-none absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-300" />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
