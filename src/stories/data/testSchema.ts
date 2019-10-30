import InputMask from "react-input-mask";
import { EzFormSchema } from "src/types";

export const testSchema: EzFormSchema = {
  onSubmit: (vals: any) => { console.log(vals) },
  inputs: {
    name: {
      label: "name",
      initialValue: "my name is",
      required: false,
      type: "text",
      placeholder: "name",
      validate: (val: any) => {
        if (val === "validate") {
          return "this is an error";
        }
      },
      onBlur: () => null,
      onChange: () => null,
      onSubmit: () => { },
      "data-testid": "name",
      className: "form-control col-md-6",
      groupClassName: "form-group"
    },
    length: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "length",
      required: true,
      type: "number",
      placeholder: "length of package"
    },
    selectIt: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "select",
      required: true,
      type: "select",
      options: [{ label: "true", value: true }, { label: "false", value: false }]
    },
    textarea: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "textarea",
      required: true,
      type: "textarea",
      initialValue: "im am a textarea"
    },
    customComponent: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "custom component",
      required: true,
      mask: "9999-99-99",
      maskChar: null,
      customComponent: InputMask
    },
    visibleIf: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      visibleIf: ({ values }) => values.name === "my name is",
      label: "visible if",
      required: false,
      type: "text",
      placeholder: "visibleIf"
    },
    untracked: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "untracked",
      required: false,
      type: "text",
      untracked: true,
      placeholder: "visibleIf",
      "data-testid": "untracked"
    },
    featureFlag: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "featureFlag",
      required: false,
      type: "text",
      placeholder: "featureFlag",
      initialValue: "featureFlag",
      "data-testid": "featureFlag",
      featureFlag: "featureFlag",
    },
    checkbox: {
      className: "form-control col-md-6",
      groupClassName: "form-group",
      label: "check",
      type: "checkbox"
    }
  }
};

export const testSchemaInitialValues: any = {
  selectIt: "false",
  textarea: "im an area of text"
};
