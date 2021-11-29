import {
  ContentBlock,
  ContentState,
  EditorState,
  Modifier,
  SelectionState,
} from "draft-js";
import { useState } from "react";
import { CustomCSSType } from "../../TemplateEditor/WYSIWYG";

type LinkToolProps = {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
};

const linkDecoratorStrategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  contentBlock.findEntityRanges((charData) => {
    const charDataEntity = charData.getEntity();
    return charDataEntity
      ? contentState.getEntity(charDataEntity).getType() === "LINK"
      : false;
  }, callback);
};

const LinkDecorator =
  (linkStyle: CustomCSSType | undefined) =>
  ({ children }: { children: any }) => {
    return <a style={linkStyle}>{children}</a>;
  };

const LinkTool = ({ editorState, setEditorState }: LinkToolProps) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  const getSelectedBlock = () => {
    return editorState
      .getCurrentContent()
      .getBlockMap()
      .get(editorState.getSelection().getEndKey());
  };

  const getSelectedEntityKey = () => {
    return getSelectedBlock().getEntityAt(
      editorState.getSelection().getStartOffset()
    );
  };

  const getSelectedLink = () => {
    return getSelectedEntityKey()
      ? editorState.getCurrentContent().getEntity(getSelectedEntityKey())
      : null;
  };

  const confirmLink = () => {
    const contentStateWithEntity = editorState
      .getCurrentContent()
      .createEntity("LINK", "MUTABLE", {
        url: input,
        new_window: false,
      });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(
      contentStateWithEntity,
      editorState.getSelection(),
      entityKey
    );
    const newEditorStateWithUpdatedContent = EditorState.set(editorState, {
      currentContent: contentStateWithLink,
    });
    setEditorState(newEditorStateWithUpdatedContent);
  };

  const removeLink = () => {
    if (getSelectedEntityKey()) {
      getSelectedBlock().findEntityRanges(
        (charData) => {
          const charDataEntity = charData.getEntity();
          if (!charDataEntity) {
            return false;
          } else {
            return charDataEntity === getSelectedEntityKey();
          }
        },
        (start, end) => {
          const linkSelection = new SelectionState({
            anchorKey: getSelectedBlock().getKey(),
            focusKey: getSelectedBlock().getKey(),
            anchorOffset: start,
            focusOffset: end,
          });
          setEditorState(
            EditorState.set(editorState, {
              currentContent: Modifier.applyEntity(
                editorState.getCurrentContent(),
                linkSelection,
                null
              ),
            })
          );
        }
      );
    }
    // const contentStateWithLink = Modifier.applyEntity(
    //   editorState.getCurrentContent(),
    //   ,
    //   null
    // );
    // setEditorState(
    //   EditorState.set(editorState, { currentContent: contentStateWithLink })
    // );
  };

  return (
    <>
      <button
        style={{ color: getSelectedLink() ? "red" : "black" }}
        onClick={() => {
          setEditing(!editing);
        }}
      >
        Link
      </button>
      {getSelectedLink() && (
        <>
          <button onClick={removeLink}>Remove Link</button>
          <span>{getSelectedLink()?.getData().url}</span>
        </>
      )}
      {editing && (
        <>
          <input
            defaultValue={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button onClick={confirmLink}>Y</button>
        </>
      )}
    </>
  );
};

export default LinkTool;
export { linkDecoratorStrategy, LinkDecorator };
