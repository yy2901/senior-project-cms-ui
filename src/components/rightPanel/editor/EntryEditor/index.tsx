import { useEffect } from "react";
import { TemplateType } from "../TemplateEditor";
import FieldsParser from "./FieldsParser";

type EntryEditorProps = {
  template: TemplateType;
  data: { [key: string]: any };
  setData: (data: { [key: string]: any }) => void;
};

const EntryEditor = ({ template, data, setData }: EntryEditorProps) => {
  return (
    <div>
      <FieldsParser data={data} setData={setData} fields={template.fields} />
    </div>
  );
};

export default EntryEditor;
