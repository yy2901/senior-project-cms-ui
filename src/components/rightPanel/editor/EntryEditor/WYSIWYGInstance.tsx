import {
  Editor,
  RichUtils,
  EditorState,
  convertToRaw,
  RawDraftContentState,
  convertFromRaw,
} from "draft-js";
import { useEffect, useState } from "react";
import BlockStyleToolbar from "./WYSIWYGHelpers/BlockStyleToolbar";

type Props = {
  data: RawDraftContentState | null;
  setData: (data: RawDraftContentState) => void;
};

const WYSIWYGInstance = ({ data, setData }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    data
      ? EditorState.createWithContent(convertFromRaw(data))
      : EditorState.createEmpty()
  );
  const isStyle = (style: string) => {
    return editorState.getCurrentInlineStyle().has(style);
  };
  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  useEffect(() => {
    setData(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);
  return (
    <div>
      <button
        style={{
          color: isStyle("BOLD") ? "red" : "black",
        }}
        onClick={() => toggleStyle("BOLD")}
      >
        Bold
      </button>
      <button
        style={{
          color: isStyle("ITALIC") ? "red" : "black",
        }}
        onClick={() => toggleStyle("ITALIC")}
      >
        Italic
      </button>
      <button
        style={{
          color: isStyle("UNDERLINE") ? "red" : "black",
        }}
        onClick={() => toggleStyle("UNDERLINE")}
      >
        underline
      </button>
      <BlockStyleToolbar
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <div style={{ border: "1px solid #666" }}>
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};

export default WYSIWYGInstance;
