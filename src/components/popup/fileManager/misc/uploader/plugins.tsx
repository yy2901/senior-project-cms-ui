import { updateMeta } from "../fetchFunctions";
import { MetaWithRawDetail } from "../types";
import { optimizeImage } from "./Plugins/imageOptimizer";

const applyPlugins = async (meta: MetaWithRawDetail) => {
  let details = {};
  await optimizeImage(meta, details);
  await updateMeta(meta.rowid, { ...meta, details: JSON.stringify(details) });
};

export { applyPlugins };
