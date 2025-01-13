import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "The main title of the hero section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badgeContent",
      type: "string",
      description: "The badge content of the hero section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badgeContentURL",
      type: "string",
      description: "The URL for the badge",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      description: "The subtitle of the hero section",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText",
      type: "string",
    }),
  ],
});
