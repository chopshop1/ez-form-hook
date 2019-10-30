import React from "react";
import InputMask from "react-input-mask";
import { EzFormSchema } from "../src/types";

export const testSchema: EzFormSchema = {
  inputs: {
    name: {
      label: "name",
      initialValue: "my name is",
      required: false,
      type: "text",
      placeholder: "name",
      validate: ({ value }) => {
        if (value == "validate") {
          return "this is an error";
        }
      },
      visibleIf: ({ value }) => (value !== "hide me"),
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
      customComponent: InputMask
    },
    visibleIf: {
      visibleIf: ({ values }) => values.name == "my name is",
      label: "visible if",
      required: false,
      type: "text",
      placeholder: "visibleIf",
      untracked: true
    },
    untracked: {
      label: "untracked",
      required: false,
      type: "text",
      untracked: 'true',
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
      type: "checkbox",
      label: "checkbox",
      "data-testid": "checkbox"
    },
    changeMe: {
      type: "input",
      label: "change me",
      onChange: () => "changed!",
      "data-testid": "changeMe",
    }
  }
};

export const testSchemaInitialValues: any = {
  selectIt: "false",
  textarea: "im an area of text",
};


const customComponent = ({ value }: any) => {
  return (
    <h1>{value}</h1>
  )
}

export const testSchema2: EzFormSchema = {
  inputs: {
    functionalComponent: {
      label: "functional component",
      initialValue: "i'm a functional component",
      functionalComponent: ({ value }) => <h1>{value}</h1>
    },
    customComponent: {
      label: "custom component",
      initialValue: "i'm a customComponent",
      customComponent: customComponent
    }
  }
}
