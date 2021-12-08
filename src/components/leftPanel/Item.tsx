import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { parseDashCase } from "../../helpers/parseDashCase";
import {
  refreshRightPanel,
  RightPanelModal,
  setModal,
  setRouteUrl,
  setTemplateParent,
} from "../../redux/rightPanelReducer";
import { AppDispatch } from "../../redux/store";
import ItemSub from "./ItemSub";

type ItemProps = {
  rowid: number;
  route: string;
  refresh: () => void;
};

const Item = memo(({ rowid, route, refresh }: ItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [renaming, setRenaming] = useState(false);
  const [expand, setExpand] = useState(false);
  const renamingValue = useRef<HTMLInputElement>(null);
  const changeRoute = async () => {
    const newRoute =
      renamingValue && renamingValue.current && renamingValue.current.value;
    if (newRoute && newRoute.length > 0) {
      const parsedNewRoute = "/" + parseDashCase(newRoute);
      await fetch("/_editor/api-routes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: rowid,
          apiRoute: {
            route: parsedNewRoute,
          },
        }),
      });
      dispatch(setModal(RightPanelModal.EMPTY));
    }
  };
  const deleteRoute = async () => {
    await fetch("/_editor/api-routes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rowid: rowid,
        apiRoute: {
          deleted: "TRUE",
        },
      }),
    });
    dispatch(setModal(RightPanelModal.TRASHCAN));
    dispatch(refreshRightPanel());
  };
  useEffect(() => {
    if (renaming) {
      renamingValue.current?.focus();
    }
  }, [renaming]);
  return (
    <div className="left-panel__item">
      <div className="left-panel__item__title">
        <div className="left-panel__flex left-panel__flex--align-center left-panel__flex--grow">
          {expand ? (
            <button
              className="left-panel__item__expand left-panel__flex--no-shrink"
              onClick={() => setExpand(false)}
            >
              -
            </button>
          ) : (
            <button
              className="left-panel__item__expand left-panel__flex--no-shrink"
              onClick={() => setExpand(true)}
            >
              +
            </button>
          )}
          {renaming ? (
            <>
              <button>/</button>
              <input
                ref={renamingValue}
                type="text"
                placeholder="route"
                className="left-panel__flex--grow"
                defaultValue={route.split("/")[1]}
              />
            </>
          ) : (
            <button
              onClick={() => {
                dispatch(setRouteUrl(route));
              }}
            >
              {route}
            </button>
          )}
        </div>
        <div className="left-panel__flex">
          {renaming ? (
            <button
              onClick={async () => {
                setRenaming(false);
                await changeRoute();
                refresh();
              }}
            >
              submit
            </button>
          ) : (
            <button onClick={() => setRenaming(true)}>rename</button>
          )}
          {renaming ? (
            <button onClick={() => setRenaming(false)}>cancel</button>
          ) : (
            <button
              onClick={async () => {
                await deleteRoute();
                refresh();
              }}
            >
              delete
            </button>
          )}
        </div>
      </div>
      <ItemSub route={route} expand={expand} />
    </div>
  );
});

export default Item;
