import InputMask from "react-input-mask";
import { UniformSchema } from "src/types";

export const testSchema: UniformSchema = {
  onSubmit: (vals: any) => { console.log(vals) },
  inputs: {
    name: {
      label: "name",
      initialValue: "my name is",
      required: false,
      type: "text",
      placeholder: "name",
      validate: (val: any) => {
        if (val == "validate") {
          return "this is an error";
        }
      },
      onBlur: () => null,
      onChange: () => null,
      onSubmit: () => { },
      "data-testid": "name"
    },
    length: {
      label: "length",
      required: true,
      type: "number",
      placeholder: "length of package"
    },
    selectIt: {
      label: "select",
      required: true,
      type: "select",
      options: [{ label: "true", value: true }, { label: "false", value: false }]
    },
    textarea: {
      label: "textarea",
      required: true,
      type: "textarea",
      initialValue: "im am a textarea"
    },
    customComponent: {
      label: "custom component",
      required: true,
      mask: "9999-99-99",
      maskChar: null,
      customComponent: InputMask
    },
    visibleIf: {
      visibleIf: ({ values }) => values.name == "my name is",
      label: "visible if",
      required: false,
      type: "text",
      placeholder: "visibleIf"
    },
    untracked: {
      label: "untracked",
      required: false,
      type: "text",
      untracked: true,
      placeholder: "visibleIf",
      "data-testid": "untracked"
    },
    featureFlag: {
      label: "featureFlag",
      required: false,
      type: "text",
      placeholder: "featureFlag",
      initialValue: "featureFlag",
      "data-testid": "featureFlag",
      featureFlag: "featureFlag",
    },
    checkbox: {
      label: "check",
      type: "checkbox"
    }
  }
};

export const testSchemaInitialValues: any = {
  selectIt: "false",
  textarea: "im an area of text"
};
