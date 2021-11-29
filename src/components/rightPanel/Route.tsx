import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RootState } from "../../redux/store";
import EntryEditor from "./editor/EntryEditor";
import TemplateEditor, { TemplateType } from "./editor/TemplateEditor";

export type RouteData = {
  rowid: number;
  route: string;
  content: { [key: string]: any };
  template: TemplateType;
};

const Route = ({ routeUrl }: { routeUrl: string | null }) => {
  const mounted = useRef(true);
  const [data, setData] = useState<RouteData>();
  const [content, setContent] = useState<{ [key: string]: any }>();
  const [template, setTemplate] = useState<TemplateType>();
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
  const updateTemplate = async () => {
    await fetch("/_editor/api-routes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rowid: data?.rowid,
        apiRoute: {
          template: template,
        },
      }),
    });
    refresh();
  };
  const updateContent = async () => {
    await fetch("/_editor/api-routes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rowid: data?.rowid,
        apiRoute: {
          content: content,
        },
      }),
    });
    refresh();
  };
  useEffect(() => {
    refresh();
  }, [refresher, routeUrl]);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
    if (data?.template) {
      setTemplate(data.template);
    }
  }, [data]);
  return (
    <div>
      <h1>Edit Route</h1>
      <h2>{data?.route}</h2>
      {data && (
        <div>
          <TemplateEditor
            template={template ? template : { fields: [] }}
            setTemplate={setTemplate}
          />
          <button onClick={updateTemplate}>update template</button>
          <br />
          <br />
          <br />
          <EntryEditor
            template={template ? template : { fields: [] }}
            data={content ? content : {}}
            setData={setContent}
          />
          <button onClick={updateContent}>update content</button>
        </div>
      )}
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
