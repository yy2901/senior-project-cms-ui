import Field, { FieldType, FieldTypesType } from "./Field";

export type FieldsType = FieldType[];

type FieldsComponentType = {
  fields: FieldsType;
  setFields: (fields: FieldsType) => void;
};

const Fields = ({ fields, setFields }: FieldsComponentType) => {
  const currentId = fields.length
    ? fields.map((field) => field.id).reduce((m, c) => Math.max(m, c)) + 1
    : 0;
  const setField = (newField: FieldType): void => {
    const newFields = [...fields];
    const targetIndex = newFields.findIndex(
      (field) => field.id === newField.id
    );
    if (targetIndex < 0) {
      const generatedNewField = { ...newField };
      while (newFields.find((field) => field.key === generatedNewField.key)) {
        generatedNewField.key = "_" + generatedNewField.key;
      }
      newFields.push(generatedNewField);
    } else {
      const generatedNewField = { ...newField };
      while (
        newFields.find(
          (field) =>
            field.key === generatedNewField.key &&
            field.id !== generatedNewField.id
        )
      ) {
        generatedNewField.key = "_" + generatedNewField.key;
      }
      newFields[targetIndex] = generatedNewField;
    }
    setFields(newFields);
  };
  const deleteField = (id: number) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
  };
  return (
    <div
      style={{
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "5px",
        border: "1px solid black",
      }}
    >
      {fields.map((field) => (
        <Field
          field={field}
          key={field.id}
          setField={setField}
          deleteField={deleteField}
        />
      ))}
      <button
        onClick={() =>
          setField({
            id: currentId,
            key: "new",
            fieldName: "New",
            type: FieldTypesType.text,
            options: {},
          })
        }
      >
        Add Field
      </button>
    </div>
  );
};

export default Fields;
