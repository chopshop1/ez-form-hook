import React from "react"
import { EzFormHook } from "src/EzFormHook"
import { simpleSchema } from "src/stories/data/schema"
import { SchemaDoc } from "./components/SchemaDoc"

export const DynamicSchemaComponent = () => {
  let { form, clearForm, ezSchema, updateSchema } = EzFormHook({ schema: simpleSchema, submitButtonClass: "btn btn-success mt-2 w-50" })

  const removeInput = () => {
    let tempSchema = ezSchema
    delete tempSchema.inputs.cow
    updateSchema(tempSchema)
  }

  const addInput = () => {
    let tempSchema = ezSchema
    tempSchema.inputs.cow = simpleSchema.inputs.cow
    updateSchema(tempSchema)
  }

  return (
    <div>
      {form}
      <button className="btn btn-success" disabled={ezSchema.inputs.cow} onClick={addInput}>Add Cow Input</button>
      <button className="btn btn-warning" disabled={!ezSchema.inputs.cow} onClick={removeInput}>Remove Cow Input</button>
      <button className="btn btn-warning" onClick={clearForm}>Clear Form</button>
      <SchemaDoc schema={ezSchema} />
    </div >
  )
}


export default {
  title: 'Dynamic Schema Form',
  component: DynamicSchemaComponent,
};