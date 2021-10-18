const FieldTypes = ["text", "number"];

const Field = () => {
  return (
    <div
      style={{
        borderRadius: "5px",
        boxSizing: "border-box",
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span>key:</span>
        <input defaultValue="key"></input>
      </div>
      <div>
        <span>field name:</span>

        <input defaultValue="name"></input>
      </div>
      <div>
        <span>type:</span>
        <select></select>
      </div>
      <div>
        <button>Delete Field</button>
      </div>
    </div>
  );
};

export default Field;
