import { FileInstanceType } from "../editor/EntryEditor/FileInstance";
import { TemplateType } from "../editor/TemplateEditor";
import { FieldTypesType } from "../editor/TemplateEditor/Field";

export const fontsTemplate: TemplateType = {
  fields: [
    {
      id: 0,
      key: "fonts",
      fieldName: "fonts",
      type: FieldTypesType.repeat,
      options: {
        repeat: [
          {
            id: 0,
            key: "name",
            fieldName: "Font Name",
            type: FieldTypesType.text,
            options: {},
          },
          {
            id: 1,
            key: "file",
            fieldName: "Font File",
            type: FieldTypesType.file,
            options: {
              file: {
                filters: ["woff", "woff2", "ttf", "otf"],
              },
            },
          },
        ],
      },
    },
  ],
};

export type FontsDataType = {
  fonts: {
    name: string;
    file: FileInstanceType;
  }[];
};
