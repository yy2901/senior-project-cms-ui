import { RepeatType } from "../TemplateEditor/Repeat";
import FieldsParser from "./FieldsParser";

type RepeatInstanceProps = {
  data: any[];
  setData: (data: any) => void;
  fields: RepeatType;
};

const RepeatInstance = ({ data, setData, fields }: RepeatInstanceProps) => {
  const setItemData = (index: number) => {
    return (newItemData: any) => {
      const newData = [...data];
      newData[index] = newItemData;
      setData(newData);
    };
  };
  const deleteItem = (index: number) => {
    return () => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    };
  };
  return (
    <div>
      {data.map((item, i) => (
        <div style={{ display: "flex" }} key={i}>
          <FieldsParser
            data={item}
            setData={setItemData(i)}
            fields={fields ? fields : []}
          />
          <button onClick={deleteItem(i)}>Delete Item</button>
        </div>
      ))}
      <button
        onClick={() => {
          setData([...data, {}]);
        }}
      >
        Add Item
      </button>
    </div>
  );
};

export default RepeatInstance;
