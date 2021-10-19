import Fields, { FieldsType } from "./Fields";

export type RepeatType = FieldsType | undefined;

type ArrayWrapperPropType = {
  repeat: RepeatType;
  setRepeat: (arrayWrapper: RepeatType) => void;
};

const ArrayWrapper = ({ repeat, setRepeat }: ArrayWrapperPropType) => {
  return (
    <div>
      <div>
        <b>Item Fields: </b>
      </div>
      {repeat && <Fields fields={repeat} setFields={setRepeat} />}
    </div>
  );
};

export default ArrayWrapper;
