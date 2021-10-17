import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Item from "./Item";
import "../../styles/LeftPanel.scss";
import DeletedButton from "./DeletedButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/api-routes")
      .then((res) => res.json())
      .then((res) => setApis(res));
  };
  useEffect(() => {
    refresh();
  }, [refresher]);
  return (
    <div className="left-panel">
      {apis.length ? (
        apis.map((api) => (
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
    </div>
  );
};

export default LeftPanel;
