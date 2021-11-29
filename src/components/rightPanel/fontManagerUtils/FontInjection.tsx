import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import converRouteDataToFontData from "./convertRouteDataToFontsData";
import { createFontsData, getFontsRouteData } from "./fontManagerFetchers";

const FontInjection = () => {
  const refresher = useSelector(
    (state: RootState) => state.fontInjectionReducer.refresher
  );
  const [initialized, setInitialized] = useState(false);
  const [injectionCSS, setInjectionCSS] = useState("");
  const init = async () => {
    await createFontsData();
    setInitialized(true);
  };
  const refresh = async () => {
    const fontSpecialRouteData = await getFontsRouteData();
    const fontsData = converRouteDataToFontData(fontSpecialRouteData);
    setInjectionCSS(
      `${fontsData.fonts
        .map(
          (font) =>
            `
          @font-face {
            font-family: "${font.name}";
            src: url(${font.file.url});
          }
    `
        )
        .join(" ")}`
    );
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (initialized) {
      refresh();
    }
  }, [refresher, initialized]);
  return <style>{injectionCSS}</style>;
};

export default FontInjection;
