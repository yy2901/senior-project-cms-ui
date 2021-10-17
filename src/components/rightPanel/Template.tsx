import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";

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
    fetch(
      process.env.REACT_APP_CMS_BACKEND + "/_editor/templates" + templateParent
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  };
  const deleteTemplate = async () => {
    if (data?.rowid) {
      await fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/templates", {
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
  useEffect(() => {
    refresh();
  }, [refresher, templateParent]);
  return (
    <div>
      <button onClick={deleteTemplate}>delete template</button>
      <h1>Edit Template</h1>
      <h2>{data?.parent}</h2>
    </div>
  );
};

export default Template;
