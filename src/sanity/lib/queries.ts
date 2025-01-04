import { defineQuery } from "next-sanity";

// About Us section data
export const aboutQuery = defineQuery(
  `*[_type == "about"]{ _id, name, jobTitle, bio, aboutImage }`
);

// Service section data
export const serviceQuery =
  defineQuery(`*[_type == "service"]{ _id, title, slug, intro, body, icon, serviceImage, chartTitle, chartDescription, chartTrendPercentage, chartTimeline, chartData }
`);

// Contact Form Topics data
export const topicsQuery =
  defineQuery(`  *[_type == "service"]{ _id, title, slug }
`);

// Footer data
export const footerQuery = defineQuery(
  `*[_type == "footer"]{ _id, socialLinks, socialAltText }`
);
