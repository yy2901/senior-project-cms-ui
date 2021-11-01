import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";
import dateParser from "../../helpers/dateParser";
import EntryEditor from "./editor/EntryEditor";
import { TemplateType } from "./editor/TemplateEditor";

type EntryData = {
  title: string;
  rowid: number;
  parent: string;
  name: string;
  slug: string;
  time: number;
  content: string;
  teaser: string;
};

type EntryContentType = {
  [key: string]: any;
};

const Entry = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { entrySlug, refresher } = useSelector(
    (state: RootState) => state.rightPanelReducer
  );
  const [data, setData] = useState<EntryData>();
  const [contentTemplate, setContentTemplate] = useState<TemplateType>({
    fields: [],
  });
  const [teaserTemplate, setTeaserTemplate] = useState<TemplateType>({
    fields: [],
  });
  const [teaserData, setTeaserData] = useState<EntryContentType>({});
  const [contentData, setContentData] = useState<EntryContentType>({});
  const refresh = () => {
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries" + entrySlug)
      .then((res) => res.json())
      .then((res: EntryData) => {
        setData(res);
        try {
          const teaser = JSON.parse(res.teaser);
          if (teaser) {
            setTeaserData(teaser);
          }
        } catch {}
        try {
          const content = JSON.parse(res.content);
          if (content) {
            setContentData(content);
          }
        } catch {}
      });
  };
  const deleteEntry = async () => {
    if (data?.rowid) {
      await fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: data.rowid,
          entry: {
            deleted: "TRUE",
          },
        }),
      });
      dispatch(setModal(RightPanelModal.TRASHCAN));
      dispatch(refreshLeftPanel());
    }
  };
  const updateEntry = () => {
    if (data) {
      fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          rowid: data.rowid,
          entry: {
            ...data,
            teaser: JSON.stringify(teaserData),
            content: JSON.stringify(contentData),
          },
        }),
      });
    }
  };
  useEffect(() => {
    refresh();
  }, [refresher, entrySlug]);
  useEffect(() => {
    if (data?.parent) {
      fetch(
        process.env.REACT_APP_CMS_BACKEND + "/_editor/templates" + data.parent
      )
        .then((res) => res.json())
        .then((res) => {
          try {
            const content = JSON.parse(res.fields);
            if (content.fields) {
              setContentTemplate(content);
            }
          } catch {}
          try {
            const teaser = JSON.parse(res.teaser);
            if (teaser) {
              setTeaserTemplate(teaser);
            }
          } catch {}
        });
    }
  }, [data]);
  return (
    <div>
      <button onClick={deleteEntry}>delete entry</button>
      <button onClick={updateEntry}>Update entry</button>
      <h1>{data?.title}</h1>
      <h2>
        <span>{data?.parent}</span>
        <span>{data?.name}</span>
      </h2>
      <h3>{data && data.time && dateParser(data.time)}</h3>
      <h3>Edit Teaser</h3>
      <EntryEditor
        template={teaserTemplate}
        data={teaserData}
        setData={setTeaserData}
      />
      <h3>Edit Content</h3>
      <EntryEditor
        template={contentTemplate}
        data={contentData}
        setData={setContentData}
      />
    </div>
  );
});

export default Entry;
