import { defineField, defineArrayMember } from "sanity";

export const footerType = {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "socialAltText",
      title: "Social Media Alt Text",
      type: "array",
      description: "Descriptions for social media links.",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      description: "URLs for social media accounts.",
      of: [
        defineArrayMember({
          type: "url",
        }),
      ],
    }),
  ],
};
