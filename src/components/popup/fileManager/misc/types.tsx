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
  details: { thumbnail: string; type: string; [key: string]: any };
};

export type { MetaWithRawDetail, Meta };
