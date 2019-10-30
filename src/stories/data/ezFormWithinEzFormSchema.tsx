import { EzValidation } from "ez-validation";
import React from "react";
import { cloneDeep } from "../../cloneDeep";
import { EzFormSchema } from "../../types";
import { EzFormHook } from "../../EzFormHook";

const petSchema = {
  inputs: {
    name: {
      label: "Pets Name",
      required: true,
      type: "text",
      placeholder: "Whats your pet's name",
      "data-testid": "pets-name",
      validate: ({ value }) => value == "I am an error" ? "cow none" : null,
      className: "form-control",
      groupClassName: "form-group"
    },
    age: {
      label: "Age",
      type: "number",
      validate: ({ value }) => EzValidation(value).maxValue(50).errorMessage,
      className: "form-control",
      groupClassName: "form-group col-3"
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
      ],
      className: "form-control",
      groupClassName: "form-group col-3"
    }
  }
}

const PetForm = (props) => {
  const schema: any = cloneDeep(petSchema)

  const { inputs, formReady, addForm, removeForm } = EzFormHook({
    schema,
    onUpdate: (values) => props.updateFormValues(values),
    nestedErrorsManager: props.nestedErrorsManager,
    multiForm: true,
  })

  return (
    <div>
      {
        formReady && inputs.map((inputSet, i) => {
          return (
            <div key={i} className="row m-0">
              {inputSet.name.html}
              {inputSet.age.html}
              {inputSet.type.html}
              <button className="btn btn-danger my-auto" type="button" onClick={() => removeForm(i)} disabled={inputs.length == 1}>- Pet</button>
              {i == inputs.length - 1 && <button className="btn btn-success  my-auto" type="button" onClick={addForm}>+ Pet</button>}
            </div>
          )
        })
      }

    </div>
  )
}

export const ezFormWithinEzFormSchema: EzFormSchema = {
  onSubmit: (vals: any) => { console.log(vals) },
  inputs: {
    name: {
      label: "Name",
      required: true,
      type: "text",
      placeholder: "Whats your name",
      "data-testid": "name",
      className: "form-control col-6",
    },
    pets: {
      label: <h1>Pets</h1>,
      functionalComponent: (props) => <PetForm {...props}></PetForm>
    }
  }
};
