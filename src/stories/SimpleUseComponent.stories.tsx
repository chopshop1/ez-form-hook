import React from "react"
import { simpleSchema } from "src/stories/data/schema"
import { EzFormHook } from "src/EzFormHook"
import { SchemaDoc } from "./components/SchemaDoc"

export const SimpleUseComponent = () => {
  const { form, values, clearForm } = EzFormHook({ schema: simpleSchema, submitButtonClass: "btn btn-success mt-2 w-50" })

  return (
    <div>
      {form}
      <button className="btn btn-warning" onClick={clearForm}> clear Form</button>
      <SchemaDoc schema={simpleSchema} />
    </div >
  )
}


export default {
  title: 'Simple Form',
  component: SimpleUseComponent,
};