import { FieldType, FieldTypesType } from "../TemplateEditor/Field";
import BooleanInstance from "./BooleanInstance";
import ChoicesInstance from "./ChoicesInstance";
import FieldsParser from "./FieldsParser";
import FileInstance from "./FileInstance";
import FlexibleInstance from "./FlexibleInstance";
import NumberInstance from "./NumberInstance";
import RepeatInstance from "./RepeatInstance";
import TextInstance from "./TextInstance";
import WYSIWYGInstance from "./WYSIWYGInstance";

type FieldParserProps = {
  field: FieldType;
  data: any;
  setData: (value: any) => void;
};

const FieldParser = ({ field, data, setData }: FieldParserProps) => {
  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "10px",
        border: "1px solid black",
        marginBottom: "10px",
      }}
    >
      <span>{field.fieldName} : </span>
      {field.type === FieldTypesType.choices && field.options.choices && (
        <ChoicesInstance
          template={field.options.choices}
          data={data ? data : field.options.choices[0]}
          setData={setData}
        />
      )}
      {field.type === FieldTypesType.number && (
        <NumberInstance data={data ? data : 0} setData={setData} />
      )}
      {field.type === FieldTypesType.text && (
        <TextInstance data={data ? data : "DEFAULT VALUE"} setData={setData} />
      )}
      {field.type === FieldTypesType.group && field.options.group && (
        <FieldsParser
          data={data ? data : []}
          setData={setData}
          fields={field.options.group}
        />
      )}
      {field.type === FieldTypesType.boolean && field.options.booleanField && (
        <BooleanInstance
          data={
            data !== undefined ? data : field.options.booleanField?.defaultValue
          }
          setData={setData}
        />
      )}
      {field.type === FieldTypesType.repeat && field.options.repeat && (
        <RepeatInstance
          data={data ? data : []}
          setData={setData}
          fields={field.options.repeat}
        />
      )}
      {field.type === FieldTypesType.flexible && field.options.flexible && (
        <FlexibleInstance
          data={data ? data : []}
          setData={setData}
          flexibleModes={field.options.flexible}
        />
      )}
      {field.type === FieldTypesType.file && (
        <FileInstance
          fileField={data ? data : { id: -1, url: "", type: "" }}
          setFileField={setData}
        />
      )}
      {field.type === FieldTypesType.wysiwyg && (
        <WYSIWYGInstance data={data} setData={setData} />
      )}
    </div>
  );
};

export default FieldParser;
