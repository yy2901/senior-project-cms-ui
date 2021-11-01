import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../fetchFunctions";
import { refresh, select } from "../../../../../redux/fileManagerReducer";
import { AppDispatch } from "../../../../../redux/store";
import { applyPlugins } from "./plugins";

const Uploader = () => {
  const [showInput, setShowInput] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const upload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const meta = await uploadFile(e.target.files[0]);
      await applyPlugins(meta);
      dispatch(refresh());
      dispatch(select(meta.rowid));
      setShowInput(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          setShowInput(true);
        }}
      >
        upload
      </button>
      {showInput && <input type="file" onChange={upload}></input>}
    </div>
  );
};

export default Uploader;
