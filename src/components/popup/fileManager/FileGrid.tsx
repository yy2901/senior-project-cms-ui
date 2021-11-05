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
  const dispatch = useDispatch<AppDispatch>();
  const refresh = async () => {
    const result = await getAll();
    setFiles(result);
  };
  useEffect(() => {
    refresh();
  }, [refresher]);
  return (
    <div className="fileManager__fileGrid">
      {files.map((file) => (
        <div
          style={{
            width: "calc(20% - 14.2px)",
            paddingTop: "calc(20% - 14.2px)",
            position: "relative",
            margin: "5px",
            display: "inline-block",
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
                : "/filePlaceholder.png"
            }
          ></img>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;
