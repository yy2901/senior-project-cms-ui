import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";
import TemplateEditor, { TemplateType } from "./editor/TemplateEditor";

type TemplateDataType = {
  rowid: number;
  parent: string;
  content: string;
  teaser: string;
};

const Template = ({ templateParent }: { templateParent: string | null }) => {
  const mounted = useRef(true);
  const [data, setData] = useState<TemplateDataType>();
  const dispatch = useDispatch<AppDispatch>();

  const refresher = useSelector(
    (state: RootState) => state.rightPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/templates" + templateParent)
      .then((res) => res.json())
      .then((res) => {
        if (mounted.current) {
          setData(res);
          const content = res.content;
          if (content && content.fields) {
            setContentFields(content);
          }
          const teaser = res.teaser;
          if (teaser && teaser.fields) {
            setTeaserFields(teaser);
          }
        }
      });
  };
  const deleteTemplate = async () => {
    if (data?.rowid) {
      await fetch("/_editor/templates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: data.rowid,
          template: {
            deleted: "TRUE",
          },
        }),
      });
      if (mounted.current) {
        dispatch(setModal(RightPanelModal.TRASHCAN));
        dispatch(refreshLeftPanel());
      }
    }
  };
  const updateFields = async () => {
    if (data?.rowid) {
      await fetch("/_editor/templates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: data.rowid,
          template: {
            teaser: teaserFields,
            content: contentFields,
          },
        }),
      });
      refresh();
    }
  };
  const [teaserFields, setTeaserFields] = useState<TemplateType>({
    fields: [],
  });
  const [contentFields, setContentFields] = useState<TemplateType>({
    fields: [],
  });
  useEffect(() => {
    refresh();
  }, [refresher, templateParent]);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <div>
      <button onClick={deleteTemplate}>delete template</button>
      <h1>Edit Template</h1>
      <h2>
        {data?.parent} <button onClick={updateFields}>Update</button>
      </h2>
      <h3>Teaser</h3>
      <TemplateEditor template={teaserFields} setTemplate={setTeaserFields} />
      <h3>Content</h3>
      <TemplateEditor template={contentFields} setTemplate={setContentFields} />
    </div>
  );
};

const TemplateWrapper = () => {
  const templateParent = useSelector(
    (state: RootState) => state.rightPanelReducer.templateParent
  );
  const [id, setId] = useState(uuid());
  useEffect(() => {
    setId(uuid());
  }, [templateParent]);
  return <Template templateParent={templateParent} key={id} />;
};

export default TemplateWrapper;
