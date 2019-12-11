import React, { useState } from 'react';
import { cloneDeep } from "../../cloneDeep";
import { UniformHook } from "../../UniformHook";
import { complexSchema } from "../data/complexSchema";

export const ComplexFormComponent = () => {
  const schema = cloneDeep(complexSchema)
  const [bg, setBg] = useState("grey")

  const onChange = ({ values }) => {
    const color = values[0].gender == "male" ? "lightblue" : "pink"
    setBg(color)
  }

  const { form, formValues } = UniformHook({ schema, onChange })

  return (
    <div style={{ backgroundColor: bg }}>
      {form}
    </div>
  )
}