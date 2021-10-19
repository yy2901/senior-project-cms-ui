import { useState } from "react";
import Fields, { FieldsType } from "./Fields";

export type TemplateType = {
  fields: FieldsType;
};

type TemplateEditorProps = {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
};

const TemplateEditor = ({ template, setTemplate }: TemplateEditorProps) => {
  const setFields = (fields: FieldsType) => {
    setTemplate({ fields });
  };
  return (
    <div>
      <Fields fields={template.fields} setFields={setFields} />
    </div>
  );
};

export default TemplateEditor;
