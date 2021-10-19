const dateParser = (time: number) => {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date
    .getHours()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${date
    .getMinutes()
    .toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })}`;
};

export default dateParser;
