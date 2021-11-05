import { FileFieldType } from "../components/rightPanel/editor/EntryEditor/FileInstance";

let fileFieldSetter: (fileField: FileFieldType) => void = (
  fileField: FileFieldType
) => {};

const setFileFieldSetter = (
  setFileField: (fileField: FileFieldType) => void
) => {
  fileFieldSetter = setFileField;
};

export { fileFieldSetter, setFileFieldSetter };
