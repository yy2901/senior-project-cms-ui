import { Meta, MetaWithRawDetail } from "./types";

const uploadFile = async (file: Blob | string): Promise<MetaWithRawDetail> => {
  const formData = new FormData();
  formData.set("file", file);
  const res = await fetch(
    "/_editor/uploads",
    {
      method: "POST",
      body: formData,
    }
  );
  return await res.json();
};

const uploadGeneratedFile = async (
  originalFile: number,
  file: Blob | string,
  fileName: string
): Promise<string> => {
  const body = new FormData();
  body.set("file", file, fileName);
  const res = await fetch("/_editor/uploads/" + originalFile, {
    method: "POST",
    body,
  });
  return await res.text();
};

const updateMeta = async (rowid: number, newMeta: MetaWithRawDetail) => {
  await fetch("/_editor/FilesMeta", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rowid,
      meta: newMeta,
    }),
  });
};

const getAll = async (): Promise<Meta[]> => {
  const res = await fetch("/_editor/FilesMeta");
  const metaWithRawDetails: MetaWithRawDetail[] = await res.json();
  const metas: Meta[] = metaWithRawDetails.map((rawMeta) => {
    let details = null;
    if (rawMeta.details) {
      try {
        details = JSON.parse(rawMeta.details);
      } catch {}
    }
    return {
      ...rawMeta,
      details,
    };
  });
  return metas;
};

const deleteFile = async (id: number) => {
  await fetch("/_editor/uploads/" + id, {
    method: "DELETE",
  });
};

export { uploadFile, updateMeta, uploadGeneratedFile, getAll, deleteFile };
