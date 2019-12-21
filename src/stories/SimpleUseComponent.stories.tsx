import React from "react"
import { simpleSchema } from "src/stories/data/schema"
import { UniformHook } from "src/UniformHook"
import { SchemaDoc } from "./components/SchemaDoc"

export const SimpleUseComponent = () => {
  const { form, values, clearForm } = UniformHook({ schema: simpleSchema })

  return (
    <div>
      {form}
      <button onClick={clearForm}> clear Form</button>
      <SchemaDoc schema={simpleSchema} />
    </div >
  )
}


export default {
  title: 'Simple Form',
  component: SimpleUseComponent,
};