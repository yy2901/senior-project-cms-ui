import { useState } from "react";

type TextInstanceProps = {
  data: string;
  setData: (data: string) => void;
};

const TextInstance = ({ data, setData }: TextInstanceProps) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState<string>(data);
  const blur = () => {
    setData(text);
    setEditing(false);
  };
  return (
    <span>
      {editing ? (
        <input
          onChange={(e) => setText(e.target.value)}
          onBlur={blur}
          defaultValue={data}
          onKeyDown={(e) => {
            e.key === "Enter" && blur();
          }}
        ></input>
      ) : (
        <button
          onClick={() => {
            setEditing(true);
          }}
        >
          {data}
        </button>
      )}
    </span>
  );
};

export default TextInstance;
