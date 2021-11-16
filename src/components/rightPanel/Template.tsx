import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";
import TemplateEditor, { TemplateType } from "./editor/TemplateEditor";

type TemplateDataType = {
  rowid: number;
  parent: string;
  fields: string;
  teaser: string;
};

const Template = () => {
  const [data, setData] = useState<TemplateDataType>();
  const dispatch = useDispatch<AppDispatch>();
  const templateParent = useSelector(
    (state: RootState) => state.rightPanelReducer.templateParent
  );
  const refresher = useSelector(
    (state: RootState) => state.rightPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/templates" + templateParent)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        try {
          const fields = res.fields;
          if (fields.fields) {
            setContentFields(fields);
          }
          const teaser = res.teaser;
          if (teaser.fields) {
            setTeaserFields(teaser);
          }
        } catch {}
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
      dispatch(setModal(RightPanelModal.TRASHCAN));
      dispatch(refreshLeftPanel());
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
            fields: contentFields,
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

export default Template;
