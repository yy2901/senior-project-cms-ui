import React, { useEffect, useState } from "react";
import { parseUnderscoreCase } from "../../../../helpers/parseUnderscoreCase";
import Repeat, { RepeatType } from "./Repeat";
import BooleanField, { BooleanFieldType } from "./BooleanField";
import Choices, { ChoicesType } from "./Choices";
import Flexible, { FlexibleType } from "./Flexible";
import Fields, { FieldsType } from "./Fields";

export enum FieldTypesType {
  text = "text",
  number = "number",
  file = "file",
  choices = "choices",
  repeat = "repeat",
  flexible = "flexible",
  boolean = "boolean",
  wysiwyg = "wysiwyg",
  group = "group",
}

type OptionsType = {
  choices?: ChoicesType;
  repeat?: RepeatType;
  flexible?: FlexibleType;
  booleanField?: BooleanFieldType;
  group?: FieldsType;
};

export type FieldType = {
  id: number;
  key: string;
  fieldName: string;
  type: FieldTypesType;
  options: OptionsType;
};

type FieldComponentType = {
  field: FieldType;
  setField: (newField: FieldType) => void;
  deleteField: (id: number) => void;
};

const Field = ({ field, setField, deleteField }: FieldComponentType) => {
  const setRepeat = (newRepeat: RepeatType) => {
    const newField = { ...field };
    newField.options.repeat = newRepeat;
    setField(newField);
  };
  const setBooleanField = (newBooleanField: BooleanFieldType) => {
    const newField = { ...field };
    newField.options.booleanField = newBooleanField;
    setField(newField);
  };
  const setChoices = (newChioces: ChoicesType) => {
    const newField = { ...field };
    newField.options.choices = newChioces;
    setField(newField);
  };
  const setGroup = (newGroup: FieldsType) => {
    const newField = { ...field };
    newField.options.group = newGroup;
    setField(newField);
  };
  const setFlexible = (newFlexible: FlexibleType) => {
    const newField = { ...field };
    newField.options.flexible = newFlexible;
    setField(newField);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.value;
    setNameInput(fieldName);
    const key = parseUnderscoreCase(fieldName);
    setKeyInput(key);
  };
  const [currentInput, setCurrentInput] = useState<number>(0);
  const [keyInput, setKeyInput] = useState<string>("");
  const [nameInput, setNameInput] = useState<string>("");
  const [editingType, setEditingType] = useState<boolean>(false);
  const submitNameChange = () => {
    setCurrentInput(0);
    const newField = { ...field, key: keyInput, fieldName: nameInput };
    setField(newField);
  };
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as keyof typeof FieldTypesType;
    const newField = { ...field, type: FieldTypesType[newType] };
    if (FieldTypesType[newType] === FieldTypesType.repeat) {
      if (!newField.options.repeat) {
        newField.options.repeat = [];
      }
    }
    setField(newField);
    setEditingType(false);
  };
  useEffect(() => {
    setNameInput(field.fieldName);
    setKeyInput(field.key);
  }, [field]);
  return (
    <div
      style={{
        borderRadius: "5px",
        boxSizing: "border-box",
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {currentInput === 1 ? (
            <>
              <input
                defaultValue={field.key}
                onChange={(e) => setKeyInput(e.target.value)}
              ></input>
              <button onClick={submitNameChange}>Y</button>
              <button onClick={() => setCurrentInput(0)}>N</button>
            </>
          ) : (
            <button onClick={() => setCurrentInput(1)}>
              {keyInput === "" ? "edit" : keyInput}
            </button>
          )}
        </div>
        <div>
          <span>field name:</span>
          {currentInput === 2 ? (
            <>
              <input
                defaultValue={field.fieldName}
                onChange={handleNameChange}
              ></input>
              <button onClick={submitNameChange}>Y</button>
              <button onClick={() => setCurrentInput(0)}>N</button>
            </>
          ) : (
            <button onClick={() => setCurrentInput(2)}>
              {nameInput === "" ? "edit" : nameInput}
            </button>
          )}
        </div>
        <div>
          <span>type:</span>
          {editingType ? (
            <select defaultValue={field.type} onChange={handleTypeChange}>
              {Object.keys(FieldTypesType).map((key) => (
                <option value={key} key={key}>
                  {key}
                </option>
              ))}
            </select>
          ) : (
            <button onClick={() => setEditingType(true)}>
              {FieldTypesType[field.type]}
            </button>
          )}
        </div>
        <div>
          <button onClick={() => deleteField(field.id)}>Delete Field</button>
        </div>
      </div>
      <div>
        {field.type === FieldTypesType.repeat && (
          <div style={{ marginTop: "10px" }}>
            <Repeat repeat={field.options.repeat} setRepeat={setRepeat} />
          </div>
        )}
        {field.type === FieldTypesType.boolean && (
          <div style={{ marginTop: "10px" }}>
            <BooleanField
              booleanField={
                field.options.booleanField
                  ? field.options.booleanField
                  : { defaultValue: false }
              }
              setBooleanField={setBooleanField}
            />
          </div>
        )}
        {field.type === FieldTypesType.choices && (
          <div style={{ marginTop: "10px" }}>
            <Choices
              choices={field.options.choices ? field.options.choices : []}
              setChoices={setChoices}
            />
          </div>
        )}
        {field.type === FieldTypesType.group && (
          <div style={{ marginTop: "10px" }}>
            <Fields
              fields={field.options.group ? field.options.group : []}
              setFields={setGroup}
            />
          </div>
        )}
        {field.type === FieldTypesType.flexible && (
          <div style={{ marginTop: "10px" }}>
            <Flexible
              flexible={field.options.flexible ? field.options.flexible : []}
              setFlexible={setFlexible}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Field;
