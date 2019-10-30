import React, { useState, useEffect } from "react"
import { EzFormHook } from "src"
import { cloneDeep } from "src/cloneDeep"
import { testSchema, testSchemaInitialValues } from "src/stories/data/testSchema"
import { SchemaDoc } from "./components/SchemaDoc"

export const ViewModeComponent = () => {
  let schema = cloneDeep(testSchema)

  const { form, toggleViewMode, viewModeState } = EzFormHook({
    schema,
    viewModeToggled: true,
    featureFlags: { featureFlag: false },
    submitButtonClass: "btn btn-success mt-2 w-25",
    initialValues: testSchemaInitialValues,
    clearFormOnSubmit: false,
    onSubmit: () => {
      toggleViewMode()
    }
  })

  return (
    <div>
      {form}
      <button onClick={toggleViewMode}>{viewModeState ? "Edit Inputs" : "View Mode"}</button>
      <SchemaDoc schema={schema} />
    </div>
  )
}


export default {
  title: 'View Mode',
  component: ViewModeComponent,
};