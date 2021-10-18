import { useState } from "react";
import Fields from "./Fields";

const TemplateEditor = () => {
  const [data, setData] = useState<void>();
  return (
    <div>
      <Fields />
    </div>
  );
};

export default TemplateEditor;
