import { Editor, RichUtils, EditorState } from "draft-js";
import { useState } from "react";
import BlockStyleToolbar from "./WYSIWYGHelpers/BlockStyleToolbar";

type Props = {
  data: any;
  setData: (data: any) => void;
};

const WYSIWYGInstance = ({ data, setData }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const isStyle = (style: string) => {
    return editorState.getCurrentInlineStyle().has(style);
  };
  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
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
