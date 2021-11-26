import { sanitize } from "dompurify";
import { useState } from "react";
import Fields, { FieldsType } from "./Fields";

type ModeType = {
  id: number;
  name: string;
  fields: FieldsType;
  display: string;
};

export type FlexibleType = ModeType[];

type FlexibleProps = {
  flexible: FlexibleType;
  setFlexible: (flexible: FlexibleType) => void;
};

const Flexible = ({ flexible, setFlexible }: FlexibleProps) => {
  const currentId = flexible.length
    ? flexible.map((mode) => mode.id).reduce((m, c) => Math.max(m, c)) + 1
    : 0;
  const deleteMode = (id: number) => {
    return () => {
      setFlexible(flexible.filter((mode) => mode.id !== id));
    };
  };
  const setMode = (newMode: ModeType) => {
    const newFlexible = [...flexible];
    const targetIndex = newFlexible.findIndex((mode) => mode.id === newMode.id);
    newFlexible[targetIndex] = newMode;
    setFlexible(newFlexible);
  };
  return (
    <div>
      <div>
        <b>Modes:</b>
      </div>
      {flexible.map((mode, i) => (
        <Mode
          mode={mode}
          setMode={setMode}
          key={i}
          deleteMode={deleteMode(mode.id)}
        />
      ))}
      <div>
        <button
          onClick={() => {
            setFlexible([
              ...flexible,
              {
                id: currentId,
                name: "new mode",
                fields: [],
                display: "new mode",
              },
            ]);
          }}
        >
          Add Mode
        </button>
      </div>
    </div>
  );
};

type ModeProps = {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  deleteMode: () => void;
};

const Mode = ({ mode, setMode, deleteMode }: ModeProps) => {
  const setFields = (newFields: FieldsType) => {
    const newMode = { ...mode };
    newMode.fields = newFields;
    setMode(newMode);
  };
  const [editing, setEditing] = useState(false);
  const [modeInputName, setModeInputName] = useState(mode.name);
  const setModeName = (newName: string) => {
    const newMode = { ...mode };
    newMode.name = newName;
    setMode(newMode);
  };
  const setModeDisplay = (newDisplay: string) => {
    const newMode = { ...mode };
    newMode.display = sanitize(newDisplay);
    setMode(newMode);
  };
  const [modeDisplayInput, setModeDisplayInput] = useState(mode.display);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "10px",
      }}
    >
      <div style={{ whiteSpace: "nowrap", marginRight: "10px" }}>
        mode name:
        <br />
        {editing ? (
          <>
            <input
              onChange={(e) => setModeInputName(e.target.value)}
              defaultValue={mode.name}
            ></input>
            <textarea
              onChange={(e) => setModeDisplayInput(e.target.value)}
              defaultValue={mode.display}
            ></textarea>
            <button
              onClick={() => {
                setModeName(modeInputName);
                setModeDisplay(modeDisplayInput);
                setEditing(false);
              }}
            >
              Y
            </button>
            <button onClick={() => setEditing(false)}>N</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>{mode.name}</button>
            <button
              dangerouslySetInnerHTML={{ __html: sanitize(mode.display) }}
            />
          </>
        )}
      </div>
      <div style={{ width: "100%", flexGrow: 1 }}>
        <Fields fields={mode.fields} setFields={setFields} />
      </div>
      <div style={{ whiteSpace: "nowrap", marginLeft: "10px" }}>
        <button onClick={deleteMode}>delete mode</button>
      </div>
    </div>
  );
};

export default Flexible;
