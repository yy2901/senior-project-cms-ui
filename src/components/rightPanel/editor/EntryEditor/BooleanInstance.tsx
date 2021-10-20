type BooleanInstanceProps = {
  data: boolean;
  setData: (data: boolean) => void;
};

const BooleanInstance = ({ data, setData }: BooleanInstanceProps) => {
  return (
    <span>
      <button
        style={{ color: data ? "red" : "black" }}
        onClick={() => setData(true)}
      >
        Yes
      </button>
      <button
        style={{ color: data ? "black" : "red" }}
        onClick={() => setData(false)}
      >
        No
      </button>
    </span>
  );
};

export default BooleanInstance;
