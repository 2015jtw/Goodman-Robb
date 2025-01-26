import { defineField, defineType } from "sanity";

export const pricingType = defineType({
  name: "pricing",
  title: "Pricing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Title of the pricing section",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Subtitle of the pricing section",
    }),
    defineField({
      name: "cardTitle",
      title: "Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Title of the card",
    }),
    defineField({
      name: "cardSubtitle",
      title: "Card Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Subtitle of the card",
    }),
    defineField({
      name: "cardContent",
      title: "Card Content",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
      description: "Content of the card",
    }),
    defineField({
      name: "hook",
      title: "Hook",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Hook for the pricing section",
    }),
  ],
});
