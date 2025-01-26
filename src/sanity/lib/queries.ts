import { defineQuery } from "next-sanity";

// Data for Hero section
export const heroQuery = defineQuery(
  `*[_type == "hero"]{ _id, title, subtitle, badgeContent, badgeContentURL, buttonText }`
);

// About Us section data
export const aboutQuery = defineQuery(
  `*[_type == "about"]{ _id, name, jobTitle, bio, aboutImage }`
);

// DATA FOR HOMEPAGE Service sections
export const serviceQuery =
  defineQuery(`*[_type == "service"]{ _id, title, slug, homepageImage, homepageContent, chartTitle, chartDescription, chartTrendPercentage, chartTimeline, chartData }
`);

// DATA FOR NAVBAR SERVICES
export const navbarServicesQuery = defineQuery(`
  *[_type == "service"]{_id, title, slug, navbarSubtitle}`);

// DATA FOR INDIVIDUAL SERVICES PAGES
export const servicePageQuery = defineQuery(
  `*[_type == "service" && slug.current == $slug][0]{_id, navbarSubtitle, slug, title, servicePageHeroImage, servicePageIntro, servicePageContent, servicePagePricing, servicePageSpecialImages}`
);

// Contact Form Topics data
export const topicsQuery =
  defineQuery(`*[_type == "service"]{ _id, title, slug }
`);

// Footer data
export const footerQuery = defineQuery(
  `*[_type == "footer"]{ _id, socialLinks, socialAltText }`
);

// DATA FOR LOGO IN NAVBAR
export const logoQuery = defineQuery(`*[_type == "logo"][0]{_id, Logo}`);

// DATA FOR BLOG INDEX PAGE CONTENT
export const blogIndexContentQuery = defineQuery(
  `*[_type == "blogIndex"][0]{_id, title, subtitle}`
);

// DATA FOR BLOG INDEX PAAGE
export const BLOG_INDEX_QUERY =
  defineQuery(`*[_type == "post"]{ _id, title, mainImage, publishedAt, intro, slug, categories[] -> {title}, author -> {name} }
`);

// DATA FOR RECENT BLOGS
export const RECENT_BLOGS_QUERY =
  defineQuery(`*[_type == "post"] | order(publishedAt desc) [0...$limit]{ _id, title, mainImage, publishedAt, intro, slug, categories[] -> {title, _id}, author -> {name} }
`);

// DATA FOR SINGLE BLOG POST
export const SINGLE_BLOG_POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{_id, title, mainImage, publishedAt, intro, readTime, main_content, slug, categories[] -> {title}, author -> {name, role, image} }
`);

// DATA FOR PRICING SECTION
export const pricingQuery = defineQuery(
  `*[_type == "pricing"][0]{_id, title, subtitle, cardTitle, cardSubtitle, cardContent, hook}`
);
