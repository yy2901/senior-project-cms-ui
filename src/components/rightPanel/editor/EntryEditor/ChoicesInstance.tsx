import { ChoicesType } from "../TemplateEditor/Choices";
import DOMPurity from "dompurify";

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
          key={option.name + i}
          disabled={data === option.name}
          onClick={() => setData(option.name)}
          dangerouslySetInnerHTML={{
            __html: DOMPurity.sanitize(option.display),
          }}
        ></button>
      ))}
    </span>
  );
};

export default ChoicesInstance;
