import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { moveBlock } from "../../../../helpers/moveBlock";

export type ChoiceType = {
  name: string;
  display: string;
};

export type ChoicesType = ChoiceType[];

type ChoicesProps = {
  choices: ChoicesType;
  setChoices: (choices: ChoicesType) => void;
};

type ChoiceProps = {
  choice: ChoiceType;
  setChoice: (choice: ChoiceType) => void;
  deleteChoice: () => void;
  moveup: () => void;
  movedown: () => void;
};

const Choices = ({ choices, setChoices }: ChoicesProps) => {
  const setChoice = (index: number) => {
    return (newChoice: ChoiceType) => {
      const newChoices = [...choices];
      newChoices[index] = newChoice;
      setChoices(newChoices);
    };
  };
  const deleteChoice = (index: number) => {
    return () => {
      const newChoices = [...choices];
      newChoices.splice(index, 1);
      setChoices(newChoices);
    };
  };
  return (
    <div>
      {choices?.map((choice, i) => (
        <Choice
          key={choice.name + i}
          choice={choice}
          setChoice={setChoice(i)}
          deleteChoice={deleteChoice(i)}
          moveup={moveBlock(i, "up", choices, setChoices)}
          movedown={moveBlock(i, "down", choices, setChoices)}
        />
      ))}
      <button
        onClick={() =>
          setChoices([
            ...choices,
            { name: "new", display: "<b>New Choice</b>" },
          ])
        }
      >
        Add Choice
      </button>
    </div>
  );
};

const Choice = ({
  choice,
  setChoice,
  deleteChoice,
  moveup,
  movedown,
}: ChoiceProps) => {
  const [editing, setEditing] = useState(false);
  const [inputName, setInputName] = useState(choice.name);
  const [inputDisplay, setInputDisplay] = useState(choice.display);
  return (
    <div>
      <button onClick={moveup}>up</button>
      <button onClick={movedown}>down</button>
      {editing ? (
        <>
          <input
            defaultValue={choice.name}
            onChange={(e) => setInputName(e.target.value)}
          ></input>
          <textarea
            defaultValue={choice.display}
            onChange={(e) => setInputDisplay(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              setChoice({
                name: inputName,
                display: DOMPurify.sanitize(inputDisplay),
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
          <button onClick={() => setEditing(true)}>{choice.name}</button>
          <button
            onClick={() => setEditing(true)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(choice.display),
            }}
          ></button>
        </>
      )}
      <button onClick={deleteChoice}>delete</button>
    </div>
  );
};

export default Choices;
