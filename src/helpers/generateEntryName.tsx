import { parseDashCase } from "./parseDashCase";

type EntriesType = {
  rowid: number;
  name: string;
}[];

export const generateEntryName = async (parent: string, title: string) => {
  const initialName = "/" + parseDashCase(title);
  let name = initialName;
  let deduplicator: number = 1;
  const entries: EntriesType = await fetch("/_editor/entries" + parent).then(
    (res) => res.json()
  );
  while (entries.find((entry) => entry.name === name)) {
    name = initialName + deduplicator;
    deduplicator++;
  }
  return name;
};
