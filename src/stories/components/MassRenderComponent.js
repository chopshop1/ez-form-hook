import React from "react"
import { cloneDeep } from "src/cloneDeep"
import { simpleSchema } from "src/stories/data/schema"
import { UniformSchema } from "src/types"
import { UniformHook } from "src/UniformHook"

let count = 250
let schema: UniformSchema = cloneDeep(simpleSchema)
for (let key in [...new Array(count)]) {
  schema.inputs[`cow${key}`] = {
    label: "cow",
    type: "text"
  }
}

export const MassRenderComponent = () => {
  const { form, addForm, removeForm, formLength } = UniformHook({ schema })

  return (
    <div>
      <p>renders {count} inputs</p>
      {form}
      <button onClick={addForm}>Add Form</button>
      <button onClick={() => removeForm(formLength)}>Remove Form</button>
    </div>
  )
}