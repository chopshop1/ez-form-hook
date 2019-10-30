import { EzValidation } from "ez-validation";
import React from "react";
import { cloneDeep } from "../../cloneDeep";
import { UniformSchema } from "../../types";
import { UniformHook } from "../../UniformHook";

const petSchema = {
  inputs: {
    name: {
      label: "Pets Name",
      required: true,
      type: "text",
      placeholder: "Whats your pet's name",
      "data-testid": "pets-name",
      validate: ({ value }) => value == "I am an error" ? "cow none" : null
    },
    age: {
      label: "age",
      type: "number",
      validate: ({ value }) => EzValidation(value).maxValue(50).errorMessage
    },
    type: {
      label: "Pet type",
      type: "select",
      options: [
        { label: "What kind of pet do you have?", selected: true, hidden: true },
        { label: "dog", value: "dog" },
        { label: "cat", value: "cat" },
        { label: "turtle", value: "turtle" },
        { label: "frog", value: "frog" },
      ]
    }
  }
}

const PetForm = (props) => {
  const schema: any = cloneDeep(petSchema)

  const { inputs, formReady } = UniformHook({
    schema,
    onBlur: ({ rowValues }) => props.updateFormValues(rowValues),
    nestedErrorsManager: props.nestedErrorsManager
  })

  return (
    <div>
      {
        formReady && inputs.map((inputSet, i) => {
          return (
            <div key={i}>
              {inputSet.name.html}
              {inputSet.age.html}
              {inputSet.type.html}
            </div>
          )
        })
      }
    </div>
  )
}

export const uniformWithinUniformSchema: UniformSchema = {
  onSubmit: (vals: any) => { console.log(vals) },
  inputs: {
    name: {
      label: "Name",
      required: true,
      type: "text",
      placeholder: "Whats your name",
      "data-testid": "name"
    },
    pets: {
      label: "Pets",
      functionalComponent: (props) => <PetForm {...props}></PetForm>
    }
  }
};
