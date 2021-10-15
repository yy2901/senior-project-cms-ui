import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import Item from "./Item";
import "../../styles/LeftPanel.scss";

type API = {
  rowid: number;
  route: string;
}[];

const LeftPanel = () => {
  const [apis, setApis] = useState<API>([]);
  const refresh = () => {
    fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/api-routes")
      .then((res) => res.json())
      .then((res) => setApis(res));
  };
  useEffect(() => {
    refresh();
  }, []);
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
    </div>
  );
};

export default LeftPanel;
