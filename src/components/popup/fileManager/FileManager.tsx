import { useDispatch, useSelector } from "react-redux";
import Uploader from "./misc/uploader/Uploader";
import { refresh, toggleFileManager } from "../../../redux/fileManagerReducer";
import { AppDispatch, RootState } from "../../../redux/store";
import FileGrid from "./FileGrid";
import { deleteFile } from "./misc/fetchFunctions";
import { useState } from "react";
import { Meta } from "./misc/types";

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
  const setFileField = useSelector(
    (state: RootState) => state.fileManagerReducer.setFileField
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
          {isInserting && (
            <div>
              <button
                onClick={() => {
                  dispatch(toggleFileManager(false));
                  setFileField(
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
