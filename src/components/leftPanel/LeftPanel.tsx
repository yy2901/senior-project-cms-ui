import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Item from "./Item";
import "../../styles/LeftPanel.scss";
import DeletedButton from "./DeletedButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ToggleFileManagerButton from "./ToggleFileManagerButton";
import ToggleFontManagerButton from "./ToggleFontManagerButton";

type API = {
  rowid: number;
  route: string;
}[];

const LeftPanel = () => {
  const [apis, setApis] = useState<API>([]);
  const refresher = useSelector(
    (state: RootState) => state.leftPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/api-routes")
      .then((res) => res.json())
      .then((res) => setApis(res));
  };
  useEffect(() => {
    refresh();
  }, [refresher]);
  const filteredApis = apis.filter((api) => api.route !== "/_fonts");
  return (
    <div className="left-panel">
      {filteredApis.length ? (
        filteredApis.map((api) => (
          <Item
            key={api.rowid}
            rowid={api.rowid}
            route={api.route}
            refresh={refresh}
          ></Item>
        ))
      ) : (
        <></>
      )}
      <AddItem refresh={refresh} />
      <DeletedButton />
      <ToggleFileManagerButton />
      <ToggleFontManagerButton />
    </div>
  );
};

export default LeftPanel;
