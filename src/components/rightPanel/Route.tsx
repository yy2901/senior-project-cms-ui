import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
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

const Route = ({ routeUrl }: { routeUrl: string | null }) => {
  const mounted = useRef(true);
  const [data, setData] = useState<RouteData>();

  const refresher = useSelector(
    (state: RootState) => state.rightPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/api-routes" + routeUrl)
      .then((res) => res.json())
      .then((res) => {
        if (mounted.current) {
          setData(res);
        }
      });
  };
  useEffect(() => {
    refresh();
  }, [refresher, routeUrl]);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  return (
    <div>
      <h1>Edit Route</h1>
      <h2>{data?.route}</h2>
    </div>
  );
};

const RouteWrapper = () => {
  const routeUrl = useSelector(
    (state: RootState) => state.rightPanelReducer.routeUrl
  );
  const [id, setId] = useState(uuid());
  useEffect(() => {
    setId(uuid());
  }, [routeUrl]);
  return <Route routeUrl={routeUrl} key={id} />;
};

export default RouteWrapper;
