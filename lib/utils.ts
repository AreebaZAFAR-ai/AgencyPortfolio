import { createCn } from "cn/engine";
import tables from "./cn-tables";

// Merge tables precompiled from lib/cn.config.mjs (the custom type scale), so the
// browser gets the small runtime engine instead of the config compiler.
// After editing lib/cn.config.mjs, regenerate with `npm run cn:build`.
export const cn = createCn(tables);
