import { useDispatch } from "react-redux";
import { setFileFieldSetter } from "../../../../misc/fileFieldSetter";
import {
  select,
  toggleFileManager,
  startInserting,
} from "../../../../redux/fileManagerReducer";
import { AppDispatch } from "../../../../redux/store";
import { FileFieldType } from "../TemplateEditor/FileField";

type FileInstancePropType = {
  fileField: FileInstanceType;
  setFileField: (data: FileInstanceType) => void;
  fileOptions: FileFieldType;
};

export type FileInstanceType = {
  id: number;
  url: string;
  type: string;
  thumbnail: string;
  [key: string]: any;
};

const FileInstance = ({
  fileField,
  setFileField,
  fileOptions,
}: FileInstancePropType) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectFile = () => {
    dispatch(select(fileField.id));
    dispatch(toggleFileManager(true));
    dispatch(startInserting(fileOptions.filters));
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
