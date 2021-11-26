import { FileInstanceType } from "../components/rightPanel/editor/EntryEditor/FileInstance";

let fileFieldSetter: (fileField: FileInstanceType) => void = (
  fileField: FileInstanceType
) => {};

const setFileFieldSetter = (
  setFileField: (fileField: FileInstanceType) => void
) => {
  fileFieldSetter = setFileField;
};

export { fileFieldSetter, setFileFieldSetter };
