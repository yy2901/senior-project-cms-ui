import { useState } from "react";

export type FileFieldType = {
  filters: string[];
};

type Props = {
  data: FileFieldType;
  setData: (data: FileFieldType) => void;
};

const FileField = ({ data, setData }: Props) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(data.filters.join(`\n`));
  return (
    <div>
      {editing ? (
        <>
          <textarea
            defaultValue={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              setData({
                filters: input
                  .split("\n")
                  .filter((f) => f.length > 0)
                  .map((f) => f.toLowerCase()),
              });
              setEditing(false);
            }}
          >
            Y
          </button>
          <button onClick={() => setEditing(false)}>N</button>
        </>
      ) : (
        <>
          <span>extension filters:</span>
          {data.filters.length > 0 ? (
            <>
              {data.filters.map((f) => (
                <button onClick={() => setEditing(true)} key={f.toLowerCase()}>
                  {f}
                </button>
              ))}
            </>
          ) : (
            <button onClick={() => setEditing(true)}>All kinds of File</button>
          )}
        </>
      )}
    </div>
  );
};

export default FileField;
