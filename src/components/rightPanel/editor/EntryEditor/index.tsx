import { useState } from "react";
import { TemplateType } from "../TemplateEditor";
import Field, { FieldType, FieldTypesType } from "../TemplateEditor/Field";
import { FieldsType } from "../TemplateEditor/Fields";
import ChoicesInstance from "./ChoicesInstance";
import FieldsParser from "./FieldsParser";
import NumberInstance from "./NumberInstance";
import TextInstance from "./TextInstance";

type EntryEditorProps = {
  template: TemplateType;
};

const EntryEditor = ({ template }: EntryEditorProps) => {
  const [data, setData] = useState<any>({});
  console.log(data);
  const setKeyData = (key: string) => {
    return (value: any) => {
      const newData = { ...data };
      newData[key] = value;
      setData(newData);
    };
  };
  return (
    <div>
      <FieldsParser data={data} setData={setData} fields={template.fields} />
    </div>
  );
};

export default EntryEditor;
