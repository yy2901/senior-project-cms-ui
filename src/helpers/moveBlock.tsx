export const moveBlock = (
  order: number,
  direction: string,
  data: any[],
  setData: (data: any[]) => void
) => {
  return () => {
    if (direction === "up" && order > 0) {
      const newData = [...data];
      newData.splice(order - 1, 0, newData.splice(order, 1)[0]);
      setData(newData);
    }
    if (direction === "down" && order < data.length - 1) {
      const newData = [...data];
      newData.splice(order + 1, 0, newData.splice(order, 1)[0]);
      setData(newData);
    }
  };
};
