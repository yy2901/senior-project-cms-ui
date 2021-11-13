import { uploadGeneratedFile } from "../../../fetchFunctions";
import { MetaWithRawDetail } from "../../../types";

const imageLoaded = (image: HTMLImageElement) => {
  return new Promise((res) => {
    image.onload = () => res("loaded");
  });
};

const compressThenUpload = async (
  image: HTMLImageElement,
  dimension: number,
  quality: number,
  baseName: string,
  originalFileId: number
): Promise<string | null> => {
  const canvas = document.createElement("canvas");
  let scale = 1;
  if (image.width <= dimension && image.height <= dimension) {
    return null;
  }
  if (image.width > image.height) {
    scale = dimension / image.width;
  } else {
    scale = dimension / image.height;
  }
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  const convertThenUpload = async () => {
    return new Promise<string | null>((res) => {
      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const url = await uploadGeneratedFile(
              originalFileId,
              blob,
              baseName + "_" + dimension + ".jpg"
            );
            res(url);
          } else {
            res(null);
          }
        },
        "image/jpeg",
        quality
      );
    });
  };
  const generatedFileUrl = await convertThenUpload();
  canvas.remove();
  return generatedFileUrl;
};

const optimizeImage = async (
  meta: MetaWithRawDetail,
  detail: { [key: string]: any }
) => {
  if (
    ["jpg", "png", "webp", "jpeg"].indexOf(meta.extension.toLowerCase()) > -1
  ) {
    const originalImage = new Image();
    originalImage.src = "/uploads/" + meta.fileName;
    originalImage.setAttribute("crossOrigin", "Anonymous");
    await imageLoaded(originalImage);
    detail.type = "image";
    detail.width = originalImage.width;
    detail.height = originalImage.height;
    const baseName = meta.fileName.slice(0, meta.fileName.lastIndexOf("."));
    const thumbnail = await compressThenUpload(
      originalImage,
      200,
      0.8,
      baseName,
      meta.rowid
    );
    detail.thumbnail = "/uploads/" + (thumbnail ? thumbnail : meta.fileName);
    const small = await compressThenUpload(
      originalImage,
      600,
      0.8,
      baseName,
      meta.rowid
    );
    detail.small = "/uploads/" + (small ? small : meta.fileName);
    const medium = await compressThenUpload(
      originalImage,
      1000,
      0.8,
      baseName,
      meta.rowid
    );
    const large = await compressThenUpload(
      originalImage,
      2000,
      0.8,
      baseName,
      meta.rowid
    );
    detail.medium = "/uploads/" + (medium ? medium : meta.fileName);
    detail.large = "/uploads/" + (large ? large : meta.fileName);
  }
};

export { optimizeImage };
