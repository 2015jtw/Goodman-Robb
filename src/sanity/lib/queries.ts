import { defineQuery } from "next-sanity";

// About Us section data
export const aboutQuery = defineQuery(
  `*[_type == "about"]{ _id, name, jobTitle, bio, aboutImage }`
);

// Service section data
export const serviceQuery =
  defineQuery(`  *[_type == "service"]{ _id, title, slug, intro, body, icon, serviceImage }
`);

// Contact Form Topics data
export const topicsQuery =
  defineQuery(`  *[_type == "service"]{ _id, title, slug }
`);
