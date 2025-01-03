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
    }),
    defineField({
      name: "intro",
      type: "string",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          {
            title: "Crisis Response",
            value: "fire-extinguisher",
          },
          { title: "Crisis Leadership", value: "user" },
          {
            title: "Crisis Commmunication",
            value: "speech",
          },
          { title: "Risk Management", value: "flame" },
          { title: "Business Continuity", value: "handshake" },
          {
            title: "Assessments",
            value: "chart-line",
          },
        ],
      },
      description: "Choose an icon to represent this service",
    }),
    defineField({
      name: "chartTitle",
      type: "string",
    }),
    defineField({
      name: "chartDescription",
      type: "string",
    }),
    defineField({
      name: "chartTrendPercentage",
      type: "string",
    }),
    defineField({
      name: "chartTimeline",
      type: "string",
    }),
    defineField({
      name: "chartData",
      type: "array",
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
    defineField({
      name: "serviceImage",
      type: "image",
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
  ],
};
