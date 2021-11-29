import { RouteData } from "../Route";
import { FontsDataType } from "./fontManagerDataTypes";

const converRouteDataToFontData = (routeData: RouteData) => {
  if (routeData && routeData.content && routeData.content.fonts) {
    return routeData.content as FontsDataType;
  } else {
    return {
      fonts: [],
    };
  }
};

export default converRouteDataToFontData;
