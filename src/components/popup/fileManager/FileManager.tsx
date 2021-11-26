import { useDispatch, useSelector } from "react-redux";
import Uploader from "./misc/uploader/Uploader";
import { refresh, toggleFileManager } from "../../../redux/fileManagerReducer";
import { AppDispatch, RootState } from "../../../redux/store";
import FileGrid from "./FileGrid";
import { deleteFile } from "./misc/fetchFunctions";
import { useState } from "react";
import { Meta } from "./misc/types";
import { fileFieldSetter } from "../../../misc/fileFieldSetter";
import dateParser from "../../../helpers/dateParser";

const FileManager = () => {
  const [files, setFiles] = useState<Meta[]>([]);
  const isOpen = useSelector(
    (state: RootState) => state.fileManagerReducer.open
  );
  const selected = useSelector(
    (state: RootState) => state.fileManagerReducer.selected
  );
  const isInserting = useSelector(
    (state: RootState) => state.fileManagerReducer.isInserting
  );
  const dispatch = useDispatch<AppDispatch>();
  const deleteSelected = async () => {
    await deleteFile(selected);
    dispatch(refresh());
  };
  if (isOpen) {
    return (
      <div className="fileManager">
        <div className="fileManager__modal">
          <div style={{ margin: "10px" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h1>File Manager</h1>
              <button
                onClick={() => {
                  dispatch(toggleFileManager(false));
                }}
              >
                close
              </button>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Uploader />
              <button onClick={deleteSelected}>delete Selected</button>
            </div>
          </div>
          <FileGrid files={files} setFiles={setFiles} />
          {files
            .filter((f) => f.rowid === selected)
            .map((preview) => (
              <div className="fileManager__preview">
                <div className="fileManager__preview__view">
                  {["png", "jpg", "webp", "jpeg"].includes(
                    preview.extension.toLowerCase()
                  ) && <img src={preview.details.url} />}
                  {["mp4"].includes(preview.extension.toLowerCase()) && (
                    <video
                      autoPlay
                      controls
                      playsInline
                      src={preview.details.url}
                    />
                  )}
                </div>
                <div className="fileManager__preview__details">
                  <table>
                    <tbody>
                      <tr>
                        <td>size:</td>
                        <td>
                          {Math.floor(preview.size / 1024 / 1024)
                            ? Math.floor(preview.size / 1024 / 1024) + "mb"
                            : Math.floor(preview.size / 1024) + "kb"}
                        </td>
                      </tr>
                      <tr>
                        <td>Uploaded:</td>
                        <td>{dateParser(preview.time)}</td>
                      </tr>
                      {Object.keys(preview.details).map((k) => (
                        <tr key={k}>
                          <td>{k}:</td>
                          <td>{preview.details[k]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          {isInserting && (
            <div style={{ padding: "10px" }}>
              <button
                onClick={() => {
                  dispatch(toggleFileManager(false));
                  fileFieldSetter(
                    files.find((file) => file.rowid === selected)?.details || {
                      id: -1,
                      url: "",
                      thumbnail: "",
                      type: "",
                    }
                  );
                }}
              >
                Select
              </button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FileManager;
