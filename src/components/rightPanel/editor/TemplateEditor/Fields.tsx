import Field from "./Field";

const Fields = () => {
  return (
    <div
      style={{
        padding: "10px",
        boxSizing: "border-box",
        borderRadius: "5px",
        border: "1px solid black",
      }}
    >
      <Field />
      <button>Add Field</button>
    </div>
  );
};

export default Fields;
