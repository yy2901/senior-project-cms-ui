import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { parseDashCase } from "../../helpers/parseDashCase";
import { setRouteUrl } from "../../redux/rightPanelReducer";
import { AppDispatch } from "../../redux/store";

type AddItemType = {
  refresh: () => void;
};

const AddItem = ({ refresh }: AddItemType) => {
  const [adding, setAdding] = useState(false);
  const inputRoute = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const createRoute = async () => {
    const newRoute = inputRoute.current?.value;
    if (newRoute === "uploads" || newRoute === "dashboard") {
      console.log("Illegal route name");
      return;
    }
    if (newRoute && newRoute.length > 0) {
      const route = "/" + parseDashCase(newRoute);
      await fetch("/_editor/api-routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route,
        }),
      });
      dispatch(setRouteUrl(route));
    }
  };
  useEffect(() => {
    if (adding) {
      inputRoute.current?.focus();
    }
  }, [adding]);
  return (
    <div className="left-panel__grey-wrapper left-panel__flex left-panel__flex--justify-center left-panel__flex--align-center">
      {!adding ? (
        <button onClick={() => setAdding(true)}>Add New Route</button>
      ) : (
        <>
          <span>/</span>
          <input
            type="text"
            ref={inputRoute}
            placeholder="route"
            className="left-panel__flex--grow"
          />
          <button
            onClick={async () => {
              setAdding(false);
              await createRoute();
              refresh();
            }}
          >
            submit
          </button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </>
      )}
    </div>
  );
};
export default AddItem;
