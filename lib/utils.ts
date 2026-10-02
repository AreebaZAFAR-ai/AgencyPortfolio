import { createCn } from "cn/config";

// Teach the class merger the custom type scale from globals.css; otherwise
// `text-h2` and `text-text-primary` read as two colours and one is dropped.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "h1", "h2", "h3", "body-lg", "body", "small", "label"] }],
      leading: [{ leading: ["display", "heading", "body"] }],
    },
  },
});
