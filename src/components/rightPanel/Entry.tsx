import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";
import dateParser from "../../helpers/dateParser";
import EntryEditor from "./editor/EntryEditor";
import { TemplateType } from "./editor/TemplateEditor";
import { v4 as uuid } from "uuid";

type EntryData = {
  title: string;
  rowid: number;
  parent: string;
  name: string;
  slug: string;
  time: number;
  content: EntryContentType;
  teaser: EntryContentType;
};

type EntryContentType = {
  [key: string]: any;
};

type EntryProp = {
  entrySlug: string | null;
};

const Entry = memo(({ entrySlug }: EntryProp) => {
  const mounted = useRef(true);
  const dispatch = useDispatch<AppDispatch>();
  const refresher = useSelector(
    (state: RootState) => state.rightPanelReducer.refresher
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
    fetch("/_editor/entries" + entrySlug)
      .then((res) => res.json())
      .then((res: EntryData) => {
        if (mounted.current) {
          setData(res);
          const teaser = res.teaser;
          if (teaser) {
            setTeaserData(teaser);
          } else {
            setTeaserData({});
          }
          const content = res.content;
          if (content) {
            setContentData(content);
          } else {
            setContentData({});
          }
        }
      });
  };
  const deleteEntry = async () => {
    if (data?.rowid) {
      await fetch("/_editor/entries", {
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
      if (mounted.current) {
        dispatch(setModal(RightPanelModal.TRASHCAN));
        dispatch(refreshLeftPanel());
      }
    }
  };
  const updateEntry = async () => {
    if (data) {
      await fetch("/_editor/entries", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          rowid: data.rowid,
          entry: {
            ...data,
            teaser: teaserData,
            content: contentData,
          },
        }),
      });
      if (mounted.current) {
        dispatch(refreshLeftPanel());
      }
    }
  };
  useEffect(() => {
    refresh();
  }, [refresher, entrySlug]);
  useEffect(() => {
    if (data?.parent) {
      fetch("/_editor/templates" + data.parent)
        .then((res) => res.json())
        .then((res) => {
          try {
            const content = res.content;
            if (content.fields) {
              setContentTemplate(content);
            }
          } catch {}
          try {
            const teaser = res.teaser;
            if (teaser) {
              setTeaserTemplate(teaser);
            }
          } catch {}
        });
    }
  }, [data]);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
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

const EntryWrapper = () => {
  const entrySlug = useSelector(
    (state: RootState) => state.rightPanelReducer.entrySlug
  );
  const [id, setId] = useState(uuid());
  useEffect(() => {
    setId(uuid());
  }, [entrySlug]);
  return <Entry entrySlug={entrySlug} key={id} />;
};

export default EntryWrapper;
