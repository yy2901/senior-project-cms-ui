import React, { useEffect, useState } from "react";

export type ChoicesType = string[];

type ChoicesProps = {
  choices: string[] | undefined;
  setChoices: (choices: string[]) => void;
};

const Choices = ({ choices, setChoices }: ChoicesProps) => {
  useEffect(() => {
    if (!choices) {
      setChoices([]);
    }
  }, []);
  const [choicesString, setChoicesString] = useState("");
  const [editing, setEditing] = useState(false);
  return (
    <div>
      {editing ? (
        <>
          <div>
            <b>Type in items, seperated by return</b>
          </div>
          <textarea
            defaultValue={choicesString}
            onChange={(e) => {
              setChoicesString(e.target.value);
            }}
          ></textarea>
          <button
            onClick={() => {
              setChoices(
                choicesString.split("\n").filter((item) => item !== "")
              );
              setEditing(false);
            }}
          >
            Y
          </button>
          <button onClick={() => setEditing(false)}>N</button>
        </>
      ) : (
        <>
          <button
            style={{ textAlign: "left" }}
            onClick={() => {
              setEditing(true);
              if (choices) {
                setChoicesString(choices.map((choice) => choice).join("\n"));
              }
            }}
          >
            {choices && choices.length > 0
              ? choices.map((choice, i) => (
                  <React.Fragment key={i + choice}>
                    {i + 1}.{choice}
                    <br />
                  </React.Fragment>
                ))
              : "Add Choices"}
          </button>
        </>
      )}
    </div>
  );
};

export default Choices;
