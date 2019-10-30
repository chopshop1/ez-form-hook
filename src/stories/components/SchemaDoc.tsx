import React from "react"
import JSONPretty from "react-json-pretty";

type SchemaDoc = {
  schema: object
}

export const SchemaDoc = ({ schema }: SchemaDoc) => {
  return (
    <details style={{ cursor: "pointer", }}>
      <summary>Schema:</summary>

      <JSONPretty data={convertValuesToString(schema)}></JSONPretty>
    </details>
  )
};

const convertValuesToString = (schema) => {
  return Object.keys(schema.inputs).reduce((pv: any, inputKey: string) => {
    let input = schema.inputs[inputKey]
    pv[inputKey] = {}
    Object.keys(input).forEach((key, _) => {
      let val = input[key]
      if (typeof val == "function") {
        val = String(val)
      }
      pv[inputKey][key] = val
    })

    return pv
  }, {})
}