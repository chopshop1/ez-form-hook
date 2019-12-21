import React from "react"
import JSONPretty from "react-json-pretty";

type SchemaDoc = {
  schema: object
}

export const SchemaDoc = ({ schema }: SchemaDoc) => {
  return (
    <details style={{ cursor: "pointer", }}>
      <summary>Schema:</summary>
      <JSONPretty data={schema}></JSONPretty>
    </details>
  )
};