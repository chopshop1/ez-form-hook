import { UniformHook } from "src";
import { cloneDeep } from "src/cloneDeep";
import React, { useState } from 'react';
import "react-json-pretty/themes/monikai.css";
import { SchemaDoc } from './components/SchemaDoc';
import { complexSchema } from "./data/complexSchema";

export const ComplexFormComponent = () => {
  const schema = cloneDeep(complexSchema)
  const [bg, setBg] = useState("grey")

  const onChange = ({ values }) => {
    switch (values[0].gender) {
      case "male":
        return setBg("lightblue")
      case "female":
        return setBg("pink")
      default:
        return setBg("grey")
    }
  }

  const { form } = UniformHook({ schema, onChange })

  return (
    <>
      <h2>Form:</h2>

      <div style={{ backgroundColor: bg }}>
        {form}
      </div>

      <SchemaDoc schema={schema} />
    </>
  )
}

export default {
  title: 'Complex Form',
  component: ComplexFormComponent,
};