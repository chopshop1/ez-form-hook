import React from 'react';
import { UniformHook } from "src/UniformHook";
import { simpleSchema, simpleSchemaInitialValues } from '../data/schema';

export const MultiFormComponent = () => {
  const { form, addForm, removeForm, clearForm, resetForm } = UniformHook({ schema: simpleSchema, initialValues: simpleSchemaInitialValues, multiForm: true })

  return (
    <div>
      {form}
      <button onClick={addForm}>Add Form</button>
      <button onClick={() => removeForm()}>Remove Form</button>
      <button onClick={clearForm}> clear Form</button>
      <button onClick={resetForm}> reset Form</button>
    </div>
  )
}