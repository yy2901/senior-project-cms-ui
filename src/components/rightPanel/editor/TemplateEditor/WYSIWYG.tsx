import { useState } from "react";

export type CustomCSSType = {
  [key: string]: string;
};

type CustomStyleWithCustomNameType = {
  name: string;
  css: CustomCSSType;
};

export type WYSIWYGCustomStyleTypes = {
  customInlineStyle: CustomStyleWithCustomNameType[];
  customBlockStyle: CustomStyleWithCustomNameType[];
  customLinkStyle: CustomCSSType;
};

const WYSIWYGTemplate = ({
  data,
  setData,
}: {
  data: WYSIWYGCustomStyleTypes;
  setData: (data: WYSIWYGCustomStyleTypes) => void;
}) => {
  const setLinkStyle = (linkStyle: CustomCSSType) => {
    const newData = { ...data };
    newData.customLinkStyle = linkStyle;
    setData(newData);
  };
  const setCustomBlockStyle = (
    customBlockStyle: CustomStyleWithCustomNameType[]
  ) => {
    const newData = { ...data };
    newData.customBlockStyle = customBlockStyle;
    setData(newData);
  };
  const addblockStyle = () => {
    const newData = { ...data };
    newData.customBlockStyle.push({ name: "new", css: {} });
    setData(newData);
  };
  const setCustomInlineStyle = (
    customInlineStyle: CustomStyleWithCustomNameType[]
  ) => {
    const newData = { ...data };
    newData.customInlineStyle = customInlineStyle;
    setData(newData);
  };
  const addInlineStyle = () => {
    const newData = { ...data };
    newData.customInlineStyle.push({ name: "new", css: {} });
    setData(newData);
  };
  return (
    <div>
      <div>
        <span>Link CSS Styles</span>
        <CSSEditor
          name="link"
          data={data.customLinkStyle}
          setData={setLinkStyle}
        />
      </div>
      <div>
        <div>Block CSS Styles</div>
        <MultipleCustomStyles
          data={data.customBlockStyle}
          setData={setCustomBlockStyle}
        />
        <button onClick={addblockStyle}>Add Block Type</button>
      </div>
      <div>
        <div>Inline CSS Styles</div>
        <MultipleCustomStyles
          data={data.customInlineStyle}
          setData={setCustomInlineStyle}
        />
        <button onClick={addInlineStyle}>Add Inline Type</button>
      </div>
    </div>
  );
};

const MultipleCustomStyles = ({
  data,
  setData,
}: {
  data: CustomStyleWithCustomNameType[];
  setData: (data: CustomStyleWithCustomNameType[]) => void;
}) => {
  const setSingle = (index: number) => {
    const newData = [...data];
    return (data: CustomStyleWithCustomNameType) => {
      newData[index] = data;
      setData(newData);
    };
  };
  const deleteSingle = (i: number) => {
    const newData = [...data];
    return () => {
      newData.splice(i, 1);
      setData(newData);
    };
  };
  return (
    <div>
      {data.map((t, i) => (
        <CustomStyleWithCustomName
          key={t.name + i}
          data={t}
          setData={setSingle(i)}
          deleteThis={deleteSingle(i)}
        />
      ))}
    </div>
  );
};

const CustomStyleWithCustomName = ({
  data,
  setData,
  deleteThis,
}: {
  data: CustomStyleWithCustomNameType;
  setData: (data: CustomStyleWithCustomNameType) => void;
  deleteThis: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(data.name);
  const updateName = () => {
    const newData = { ...data };
    newData.name = nameInput;
    setData(newData);
  };
  const setCSS = (css: CustomCSSType) => {
    const newData = { ...data };
    newData.css = css;
    setData(newData);
  };
  return (
    <div>
      {editing ? (
        <>
          <input
            defaultValue={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          ></input>
          <button
            onClick={() => {
              updateName();
              setEditing(false);
            }}
          >
            Y
          </button>
          <button
            onClick={() => {
              setEditing(false);
            }}
          >
            N
          </button>
          <button onClick={deleteThis}>delete</button>
        </>
      ) : (
        <span onClick={() => setEditing(true)}>{data.name}</span>
      )}
      <CSSEditor name={data.name} data={data.css} setData={setCSS} />
    </div>
  );
};

const CSSEditor = ({
  name,
  data,
  setData,
}: {
  name: string;
  data: CustomCSSType;
  setData: (data: CustomCSSType) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const setProperty = (k: string, v: string, _k: string) => {
    const newData = { ...data };
    delete newData[_k];
    newData[k] = v;
    setData(newData);
  };
  const addProperty = () => {
    const newData = { ...data };
    newData["new"] = "new";
    setData(newData);
  };
  const deleteProperty = (_k: string) => {
    const newData = { ...data };
    delete newData[_k];
    setData(newData);
  };
  return (
    <div>
      {editing ? (
        <div
          style={{
            borderRadius: "10px",
            backgroundColor: "#888",
            padding: "10px",
          }}
        >
          {Object.keys(data).map((key) => (
            <CSSSinglePropertyEditor
              key={key + data[key]}
              keyName={key}
              value={data[key]}
              setData={setProperty}
              deleteData={deleteProperty}
            ></CSSSinglePropertyEditor>
          ))}
          <button onClick={addProperty}>add property</button>
          <button onClick={() => setEditing(false)}>finish editing</button>
        </div>
      ) : (
        <>
          preview:
          <br />
          <button style={data} onClick={() => setEditing(true)}>
            {name}
          </button>
        </>
      )}
    </div>
  );
};

const CSSSinglePropertyEditor = ({
  keyName,
  value,
  setData,
  deleteData,
}: {
  keyName: string;
  value: string;
  setData: (keyName: string, value: string, prevKeyName: string) => void;
  deleteData: (k: string) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [keyInput, setKeyInput] = useState(keyName);
  const [valueInput, setValueInput] = useState(value);
  return (
    <div>
      {editing ? (
        <>
          <input
            defaultValue={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
          ></input>
          <input
            defaultValue={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          ></input>
          <button
            onClick={() => {
              setData(keyInput, valueInput, keyName);
              setEditing(false);
            }}
          >
            Y
          </button>
          <button onClick={() => setEditing(false)}>N</button>
          <button onClick={() => deleteData(keyName)}>delete</button>
        </>
      ) : (
        <button onClick={() => setEditing(true)}>
          {keyName}:{value}
        </button>
      )}
    </div>
  );
};

export default WYSIWYGTemplate;
