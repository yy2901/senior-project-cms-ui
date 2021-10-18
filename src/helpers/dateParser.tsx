const dateParser = (time: number) => {
  const date = new Date(time);
  return `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

export default dateParser;
