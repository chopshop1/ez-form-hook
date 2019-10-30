import React from "react";
import { SelectOptions } from './types';

export const EzFormField = (props: any) => {
  let input: JSX.Element;

  if (props.type === "textarea") {
    input = <textarea {...props} />;
  } else if (props.type === "select") {
    input = (
      <select {...props}>
        {props.options.map((obj: SelectOptions) => (
          <option key={obj.value} value={obj.value} {...obj}>
            {obj.label}
          </option>
        ))}
      </select>
    );
  } else {
    input = <input {...props} />;
  }

  return input;
};
