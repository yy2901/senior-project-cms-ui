import { sanitize } from "dompurify";
import { moveBlock } from "../../../../helpers/moveBlock";
import { FlexibleType } from "../TemplateEditor/Flexible";
import FieldsParser from "./FieldsParser";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

type FlexibleInstanceItemFlieldsDataType = {
  [key: string]: any;
};

type FlexibleInstanceItemDataType = {
  type: string;
  fields: FlexibleInstanceItemFlieldsDataType;
  id: string | null;
};

type FlexibleInstanceProps = {
  data: FlexibleInstanceItemDataType[];
  setData: (data: FlexibleInstanceItemDataType[]) => void;
  flexibleModes: FlexibleType;
};

const FlexibleInstance = ({
  data,
  setData,
  flexibleModes,
}: FlexibleInstanceProps) => {
  const setItemData = (index: number) => {
    return (newItemData: FlexibleInstanceItemDataType) => {
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
        <FlexibleItem
          data={item}
          setData={setItemData(i)}
          key={item.type + i}
          flexibleModes={flexibleModes}
          deleteItem={deleteItem(i)}
          moveup={moveBlock(i, "up", data, setData)}
          movedown={moveBlock(i, "down", data, setData)}
        />
      ))}
      <button
        onClick={() => {
          setData([
            ...data,
            { type: flexibleModes[0].name, fields: {}, id: uuidv4() },
          ]);
        }}
      >
        Add Item
      </button>
    </div>
  );
};

type FlexibleItemProps = {
  data: FlexibleInstanceItemDataType;
  setData: (data: FlexibleInstanceItemDataType) => void;
  flexibleModes: FlexibleType;
  deleteItem: () => void;
  moveup: () => void;
  movedown: () => void;
};

const FlexibleItem = ({
  data,
  setData,
  flexibleModes,
  deleteItem,
  moveup,
  movedown,
}: FlexibleItemProps) => {
  const setField = (fields: FlexibleInstanceItemFlieldsDataType) => {
    const newData = { ...data };
    newData.fields = fields;
    setData(newData);
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <button onClick={moveup}>up</button>
        <br></br>
        <button onClick={movedown}>down</button>
      </div>
      <div>
        {flexibleModes.map((mode, i) => (
          <button
            key={mode.name + i}
            onClick={() => setData({ ...data, type: mode.name })}
            disabled={mode.name === data.type}
            dangerouslySetInnerHTML={{ __html: sanitize(mode.display) }}
          ></button>
        ))}
      </div>
      <FieldsParser
        fields={
          flexibleModes.find((mode) => mode.name === data.type)?.fields || []
        }
        data={data.fields}
        setData={setField}
      />
      <div>
        <button onClick={deleteItem}>Delete Item</button>
      </div>
    </div>
  );
};

export default FlexibleInstance;
