import React, { useEffect } from "react";

export type BooleanFieldType = {
  defaultValue: boolean;
};

type BooleanFieldProps = {
  booleanField: BooleanFieldType | undefined;
  setBooleanField: (booleanField: BooleanFieldType) => void;
};

const BooleanField = ({ booleanField, setBooleanField }: BooleanFieldProps) => {
  useEffect(() => {
    if (!booleanField) {
      setBooleanField({ defaultValue: false });
    }
  }, []);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooleanField({ defaultValue: e.target.checked });
  };
  return (
    <div>
      default value:{" "}
      {booleanField && (
        <input
          type="checkbox"
          defaultChecked={booleanField.defaultValue}
          onChange={changeHandler}
        ></input>
      )}
    </div>
  );
};

export default BooleanField;
