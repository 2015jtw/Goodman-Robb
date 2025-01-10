import { defineField, defineType } from "sanity";

export const logoType = defineType({
  name: "logo",
  title: "Logo",
  type: "document",
  fields: [
    defineField({
      name: "Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Text for Company Logo",
        },
      ],
    }),
  ],
});
