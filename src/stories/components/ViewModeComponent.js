import React from "react"
import { cloneDeep } from "src/cloneDeep"
import { testSchema, testSchemaInitialValues } from "src/stories/data/testSchema"
import { UniformHook } from "src/UniformHook"

export const ViewModeComponent = () => {
  let schema = cloneDeep(testSchema)

  const { form, formLength, toggleViewMode } = UniformHook({ schema, viewModeToggled: true, initialValues: testSchemaInitialValues, featureFlags: { featureFlag: false } })

  return (
    <div>
      {form}
      <button onClick={toggleViewMode}>Toggle View Mode</button>
    </div>
  )
}