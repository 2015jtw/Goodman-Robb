import { defineField, defineType } from "sanity";

export const blogIndexType = defineType({
  name: "blogIndex",
  title: "Blog Index",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Title of main blog index page showing all the blog posts",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
      description:
        "Subtitle of main blog index page showing all the blog posts",
    }),
  ],
});
