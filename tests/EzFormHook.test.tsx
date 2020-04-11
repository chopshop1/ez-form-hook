import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { EzFormHook } from "../src";
import { nestedSchema, testNestedSchema } from "./testNestedSchema";
import { testSchema, testSchema2, testSchemaInitialValues } from "./testSchema";

afterEach(cleanup);

const TestingComponent = (props: any) => {
  const { form, clearForm, resetForm, addForm, removeForm } = EzFormHook({ ...props })

  return (
    <>
      {form}
      {
        props.showClearButtons &&
        <>
          <button onClick={clearForm}>clearForm</button>
          <button onClick={resetForm}>resetForm</button>
        </>
      }
      {
        props.showAddRemoveButtons &&
        <>
          <button data-testid="addForm" onClick={addForm}>Add Form</button>
          <button data-testid="removeForm" onClick={() => removeForm()}>remove Form</button>
        </>
      }
    </>
  )
}

describe("EzForm Test", () => {
  it("should render child element", () => {
    const { container } = render(
      <TestingComponent schema={testSchema} />
    );
    expect(container.firstChild).toBeDefined();
  });

  it("should render viewMode", () => {
    const { container, getByText } = render(
      <TestingComponent schema={testSchema} initialValues={testSchemaInitialValues} viewModeToggled={true} />
    );

    expect(container.querySelector("input")).toBe(null);
    expect(container.querySelector("button")).toBe(null);
    expect(getByText(testSchemaInitialValues.textarea)).toBeDefined();
  });

  it("should submit form and return values", async () => {
    let isSubmited = false;
    let formValues;
    const onSubmit = (vals: any) => {
      isSubmited = true;
      formValues = vals;
    }

    const { getByText } = render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} />
    );
    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(isSubmited).toBe(true);
    expect(typeof formValues).toBe("object");
  });

  it("initialValues should populate inputs", () => {
    const { getByDisplayValue } = render(
      <TestingComponent schema={testSchema} initialValues={testSchemaInitialValues} />
    );

    let inputs: any = {};
    for (const key of Object.keys(testSchemaInitialValues)) {
      inputs[key] = getByDisplayValue(testSchemaInitialValues[key]);
    }

    for (const key of Object.keys(inputs)) {
      expect(inputs[key]).toBeDefined();
    }
  });

  it("initialValues should validate on load if validateInitialValues is set to true", () => {
    const { getByText } = render(
      <TestingComponent schema={testSchema} initialValues={{ name: "validate" }} />
    );
    const errorMessage = getByText("this is an error");
    expect(errorMessage).toBeDefined();
  });

  it("clearForm should clear form", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }
    const { getByText } = await render(
      <TestingComponent schema={testSchema} initialValues={testSchemaInitialValues} onSubmit={onSubmit} showClearButtons={true} />
    );

    const clearFormButton = getByText("clearForm");
    await fireEvent.click(clearFormButton);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    for (const key of Object.keys(testSchemaInitialValues)) {
      expect(formVals[key]).toEqual("");
    }
  });

  it("resetForm should reset form", async () => {
    console.log("^^^ IGNORE THE ERRORS ABOUT UNCONTROLLED INPUTS, THEY ARE INTENTIONALLY CAUSED BY THIS TEST ^^^")
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }
    const { getByText } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} showClearButtons={true} />
    );

    const resetFormButton = getByText("resetForm");
    await fireEvent.click(resetFormButton);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    for (const key of Object.keys(testSchema.inputs)) {

      if (testSchema.inputs[key].tracked == false || testSchema.inputs[key].onSubmit) {
        continue
      }
      expect(formVals[key]).toEqual(testSchema.inputs[key].initialValue || "");
    }
  });

  it("input should change on change", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} showClearButtons={true} />
    );

    const input = getByTestId(testSchema.inputs.name["data-testid"]);
    fireEvent.change(input, { target: { value: "joe" } });

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.name).toEqual("joe");
  });

  it("checkbox should change on change", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} showClearButtons={true} />
    );

    const input = getByTestId(testSchema.inputs.checkbox["data-testid"]);
    fireEvent.click(input);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.checkbox).toEqual(true);
  });

  it("untracked input should not be in formValues", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }
    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} showClearButtons={true} />
    );

    const input = getByTestId(testSchema.inputs.untracked["data-testid"]);
    fireEvent.change(input, { target: { value: "joe" } });
    fireEvent.blur(input);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.untracked).toBeUndefined();
  });

  it("input should validate on blur", async () => {
    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} />
    );

    const input = getByTestId(testSchema.inputs.name["data-testid"]);
    fireEvent.change(input, { target: { value: "validate" } });
    fireEvent.blur(input);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);
    const errorMessage = getByText("this is an error");

    expect(errorMessage).toBeDefined();
  });

  it("form should not submit when there are errors", async () => {
    let formVals: string = "notSubmited";
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} />
    );

    const input = getByTestId(testSchema.inputs.name["data-testid"]);
    fireEvent.change(input, { target: { value: "validate" } });
    fireEvent.blur(input);

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals).toEqual("notSubmited");
  });

  it("form should not submit if nested form has errors", async () => {
    let formVals: string = "notSubmited";
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testNestedSchema} onSubmit={onSubmit} />
    );

    const input = getByTestId(nestedSchema.inputs.input1["data-testid"]);
    fireEvent.change(input, { target: { value: "error" } });

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals).toEqual("notSubmited");
  });

  it("if feature flag is true it should not be visible", async () => {
    const { queryByTestId } = await render(
      <TestingComponent schema={testSchema} featureFlags={{ featureFlag: false }} />
    );

    expect(queryByTestId(testSchema.inputs.featureFlag["data-testid"])).toBeNull()
  });

  it("form should still submit if not visible input is invalid", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText } = await render(
      <TestingComponent schema={testSchema} initialValues={{ name: "hide me" }} onSubmit={onSubmit} />
    );

    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals).toBeDefined()
  });

  it("add form should add form", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} initialValues={{ name: "hide me" }} onSubmit={onSubmit} multiForm={true} showAddRemoveButtons={true} />
    );

    const addButton = getByTestId("addForm");
    await fireEvent.click(addButton);
    await fireEvent.click(addButton);


    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.length).toBe(3)
  });

  it("remove form should remove form", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} initialValues={{ name: "hide me" }} onSubmit={onSubmit} multiForm={true} showAddRemoveButtons={true} />
    );

    const addButton = getByTestId("addForm");
    const removeButton = getByTestId("removeForm");
    await fireEvent.click(addButton);
    await fireEvent.click(addButton);
    await fireEvent.click(removeButton);


    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.length).toBe(2)
  });

  it("functional component should render", async () => {
    const { getByText } = await render(
      <TestingComponent schema={testSchema2} />
    );
    const component = getByText("i'm a functional component")
    expect(component).toBeDefined()
  });

  it("custom component should render", async () => {
    const { getByText } = await render(
      <TestingComponent schema={testSchema2} />
    );
    const component = getByText("i'm a customComponent")
    expect(component).toBeDefined()
  });

  it("custom validation schema should run, and overwrite schema's validation function", async () => {
    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} validation={{ name: () => "im a new error" }} />
    );

    const input = getByTestId(testSchema.inputs.name["data-testid"]);
    fireEvent.change(input, { target: { value: "validate" } });
    fireEvent.blur(input);
    const error = getByText("im a new error");
    expect(error).toBeDefined();
  });

  it("onChange key on input should overwrite value if function returns a value", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} />
    );
    const input = getByTestId(testSchema.inputs.changeMe["data-testid"]);
    fireEvent.change(input, { target: { value: "validate" } });
    fireEvent.blur(input);
    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.changeMe).toEqual("changed!")
  });

  it("inputs schema onSubmit. Value should be overwritten onSubmit return", async () => {
    let formVals: any;
    const onSubmit = (vals: any) => {
      formVals = vals;
    }

    const { getByText, getByTestId } = await render(
      <TestingComponent schema={testSchema} onSubmit={onSubmit} />
    );
    const input = getByTestId(testSchema.inputs.onSubmitOverwrite["data-testid"]);
    fireEvent.change(input, { target: { value: "validate" } });
    fireEvent.blur(input);
    const submitButton = getByText("Submit");
    await fireEvent.click(submitButton);

    expect(formVals.onSubmitOverwrite).toEqual("overwrite!")
  })
});
