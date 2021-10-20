import { FieldsType } from "../TemplateEditor/Fields";
import FieldParser from "./FieldParser";

type FieldsParserProps = {
  data: { [key: string]: any };
  setData: (data: { [key: string]: any }) => void;
  fields: FieldsType;
};

const FieldsParser = ({ data, setData, fields }: FieldsParserProps) => {
  const setFieldData = (key: string) => {
    return (value: any) => {
      const newData = { ...data };
      newData[key] = value;
      setData(newData);
    };
  };
  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "10px",
        border: "1px solid black",
        marginBottom: "10px",
      }}
    >
      {fields.map((field) => (
        <FieldParser
          key={field.key}
          field={field}
          data={data[field.key]}
          setData={setFieldData(field.key)}
        />
      ))}
    </div>
  );
};

export default FieldsParser;
