import { defineField } from "sanity";

export const serviceType = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      description: "This is the url for the service page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      type: "string",
      description:
        "Brief descriptor of service in Navbar & used on service page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homepageImage",
      type: "image",
      description: "Image used on the homepage",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
    defineField({
      name: "homepageContent",
      type: "blockContent",
      description: "Content used on the homepage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "servicePageHeroImage",
      type: "image",
      description: "Image used on the service page hero",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "servicePageMaincontent",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
      description: "Main content for the service page",
    }),
    defineField({
      name: "chartTitle",
      type: "string",
      description: "Title for the chart",
    }),
    defineField({
      name: "chartDescription",
      type: "string",
      description: "Description for the chart",
    }),
    defineField({
      name: "chartTrendPercentage",
      type: "string",
      description: "Trend percentage for the chart",
    }),
    defineField({
      name: "chartTimeline",
      type: "string",
      description: "Timeline for the chart",
    }),
    defineField({
      name: "chartData",
      type: "array",
      description: "Data for the chart",
      of: [
        {
          type: "object",
          fields: [
            { name: "month", type: "string", title: "Month" },
            {
              name: "ghgEmissionsWithoutDataConsulting",
              type: "number",
              title: "GHG Emissions Without Data Consulting",
            },
            {
              name: "ghgEmissionsWithDataConsulting",
              type: "number",
              title: "GHG Emissions With Data Consulting",
            },
          ],
        },
      ],
    }),
  ],
};
