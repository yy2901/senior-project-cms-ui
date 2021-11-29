import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshLeftPanel } from "../../redux/leftPanelReducer";
import { AppDispatch, RootState } from "../../redux/store";

type DeletedType = {
  templates: {
    rowid: number;
    parent: string;
  }[];
  routes: {
    rowid: number;
    route: string;
  }[];
  entries: {
    rowid: number;
    title: string;
    slug: string;
  }[];
};

const TrashCan = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<DeletedType>();
  const refresher = useSelector<RootState>(
    (state) => state.rightPanelReducer.refresher
  );
  const refresh = () => {
    fetch("/_editor/trash")
      .then((res) => res.json())
      .then((res) => setData(res));
  };
  const recoverRoute = (id: number) => {
    return async () => {
      await fetch("/_editor/api-routes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
          apiRoute: {
            deleted: "FALSE",
          },
        }),
      });
      dispatch(refreshLeftPanel());
      refresh();
    };
  };
  const deleteRoute = (id: number) => {
    return async () => {
      await fetch("/_editor/api-routes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
        }),
      });
      refresh();
    };
  };
  const recoverTemplate = (id: number) => {
    return async () => {
      await fetch("/_editor/templates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
          template: {
            deleted: "FALSE",
          },
        }),
      });
      dispatch(refreshLeftPanel());
      refresh();
    };
  };
  const deleteTemplate = (id: number) => {
    return async () => {
      await fetch("/_editor/templates", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
        }),
      });
      dispatch(refreshLeftPanel());
      refresh();
    };
  };
  const recoverEntry = (id: number) => {
    return async () => {
      await fetch("/_editor/entries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
          entry: {
            deleted: "FALSE",
          },
        }),
      });
      dispatch(refreshLeftPanel());
      refresh();
    };
  };
  const deleteEntry = (id: number) => {
    return async () => {
      await fetch("/_editor/entries", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rowid: id,
        }),
      });
      dispatch(refreshLeftPanel());
      refresh();
    };
  };
  useEffect(() => {
    refresh();
  }, [refresher]);
  return (
    <div className="trash-can">
      <h1>Deleted Items</h1>
      {data &&
        !data.routes.length &&
        !data.templates.length &&
        !data.entries.length && (
          <h2>No deleted routes, templates, or entries.</h2>
        )}
      {data?.routes.length ? (
        <div>
          <h2>Deleted Routes</h2>
          <table>
            <tbody>
              <tr>
                <th>id</th>
                <th>route</th>
                <th>recover</th>
                <th>delete permanantly</th>
              </tr>
              {data.routes.map((route) => (
                <tr key={route.rowid}>
                  <td>{route.rowid}</td>
                  <td>{route.route}</td>
                  <td>
                    <button onClick={recoverRoute(route.rowid)}>recover</button>
                  </td>
                  <td>
                    <button onClick={deleteRoute(route.rowid)}>
                      permanent delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {data?.templates.length ? (
        <div>
          <h2>Deleted Templates</h2>
          <table>
            <tbody>
              <tr>
                <th>id</th>
                <th>parent</th>
                <th>recover</th>
                <th>delete permanantly</th>
              </tr>
              {data.templates.map((template) => (
                <tr key={template.rowid}>
                  <td>{template.rowid}</td>
                  <td>{template.parent}</td>
                  <td>
                    <button onClick={recoverTemplate(template.rowid)}>
                      recover
                    </button>
                  </td>
                  <td>
                    <button onClick={deleteTemplate(template.rowid)}>
                      permanent delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {data?.entries.length ? (
        <div>
          <h2>Deleted Entries</h2>
          <table>
            <tbody>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>slug</th>
                <th>recover</th>
                <th>delete permanantly</th>
              </tr>
              {data.entries.map((entry) => (
                <tr key={entry.rowid}>
                  <td>{entry.rowid}</td>
                  <td>{entry.title}</td>
                  <td>{entry.slug}</td>
                  <td>
                    <button onClick={recoverEntry(entry.rowid)}>recover</button>
                  </td>
                  <td>
                    <button onClick={deleteEntry(entry.rowid)}>
                      permanent delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
});

export default TrashCan;
