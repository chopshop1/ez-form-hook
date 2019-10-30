import { UniformSchema, CallbackArguments } from '../../types';

export const complexSchema: UniformSchema = {
  onSubmit: (vals: any) => console.log(vals),
  inputs: {
    name: {
      required: true,
      label: "Name",
      type: "text",
      validate: ({ value }: CallbackArguments) => {
        if (value === "") {
          return "value is required"
        }
      }
    },
    gender: {
      required: true,
      label: "Gender",
      type: "select",
      options: [
        { label: "Select a gender", value: "Select a gender", hidden: true },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      validate: ({ value }: CallbackArguments) => {
        if (!value) {
          return "value is required"
        }
      }
    },
    favoriteColor: {
      required: true,
      label: "Favorite Color",
      type: "text",
      visibleIf: ({ rowValues }: CallbackArguments) => {
        return rowValues.gender === "male"
      }
    },
    favoriteAnimal: {
      required: true,
      label: "Favorite Animal",
      type: "text",
      visibleIf: ({ rowValues }: CallbackArguments) => rowValues.gender === "female"
    }

  }

}