import { useDispatch } from "react-redux";
import {
  select,
  toggleFileManager,
  startInserting,
  setFileFieldSetter,
} from "../../../../redux/fileManagerReducer";
import { AppDispatch } from "../../../../redux/store";

type FileInstancePropType = {
  fileField: FileFieldType;
  setFileField: (data: FileFieldType) => void;
};

export type FileFieldType = {
  id: number;
  url: string;
  type: string;
  thumbnail: string;
  [key: string]: any;
};

const FileInstance = ({ fileField, setFileField }: FileInstancePropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectFile = () => {
    dispatch(select(fileField.id));
    dispatch(toggleFileManager(true));
    dispatch(startInserting());
    setFileFieldSetter(setFileField);
  };
  const clearField = () => {
    setFileField({ id: -1, type: "", thumbnail: "", url: "" });
  };
  return (
    <div>
      <span>{fileField.url}</span>
      {fileField.thumbnail && <img src={fileField.thumbnail}></img>}
      <button onClick={selectFile}>
        {fileField.id > -1 ? "Change File" : "Add File"}
      </button>
      <button onClick={clearField}>Clear Field</button>
    </div>
  );
};

export default FileInstance;
