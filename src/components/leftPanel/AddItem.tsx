import { useEffect, useRef, useState } from "react";
import { parseDashCase } from "../../helpers/parseDashCase";

type AddItemType = {
  refresh: () => void;
};

const AddItem = ({ refresh }: AddItemType) => {
  const [adding, setAdding] = useState(false);
  const inputRoute = useRef<HTMLInputElement>(null);
  const createRoute = async () => {
    const newRoute = inputRoute.current?.value;
    if (newRoute && newRoute.length > 0) {
      await fetch(process.env.REACT_APP_CMS_BACKEND + "/_editor/api-routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          route: "/" + parseDashCase(newRoute),
        }),
      });
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
