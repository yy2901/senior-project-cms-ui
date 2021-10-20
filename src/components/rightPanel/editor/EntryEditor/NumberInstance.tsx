import { useState } from "react";

type NumberInstanceProps = {
  data: number;
  setData: (data: number) => void;
};

const NumberInstance = ({ data, setData }: NumberInstanceProps) => {
  const [editing, setEditing] = useState(false);
  const [number, setNumber] = useState<number>(data);
  const blur = () => {
    setData(number);
    setEditing(false);
  };
  return (
    <>
      <span>
        {editing ? (
          <input
            type="number"
            defaultValue={data}
            onChange={(e) => setNumber(parseFloat(e.target.value))}
            onKeyDown={(e) => {
              e.key === "Enter" && blur();
            }}
            onBlur={blur}
          ></input>
        ) : (
          <button onClick={() => setEditing(true)}>{data}</button>
        )}
      </span>
    </>
  );
};

export default NumberInstance;
