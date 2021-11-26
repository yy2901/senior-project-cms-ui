import {
  Editor,
  RichUtils,
  EditorState,
  convertToRaw,
  RawDraftContentState,
  convertFromRaw,
  CompositeDecorator,
  DraftBlockRenderMap,
} from "draft-js";
import { useEffect, useMemo, useState } from "react";
import { WYSIWYGCustomStyleTypes } from "../TemplateEditor/WYSIWYG";
import LinkTool, {
  LinkDecorator,
  linkDecoratorStrategy,
} from "./WYSIWYGHelpers/linkTool";
import * as Immutable from "immutable";

type Props = {
  data: RawDraftContentState | null;
  setData: (data: RawDraftContentState) => void;
  options: WYSIWYGCustomStyleTypes | undefined;
};

const WYSIWYGInstance = ({ data, setData, options }: Props) => {
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: linkDecoratorStrategy,
      component: LinkDecorator(options?.customLinkStyle),
    },
  ]);
  const inlineStyleMap = useMemo(() => {
    const result: { [key: string]: any } = {};
    options?.customInlineStyle.forEach((inlineStyle) => {
      result[inlineStyle.name] = inlineStyle.css;
    });
    return result;
  }, [options?.customInlineStyle]);
  const blockRenderMap: DraftBlockRenderMap = useMemo(() => {
    const result: { [key: string]: any } = {};
    options?.customBlockStyle.forEach((blockStyle) => {
      result[blockStyle.name] = {
        wrapper: <div style={blockStyle.css} />,
      };
    });
    result["unstyled"] = {
      element: "div",
    };
    return Immutable.Map(result);
  }, [options?.customBlockStyle]);
  const [editorState, setEditorState] = useState<EditorState>(
    data
      ? EditorState.createWithContent(convertFromRaw(data), compositeDecorator)
      : EditorState.createEmpty(compositeDecorator)
  );
  const isStyle = (style: string) => {
    return editorState.getCurrentInlineStyle().has(style);
  };
  const toggleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };
  const toggleBlock = (blockStyle: string) =>
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  const isBlock = (blockStyle: string) =>
    editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType() === blockStyle;
  useEffect(() => {
    setData(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);
  return (
    <div>
      {options?.customInlineStyle.map((inlineStyle, i) => (
        <button
          key={inlineStyle.name + i}
          onClick={() => toggleStyle(inlineStyle.name)}
          style={{
            opacity: isStyle(inlineStyle.name) ? "100%" : "50%",
          }}
        >
          <span style={inlineStyle.css}>{inlineStyle.name}</span>
        </button>
      ))}{" "}
      {options?.customBlockStyle.map((blockStyle, i) => (
        <button
          key={blockStyle.name + i}
          style={{
            opacity: isBlock(blockStyle.name) ? "100%" : "50%",
          }}
          onClick={() => toggleBlock(blockStyle.name)}
        >
          <div style={blockStyle.css}>{blockStyle.name}</div>
        </button>
      ))}
      <br />
      <LinkTool editorState={editorState} setEditorState={setEditorState} />
      <div style={{ border: "1px solid #666" }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          customStyleMap={inlineStyleMap}
          blockRenderMap={blockRenderMap}
        />
      </div>
    </div>
  );
};

export default WYSIWYGInstance;
