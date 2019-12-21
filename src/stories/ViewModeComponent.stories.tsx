import React, { useState } from "react"
import { UniformHook } from "src"
import { cloneDeep } from "src/cloneDeep"
import { testSchema, testSchemaInitialValues } from "src/stories/data/testSchema"
import { SchemaDoc } from "./components/SchemaDoc"

export const ViewModeComponent = () => {
  let schema = cloneDeep(testSchema)

  const { form, toggleViewMode, addForm } = UniformHook({ schema, viewModeToggled: true, initialValues: testSchemaInitialValues, featureFlags: { featureFlag: false } })

  return (
    <div>
      {form}
      <button onClick={toggleViewMode}>Toggle View Mode</button>
      <SchemaDoc schema={schema} />
    </div>
  )
}


export default {
  title: 'View Mode',
  component: ViewModeComponent,
};