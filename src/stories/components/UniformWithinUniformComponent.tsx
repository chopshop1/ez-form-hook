import React, { useState } from 'react';
import { cloneDeep } from "../../cloneDeep";
import { UniformHook } from "../../UniformHook";
import { uniformWithinUniformSchema } from "../data/uniformWithinUniformSchema";

export const UniformWithinUniformComponent = () => {
  const schema = cloneDeep(uniformWithinUniformSchema)
  const { form } = UniformHook({ schema })

  return (
    <div>
      {form}
    </div>
  )
}