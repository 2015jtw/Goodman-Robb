import { defineQuery } from "next-sanity";

export const aboutQuery = defineQuery(
  `*[_type == "about"]{ _id, name, jobTitle, bio, aboutImage }`
);

export const serviceQuery =
  defineQuery(`  *[_type == "service"]{ _id, title, slug, intro, body, icon, serviceImage }
`);
