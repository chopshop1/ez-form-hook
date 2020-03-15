import React from 'react';
import { cloneDeep } from "../cloneDeep";
import { EzFormHook } from "../EzFormHook";
import { SchemaDoc } from './components/SchemaDoc';
import { ezFormWithinEzFormSchema } from "./data/ezFormWithinEzFormSchema";

export const EzFormWithinEzFormComponent = () => {
  const schema = cloneDeep(ezFormWithinEzFormSchema)
  const { form } = EzFormHook({
    schema,
    clearFormOnSubmit: false,
    submitButtonClass: "btn btn-success mt-2 w-25"
  })

  return (
    <div className="container">
      {form}
      <SchemaDoc schema={ezFormWithinEzFormSchema} />
    </div>
  )
}

export default {
  title: 'EzForm Within EzForm',
  component: EzFormWithinEzFormComponent,
};