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
