import React from "react"
import { cloneDeep } from "src/cloneDeep"
import { simpleSchema } from "src/stories/data/schema"
import { EzFormSchema } from "src/types"
import { EzFormHook } from "src/EzFormHook"
import { SchemaDoc } from "./components/SchemaDoc"

let count = 350
let schema: EzFormSchema = cloneDeep(simpleSchema)
for (let key in [...new Array(count)]) {
  schema.inputs[`cow${key}`] = simpleSchema.inputs.cow
}

export const MassRenderComponent = () => {
  const { form, addForm, removeForm, formLength } = EzFormHook({ schema })

  return (
    <div>
      <p>renders {count} inputs</p>
      {form}
      <button onClick={addForm}>Add Form</button>
      <button onClick={() => removeForm(formLength)}>Remove Form</button>

      <SchemaDoc schema={schema} />
    </div>
  )
}

export default {
  title: 'Mass Render',
  component: MassRenderComponent,
};