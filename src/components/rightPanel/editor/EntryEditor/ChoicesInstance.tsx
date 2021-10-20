import { ChoicesType } from "../TemplateEditor/Choices";

export type ChoicesValueType = number;

type ChoicesInstanceProps = {
  template: ChoicesType;
  data: string;
  setData: (data: string) => void;
};

const ChoicesInstance = ({ template, data, setData }: ChoicesInstanceProps) => {
  return (
    <span>
      {template.map((option, i) => (
        <button
          key={option + i}
          style={{ color: data === option ? "red" : "black" }}
          onClick={() => setData(option)}
        >
          {option}
        </button>
      ))}
    </span>
  );
};

export default ChoicesInstance;
