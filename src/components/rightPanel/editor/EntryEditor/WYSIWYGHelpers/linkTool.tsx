import {
  ContentBlock,
  ContentState,
  EditorState,
  Modifier,
  SelectionState,
} from "draft-js";
import { useEffect, useState } from "react";
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
  const [newWindow, setNewWindow] = useState(false);

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
        new_window: newWindow,
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
    setEditing(false);
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
  };

  useEffect(() => {
    setEditing(false);
  }, [getSelectedLink()]);

  return (
    <>
      {!editing && (
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {getSelectedLink() ? "Edit Link" : "Add Link"}
        </button>
      )}
      {editing ? (
        <>
          <input
            defaultValue={getSelectedLink()?.getData().url}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <input
            type="checkbox"
            defaultValue={getSelectedLink()?.getData().new_window}
            onChange={(e) => setNewWindow(e.target.checked)}
          ></input>{" "}
          open in new window
          <button onClick={confirmLink}>Y</button>
          <button onClick={() => setEditing(false)}>N</button>
        </>
      ) : (
        getSelectedLink() && (
          <>
            <button onClick={removeLink}>Remove Link</button>
            <span>{getSelectedLink()?.getData().url}&nbsp;&nbsp;&nbsp;</span>
            <span>
              {" "}
              open in new window:{" "}
              {getSelectedLink()?.getData().new_window ? "yes" : "no"}
            </span>
          </>
        )
      )}
    </>
  );
};

export default LinkTool;
export { linkDecoratorStrategy, LinkDecorator };
