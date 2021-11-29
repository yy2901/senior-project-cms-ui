import { RouteData } from "../Route";
import { FontsDataType } from "./fontManagerDataTypes";

const getFontsRouteData = async () => {
  const data: RouteData = await (
    await fetch("/_editor/api-routes/_fonts")
  ).json();
  return data;
};

const createFontsData = async () => {
  await fetch("/_editor/api-routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: "/_fonts",
    }),
  });
};

const updateFontsData = async (data: FontsDataType, rowid: number) => {
  await fetch("/_editor/api-routes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rowid: rowid,
      apiRoute: {
        content: data,
      },
    }),
  });
};

export { getFontsRouteData, updateFontsData, createFontsData };
