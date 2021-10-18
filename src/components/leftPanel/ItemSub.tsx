import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateEntryName } from "../../helpers/generateEntryName";
import { setEntrySlug, setTemplateParent } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";

type ItemSubProp = {
  route: string;
  expand: boolean;
};

type Entries = {
  rowid: number;
  title: string;
  name: string;
  slug: string;
}[];

const ItemSub = memo(({ route, expand }: ItemSubProp) => {
  const refresher = useSelector(
    (state: RootState) => state.leftPanelReducer.refresher
  );
  const dispatch = useDispatch<AppDispatch>();
  const [hasTemplate, setHasTemplate] = useState(false);
  const [entries, setEntries] = useState<Entries>([]);
  const [addingEntry, setAddingEntry] = useState(false);
  const newEntryTitle = useRef<HTMLDivElement>(null);
  const refresh = () => {
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/templates" + route)
      .then((res) => res.json())
      .then((res) => {
        if (res.rowid) {
          setHasTemplate(true);
        } else {
          setHasTemplate(false);
        }
      });
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries" + route)
      .then((res) => res.json())
      .then((res) => setEntries(res));
  };
  const addTemplate = async () => {
    await fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/templates", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ parent: route }),
    });
    refresh();
    dispatch(setTemplateParent(route));
  };
  const createNewEntry = async () => {
    if (newEntryTitle.current?.innerHTML) {
      const title = newEntryTitle.current.innerHTML;
      const name = await generateEntryName(route, title);
      await fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parent: route,
          name: name,
          title: title,
        }),
      });
      dispatch(setEntrySlug(route + name));
    }
  };
  useEffect(() => {
    if (expand) {
      refresh();
    }
  }, [route, expand, refresher]);
  useEffect(() => {
    if (addingEntry) {
      newEntryTitle.current?.focus();
    }
  }, [addingEntry]);
  return (
    <div>
      {expand ? (
        <>
          <div className="left-panel__grey-wrapper left-panel__item__grey-wrapper">
            {hasTemplate ? (
              <button
                onClick={() => {
                  dispatch(setTemplateParent(route));
                }}
              >
                Edit Template
              </button>
            ) : (
              <button onClick={() => addTemplate()}>Add Template</button>
            )}
          </div>
          <div className="left-panel__grey-wrapper left-panel__item__grey-wrapper">
            {addingEntry ? (
              <div className="left-panel__flex left-panel__flex--align-center">
                <div
                  contentEditable
                  ref={newEntryTitle}
                  className="left-panel__item__new-title left-panel__flex--grow"
                ></div>
                <button
                  onClick={async () => {
                    await createNewEntry();
                    setAddingEntry(false);
                    refresh();
                  }}
                >
                  submit
                </button>
                <button
                  onClick={() => {
                    setAddingEntry(false);
                  }}
                >
                  cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setAddingEntry(true)}>Add Entry</button>
            )}
          </div>
          <div>
            {entries.length ? (
              <>
                {entries.map((entry) => (
                  <div className="left-panel__item__entry" key={entry.rowid}>
                    <button
                      className="left-panel__item__entry-button"
                      onClick={() => {
                        dispatch(setEntrySlug(entry.slug));
                      }}
                    >
                      <div className="left-panel__item__entry-slug">
                        {entry.name}
                      </div>
                      <div className="left-panel__item__entry-title">
                        {entry.title}
                      </div>
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

export default ItemSub;