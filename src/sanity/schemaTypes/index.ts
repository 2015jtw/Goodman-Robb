import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { serviceType } from "./serviceType";
import { aboutType } from "./aboutType";
import { footerType } from "./footerType";
import { heroType } from "./heroType";
import { logoType } from "./logoType";
import { pricingType } from "./pricingType";
import { blogIndexType } from "./blogIndexType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    serviceType,
    aboutType,
    footerType,
    heroType,
    logoType,
    pricingType,
    blogIndexType,
  ],
};
