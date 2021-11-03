import { FileFieldType } from "../../../rightPanel/editor/EntryEditor/FileInstance";

type MetaWithRawDetail = {
  rowid: number;
  size: number;
  time: number;
  extension: string;
  fileName: string;
  details: string | null;
};

type Meta = {
  rowid: number;
  size: number;
  time: number;
  extension: string;
  fileName: string;
  details: FileFieldType;
};

export type { MetaWithRawDetail, Meta };
