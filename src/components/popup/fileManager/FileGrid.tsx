import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./misc/fetchFunctions";
import { AppDispatch, RootState } from "../../../redux/store";
import { Meta } from "./misc/types";
import { select } from "../../../redux/fileManagerReducer";

type Props = {
  files: Meta[];
  setFiles: (files: Meta[]) => void;
};

const FileGrid = ({ files, setFiles }: Props) => {
  const selected = useSelector(
    (state: RootState) => state.fileManagerReducer.selected
  );
  const refresher = useSelector(
    (state: RootState) => state.fileManagerReducer.refresher
  );
  const insertingFilter = useSelector(
    (state: RootState) => state.fileManagerReducer.insertingFilter
  );
  const isInserting = useSelector(
    (state: RootState) => state.fileManagerReducer.isInserting
  );
  const dispatch = useDispatch<AppDispatch>();
  const refresh = async () => {
    const result = await getAll();
    setFiles(result);
  };
  useEffect(() => {
    refresh();
  }, [refresher]);
  const filteredFiles = isInserting
    ? insertingFilter.length > 0
      ? files.filter((f) => insertingFilter.includes(f.extension.toLowerCase()))
      : files
    : files;
  return (
    <div className="fileManager__fileGrid">
      {filteredFiles.map((file) => (
        <div
          style={{
            width: "calc(20% - 14.5px)",
            maxWidth: "150px",
            margin: "5px",
            display: "inline-block",
            verticalAlign: "top",
          }}
          key={file.rowid}
          onClick={() => dispatch(select(file.rowid))}
        >
          <div
            style={{
              width: "100%",
              paddingTop: "100%",
              position: "relative",
              lineHeight: "0",
            }}
            key={file.rowid}
            onClick={() => dispatch(select(file.rowid))}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "-5px",
                left: "-5px",
                border: "5px solid red",
                borderRadius: "5px",
                opacity: file.rowid === selected ? "1" : "0",
                transform: `scale(${file.rowid === selected ? "1" : "0.95"})`,
                transition: "0.1s",
              }}
            ></div>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
                pointerEvents: "none",
              }}
              src={
                file.details && file.details.thumbnail
                  ? file.details.thumbnail
                  : "/dashboard/filePlaceholder.png"
              }
            ></img>
          </div>
          <div style={{ wordBreak: "break-all", marginTop: "5px" }}>
            {file.fileName}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;
