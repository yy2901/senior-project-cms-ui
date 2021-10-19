export const parseUnderscoreCase = (name: string) => {
  return name
    .replace(/[^_a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
};
