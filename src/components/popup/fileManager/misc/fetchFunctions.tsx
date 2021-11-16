import { Meta } from "./types";

const uploadFile = async (file: Blob | string): Promise<Meta> => {
  const formData = new FormData();
  formData.set("file", file);
  const res = await fetch("/_editor/uploads", {
    method: "POST",
    body: formData,
  });
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

const updateMeta = async (rowid: number, newMeta: Meta) => {
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
  const metas: Meta[] = await res.json();
  return metas;
};

const deleteFile = async (id: number) => {
  await fetch("/_editor/uploads/" + id, {
    method: "DELETE",
  });
};

const getMeta = async (id: number) => {
  const res = await fetch("/_editor/FilesMeta/" + id);
  const meta: Meta = await res.json();
  return meta;
};

export {
  uploadFile,
  updateMeta,
  uploadGeneratedFile,
  getAll,
  deleteFile,
  getMeta,
};
