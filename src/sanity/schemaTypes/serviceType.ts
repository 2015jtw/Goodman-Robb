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
      name: "btnText",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "btnLink",
      type: "string",
      validation: (Rule) => Rule.required(),
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
