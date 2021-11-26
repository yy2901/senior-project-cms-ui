import { Meta } from "../../../types";
import { uploadGeneratedFile } from "../../../fetchFunctions";

const optimizeVideo = async (meta: Meta, detail: { [key: string]: any }) => {
  if (["mp4"].indexOf(meta.extension.toLowerCase()) > -1) {
    const baseName = meta.fileName.slice(0, meta.fileName.lastIndexOf("."));
    const video = document.createElement("video");
    video.src = "/uploads/" + meta.fileName;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("crossOrigin", "Anonymous");
    detail.type = "video";
    await video.play();
    video.currentTime = video.duration / 2;
    await video.play();
    video.pause();
    const canvas = document.createElement("canvas");
    let scale = 1;
    if (video.videoHeight > video.videoWidth) {
      scale = 200 / video.videoHeight;
    } else {
      scale = 200 / video.videoWidth;
    }
    canvas.height = video.videoHeight * scale;
    canvas.width = video.videoWidth * scale;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const convertThenUpload = async () => {
      return new Promise<string | null>((res) => {
        canvas.toBlob(async (blob) => {
          if (blob) {
            console.log(URL.createObjectURL(blob));
            const url = await uploadGeneratedFile(
              meta.rowid,
              blob,
              baseName + "_thumbnail.jpg"
            );
            res(url);
          } else {
            res(null);
          }
        }, "image/jpeg");
      });
    };
    const generatedFileUrl = await convertThenUpload();
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);
    const convertThenUploadCover = async () => {
      return new Promise<string | null>((res) => {
        canvas.toBlob(async (blob) => {
          if (blob) {
            console.log(URL.createObjectURL(blob));
            const url = await uploadGeneratedFile(
              meta.rowid,
              blob,
              baseName + "_cover.jpg"
            );
            res(url);
          } else {
            res(null);
          }
        }, "image/jpeg");
      });
    };
    const generatedFileUrlCover = await convertThenUploadCover();
    generatedFileUrl && (detail.thumbnail = "/uploads/" + generatedFileUrl);
    generatedFileUrl && (detail.cover = "/uploads/" + generatedFileUrlCover);
    detail.width = video.videoWidth;
    detail.height = video.videoHeight;
    canvas.remove();
    video.remove();
  }
};

export { optimizeVideo };
