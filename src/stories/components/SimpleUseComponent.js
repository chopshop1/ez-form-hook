import React from "react"
import { simpleSchema } from "src/stories/data/schema"
import { UniformHook } from "src/UniformHook"

export const SimpleUseComponent = () => {
  const { form, values, clearForm } = UniformHook({ schema: simpleSchema })

  return (
    <div>
      {form}
      <button on onClick={clearForm}> clear Form</button>
    </div >
  )
}