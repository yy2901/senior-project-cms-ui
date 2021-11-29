import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshFontInjection } from "../../redux/fontInjectionReducer";
import EntryEditor from "./editor/EntryEditor";
import converRouteDataToFontData from "./fontManagerUtils/convertRouteDataToFontsData";
import {
  FontsDataType,
  fontsTemplate,
} from "./fontManagerUtils/fontManagerDataTypes";
import {
  getFontsRouteData,
  updateFontsData,
} from "./fontManagerUtils/fontManagerFetchers";

const FontManager = () => {
  const rowid = useRef(-1);
  const [data, setData] = useState<FontsDataType>({ fonts: [] });
  const refresh = async () => {
    const fontsRouteData = await getFontsRouteData();
    rowid.current = fontsRouteData.rowid;
    setData(converRouteDataToFontData(fontsRouteData));
  };
  const dispatch = useDispatch();
  useEffect(() => {
    refresh();
  }, []);
  const update = async () => {
    await updateFontsData(data, rowid.current);
    refresh();
    dispatch(refreshFontInjection());
  };
  return (
    <div>
      <EntryEditor
        template={fontsTemplate}
        data={data}
        setData={(data: any) => setData(data)}
      />
      <button onClick={update}>update</button>
      {data.fonts.map((f, i) => (
        <input
          key={f.name + i}
          style={{
            fontFamily: `"${f.name}"`,
            display: "block",
            width: "100%",
            fontSize: "3rem",
          }}
          defaultValue={f.name}
        ></input>
      ))}
    </div>
  );
};

export default FontManager;
