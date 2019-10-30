import React from "react"
import { UniformHook } from "../src";
import { UniformSchema, FunctionalComponentArguments } from "../src/types";

export const testNestedSchema: UniformSchema = {
  inputs: {
    name: {
      label: "name",
      initialValue: "my name is",
      required: false,
      type: "text",
      placeholder: "name",
      "data-testid": "name"
    },
    nestedForm: {
      label: "nested",
      functionalComponent: (props: FunctionalComponentArguments) => <NestedForm {...props}></NestedForm>
    }
  }
};

export const nestedSchema: UniformSchema = {
  inputs: {
    input1: {
      label: "input 1",
      type: "text",
      "data-testid": "input1",
      validate: ({ value }) => value === "error" ? "error" : null
    },
    input2: {
      label: "input 2",
      type: "text",
      initialValue: "error",
      validate: ({ value }) => value === "error" ? "error" : null
    },
  },
}

const NestedForm = (props: any) => {
  const { form } = UniformHook({ schema: nestedSchema, submitButton: null, ...props })
  return (<>{form}</>)
}

