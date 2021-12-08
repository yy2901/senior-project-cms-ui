import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import {
  RightPanelModal,
  setEntrySlug,
  setModal,
} from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";
import dateParser from "../../helpers/dateParser";
import EntryEditor from "./editor/EntryEditor";
import { TemplateType } from "./editor/TemplateEditor";
import { v4 as uuid } from "uuid";
import { generateEntryName } from "../../helpers/generateEntryName";

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
  const updateEntry = async (partialEntryData: { [key: string]: any }) => {
    if (data) {
      await fetch("/_editor/entries", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          rowid: data.rowid,
          entry: partialEntryData,
        }),
      });
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
  const [updatingTeaserData, setUpdatingTeaserData] = useState(false);
  const [updatingContentData, setUpdatingContentData] = useState(false);
  const teaserTimer = useRef<any>();
  const contentTimer = useRef<any>();
  useEffect(() => {
    if (!updatingTeaserData) {
      setUpdatingTeaserData(true);
    }
    clearTimeout(teaserTimer.current);
    teaserTimer.current = setTimeout(async () => {
      await updateEntry({ teaser: teaserData });
      setUpdatingTeaserData(false);
    }, 1000);
    return () => clearTimeout(teaserTimer.current);
  }, [teaserData]);
  useEffect(() => {
    if (!updatingContentData) {
      setUpdatingContentData(true);
    }
    clearTimeout(contentTimer.current);
    contentTimer.current = setTimeout(async () => {
      await updateEntry({ content: contentData });
      setUpdatingContentData(false);
    }, 1000);
    return () => clearTimeout(contentTimer.current);
  }, [contentData]);
  return (
    <div>
      <button onClick={deleteEntry}>delete entry</button>
      <TitleField
        title={data?.title || ""}
        updateEntry={updateEntry}
        refresh={refresh}
      />
      <SlugField
        name={data?.name || ""}
        parent={data?.parent || ""}
        updateEntry={updateEntry}
      />
      <TimeField
        time={data?.time || 0}
        updateEntry={updateEntry}
        refresh={refresh}
      />
      <h3>Edit Teaser</h3>
      <span>{updatingTeaserData ? "updating teaser" : "teaser updated"}</span>
      <EntryEditor
        template={teaserTemplate}
        data={teaserData}
        setData={setTeaserData}
      />
      <h3>Edit Content</h3>
      <span>
        {updatingContentData ? "updating content" : "content updated"}
      </span>
      <EntryEditor
        template={contentTemplate}
        data={contentData}
        setData={setContentData}
      />
    </div>
  );
});

const TitleField = ({
  title,
  updateEntry,
  refresh,
}: {
  title: string;
  updateEntry: (data: { [key: string]: any }) => void;
  refresh: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(title);
  const inputField = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const setTitle = async () => {
    setEditing(false);
    if (input !== title && input !== "") {
      await updateEntry({
        title: input,
      });
      refresh();
      dispatch(refreshLeftPanel());
    }
  };
  useEffect(() => {
    if (editing) {
      inputField.current?.focus();
    }
  }, [editing]);
  return (
    <>
      {editing ? (
        <h1>
          <input
            ref={inputField}
            defaultValue={title}
            onChange={(e) => setInput(e.target.value)}
            onBlur={setTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") setTitle();
            }}
          ></input>
        </h1>
      ) : (
        <h1 onClick={() => setEditing(true)}>{title}</h1>
      )}
    </>
  );
};

const SlugField = ({
  name,
  parent,
  updateEntry,
}: {
  name: string;
  parent: string;
  updateEntry: (data: { [key: string]: any }) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(name);
  const inputField = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const setName = async () => {
    setEditing(false);
    if (input !== name && input !== "") {
      const name = await generateEntryName(parent, input);
      await updateEntry({
        name: name,
        parent: parent,
      });
      dispatch(setEntrySlug(parent + name));
      dispatch(refreshLeftPanel());
    }
  };
  useEffect(() => {
    if (editing) {
      inputField.current?.focus();
    }
  }, [editing]);
  return (
    <h2>
      {parent}
      {editing ? (
        <input
          ref={inputField}
          defaultValue={name}
          onChange={(e) => setInput(e.target.value)}
          onBlur={setName}
          onKeyDown={(e) => {
            if (e.key === "Enter") setName();
          }}
        ></input>
      ) : (
        <span onClick={() => setEditing(true)}>{name}</span>
      )}
    </h2>
  );
};

const TimeField = ({
  time,
  updateEntry,
  refresh,
}: {
  time: number;
  updateEntry: (data: { [key: string]: any }) => void;
  refresh: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const setTime = async () => {
    const newTime = Date.parse(inputRef.current?.value || "");
    if (newTime !== time) {
      await updateEntry({
        time: newTime,
      });
      dispatch(refreshLeftPanel());
      refresh();
      setEditing(false);
    }
  };
  return (
    <h3>
      {editing ? (
        <input
          ref={inputRef}
          defaultValue={dateParser(time)}
          onBlur={setTime}
          onKeyDown={(e) => {
            if (e.key === "Enter") setTime();
          }}
        ></input>
      ) : (
        <span onClick={() => setEditing(true)}>{dateParser(time)}</span>
      )}
    </h3>
  );
};

const EntryWrapper = () => {
  const entrySlug = useSelector(
    (state: RootState) => state.rightPanelReducer.entrySlug
  );
  // const [id, setId] = useState(uuid());
  // useEffect(() => {
  //   setId(uuid());
  // }, [entrySlug]);
  return <Entry entrySlug={entrySlug} key={entrySlug} />;
};

export default EntryWrapper;
