import React, { useState } from 'react';
import { cloneDeep } from "../cloneDeep";
import { UniformHook } from "../UniformHook";
import { uniformWithinUniformSchema } from "./data/uniformWithinUniformSchema";
import { SchemaDoc } from './components/SchemaDoc';

export const UniformWithinUniformComponent = () => {
  const schema = cloneDeep(uniformWithinUniformSchema)
  const { form } = UniformHook({ schema })

  return (
    <div>
      {form}
      <SchemaDoc schema={uniformWithinUniformSchema}/>
    </div>
  )
}

export default {
  title: 'Uniform Within Uniform',
  component: UniformWithinUniformComponent,
};