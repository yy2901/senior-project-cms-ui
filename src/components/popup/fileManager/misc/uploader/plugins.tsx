import { FileFieldType } from "../../../../rightPanel/editor/EntryEditor/FileInstance";
import { updateMeta } from "../fetchFunctions";
import { MetaWithRawDetail } from "../types";
import { optimizeImage } from "./plugins/image/imageOptimizer";
import { optimizeVideo } from "./plugins/video/videoOptimizer";

const applyPlugins = async (meta: MetaWithRawDetail) => {
  let details: FileFieldType = { id: -1, type: "", url: "", thumbnail: "" };
  details.id = meta.rowid;
  details.url = "/uploads/" + meta.fileName;
  await optimizeImage(meta, details);
  await optimizeVideo(meta, details);
  await updateMeta(meta.rowid, { ...meta, details: JSON.stringify(details) });
};

export { applyPlugins };
