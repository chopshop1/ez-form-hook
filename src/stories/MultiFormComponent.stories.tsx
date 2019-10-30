import React from 'react';
import { EzFormHook } from "src/EzFormHook";
import { simpleSchema, simpleSchemaInitialValues } from './data/schema';
import { SchemaDoc } from './components/SchemaDoc';

export const MultiFormComponent = () => {
  const { form, addForm, removeForm, clearForm, resetForm, submitButton } = EzFormHook({ schema: simpleSchema, initialValues: simpleSchemaInitialValues, multiForm: true, submitButtonClass: "btn btn-success mt-2 w-50", showSubmitButton: false })

  return (
    <div>
      {form}
      <div className="row">
        <button className="btn btn-info col-md-2" onClick={addForm}>Add Form</button>
        <button className="btn btn-danger col-md-2" onClick={() => removeForm()}>Remove Form</button>
      </div>
      <div className="row mt-2">
        <button className="btn btn-warning col-md-2" onClick={clearForm}> Clear Form</button>
        <button className="btn btn-warning col-md-2" onClick={resetForm}> Reset Form</button>
      </div>

      {submitButton}
      <SchemaDoc schema={simpleSchema} />
    </div>
  )
}

export default {
  title: 'Multi Form',
  component: MultiFormComponent,
};