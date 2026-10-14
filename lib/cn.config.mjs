// Tailwind class-merge extension for the project's custom type scale (globals.css);
// otherwise `text-h2` and `text-text-primary` read as two colours and one is dropped.
// Compiled into lib/cn-tables.ts by `npm run cn:build` -- rerun after editing.
const cnConfig = {
  extend: {
    classGroups: {
      "font-size": [{ text: ["hero", "h1", "h2", "h3", "body-lg", "body", "small", "label"] }],
      leading: [{ leading: ["display", "heading", "body"] }],
    },
  },
};

export default cnConfig;
