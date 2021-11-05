import { EditorState, RichUtils } from "draft-js";

const BLOCK_TYPES = [
  { label: " “ ” ", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "{ }", style: "code-block" },
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
];

type Props = {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
};

const BlockStyleToolbar = ({ editorState, setEditorState }: Props) => {
  const toggle = (blockStyle: string) =>
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  const isBlock = (blockStyle: string) =>
    editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType() === blockStyle;
  return (
    <>
      {BLOCK_TYPES.map((type) => (
        <button
          style={{ color: isBlock(type.style) ? "red" : "black" }}
          onClick={(e) => {
            toggle(type.style);
            e.preventDefault();
          }}
        >
          {type.label}
        </button>
      ))}
    </>
  );
};

export default BlockStyleToolbar;
