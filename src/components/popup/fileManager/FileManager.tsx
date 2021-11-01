import { useDispatch, useSelector } from "react-redux";
import Uploader from "./misc/uploader/Uploader";
import {
  refresh,
  select,
  toggleFileManager,
} from "../../../redux/fileManagerReducer";
import { AppDispatch, RootState } from "../../../redux/store";
import FileGrid from "./FileGrid";
import { deleteFile } from "./misc/fetchFunctions";

const FileManager = () => {
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
                  dispatch(select(-1));
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
          <FileGrid />
          {isInserting && (
            <div>
              <button>Select</button>
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
