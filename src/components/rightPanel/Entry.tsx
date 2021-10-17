import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { RightPanelModal, setModal } from "../../redux/rightPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";

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

const Entry = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const { entrySlug, refresher } = useSelector(
    (state: RootState) => state.rightPanelReducer
  );
  const [data, setData] = useState<EntryData>();
  const refresh = () => {
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/entries" + entrySlug)
      .then((res) => res.json())
      .then((res) => setData(res));
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
  useEffect(() => {
    refresh();
  }, [refresher, entrySlug]);
  return (
    <div>
      <button onClick={deleteEntry}>delete entry</button>
      <h1>{data?.title}</h1>
      <h2>
        <span>{data?.parent}</span>
        <span>{data?.name}</span>
      </h2>
    </div>
  );
});

export default Entry;
