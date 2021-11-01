import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type RouteData = {
  rowid: number;
  route: string;
  content: string;
  template: string;
  _limit: string;
  type: string;
  _order: string;
};

const Route = () => {
  const [data, setData] = useState<RouteData>();
  const routeUrl = useSelector(
    (state: RootState) => state.rightPanelReducer.routeUrl
  );
  const refresher = useSelector(
    (state: RootState) => state.rightPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/api-routes" + routeUrl)
      .then((res) => res.json())
      .then((res) => setData(res));
  };
  useEffect(() => {
    refresh();
  }, [refresher, routeUrl]);
  return (
    <div>
      <h1>Edit Route</h1>
      <h2>{data?.route}</h2>
    </div>
  );
};

export default Route;
