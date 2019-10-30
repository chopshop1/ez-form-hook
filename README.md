### EzForm Hook

EzFormly generates a form from a schema with on the fly customizability!

[![NPM downloads](https://img.shields.io/npm/v/ez-form-hook.svg)](https://www.npmjs.com/package/ez-form-hook)
[![NPM downloads](https://img.shields.io/npm/dt/ez-form-hook.svg)](https://www.npmjs.com/package/ez-form-hook)
[![NPM downloads](https://img.shields.io/bundlephobia/minzip/ez-form-hook)](https://img.shields.io/bundlephobia/minzip/ez-form-hook)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Why?

- helps save time writing complex forms
- allows you to easily share inputs with other forms
- allows teams to stay consistent with forms
- handles the repetitive dull parts of creating a form for you!

## Hook props:

| Prop                  | Type       | Required | Description                                                                                                                               |
| --------------------- | ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| submitButton          | `JSX`      | false    | submit button to submit form EX: `<button type="submit">custom submit</button>`                                                           |
| onSubmit              | `Function` | false    | triggers on submit button click and returns all values                                                                                    |
| onUpdate              | `Function` | false    | triggers formValues update                                                                                                                |
| onChange              | `Function` | false    | triggers on input change and returns all values                                                                                           |
| onBlur                | `Function` | false    | triggers on input blur and returns all values                                                                                             |
| nestedErrorsManager   | `Function` | false    | used when using a nested form                                                                                                             |
| schema                | `Object`   | true     | schema based off what form is generated from                                                                                              |
| validation            | `Object`   | false    | overwrites the `schema`'s validation function for an input (extremely useful when wanting to share a validation schema with other things) |
| initialValues         | `Object`   | false    | maps the initial values to schema                                                                                                         |
| featureFlags          | `Object`   | false    | just a object of feature flags                                                                                                            |
| validateInitialValues | `Boolean`  | false    | validates initial values once form loads                                                                                                  |
| validateOnChange      | `Boolean`  | false    | validates input on change (default is `true`)                                                                                             |
| disabled              | `Boolean`  | false    | disables inputs if true                                                                                                                   |
| multiForm             | `Boolean`  | false    | allows you to create a multi form                                                                                                         |
| clearFormOnSubmit     | `Boolean`  | false    | clear form on submit                                                                                                                      |
| viewModeToggled       | `Boolean`  | false    | toggles `viewMode` in schema on initial render                                                                                            |
| showSubmitButton      | `Boolean`  | false    | disables the automatic render of the submit button                                                                                        |
| viewModeFallbackText  | `String`   | false    | passes fallback `viewMode` text when value is null or undefined. Default is "N/A"                                                         |
| submitButtonText      | `String`   | false    | replaces text on the submit button                                                                                                        |
| submitButtonClass     | `String`   | false    | passes css classes down to the submit button                                                                                              |
| className             | `String`   | false    | passes css classes down to the main form component                                                                                        |
| errorClass            | `String`   | false    | passes css class to error message                                                                                                         |

## Component Example:

```javascript
import { EzFormHook } from "ez-form-hook";
const schema = {
  inputs: {
    name: {
      label: "name",
      required: false,
      type: "text",
      placeholder: "Whats your name"
    },
    age: {
      label: "Age",
      required: true,
      type: "number",
      placeholder: "Whats your age?"
    },
    favoriteColor: {
      label: "favoriteColor",
      placeholder: "Favorite color",
      options: [
        { value: "green", label: "green" },
        { value: "red", label: "red" },
        { value: "blue", label: "blue" }
      ]
    }
  }
};

const Form = () => {
  const onSubmit = values => {
    console.log(values);
  };

  const { form } = EzFormHook({ schema, onSubmit });

  return <div>{form}</div>;
};
```

```javascript
// More complex example

const Form = () => {
  const onSubmit = values => {
    console.log(values);
  };
  const customSubmitButton = <button type="submit">My Custom Submit</button>;

  const { form, clearForm, addFields, removeFields } = EzFormHook({
    schema,
    onSubmit,
    submitButton: customSubmitButton
  });

  return (
    <div>
      {form}
      <button onClick={clearForm}>Clear Form</button>
      <button onClick={addFields}>Add Fields</button>
      <button onClick={removeFields}>Remove Fields</button>
    </div>
  );
};
```

## Schema Format:

| Key                 | Type                 | Default | Description                                                                                                                                       |
| ------------------- | -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| validate            | `Function`           | null    | uses this function to validate input                                                                                                              |
| visibleIf           | `Function`           | null    | adds ability to check if certain criteria is met and then make the input visible if it is                                                         |
| onSubmit            | `Function`           | null    | on submit run mutation function and return value (Will not run function if value is empty)                                                        |
| label               | `String`             | null    | text in input label                                                                                                                               |
| initialValue        | `any`                | null    | sets initial value of input                                                                                                                       |
| type                | `String`             | null    | input type: https://www.w3schools.com/html/html_form_input_types.asp                                                                              |
| placeholder         | `String`             | null    | sets input placeholder                                                                                                                            |
| featureFlag         | `String`             | null    | feature flag input is associated with                                                                                                             |
| required            | `Boolean / Function` | false   | sets input as required                                                                                                                            |
| clearFormOnSubmit   | `Boolean`            | true    | set to false if you don't want inputs to clear after submit                                                                                       |
| tracked             | `Boolean`            | true,   | allows you to disable value tracking on the input                                                                                                 |
| customComponent     | `JSX`                | null    | allows you to put whatever `JSX` you'd like to put in form                                                                                        |
| functionalComponent | `JSX`                | null    | allows you to put whatever `Functional Component` you'd like to put in form                                                                       |
| viewModeComponent   | `Function`           | null    | allows you to put whatever `Component` below the label you'd like to render when `viewMode` is toggled `value and values, get passed to function` |
| viewModeClass       | `Function`           | null    | class put onto the viewMode Text                                                                                                                  |
| prependHtml         | `JSX`                | null    | append html after the input                                                                                                                       |
| options             | `Array`              | null    | converts input to select box options rendered from `Array` `[{value: true, label: "yes"}, { value: false, label: 'no' }]`                         |
| ...ETC              | `ANY`                | null    | Anything else you add to schema get passed to the inputs as a prop                                                                                | s |

## Schema Example:

```javascript
import { EzValidation } from "ez-validation";
schema = {
  inputs: {
    name: {
      label: "name",
      initialValue: "Whats your name",
      validate: (val, vals) =>
        EzValidation(val)
          .isString()
          .minLength(2).errorMessage,
      required: false,
      onSubmit: (val, vals) => {
        if (val.length > 10) {
          return val + " Thats a long Name";
        }
      },
      type: "text",
      placeholder: "name"
    },
    length: {
      label: "length",
      required: true,
      type: "number",
      placeholder: "length of package"
    },
    moneyMoney: {
      label: "Money Money",
      placeholder: "How much you got?",
      type: "text",
      prependHtml: (
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            $
          </span>
        </div>
      )
    },
    lengthIfOne: {
      label: "length if one",
      visibleIf: values => values["length"] === "1",
      required: true,
      type: "number",
      placeholder: "length"
    },
    selectMulti: {
      label: "selectMulti",
      type: "multiSelect",
      placeholder: "Favorite Color",
      isMulti: true,
      required: true,
      customComponent: Select,
      options: [
        { value: 1, label: "One" },
        { value: 2, label: "Two" },
        { value: 3, label: "Three" }
      ]
    },
    favoriteColor: {
      label: "favoriteColor",
      placeholder: "Favorite color",
      options: [
        { value: "green", label: "green" },
        { value: "red", label: "red" },
        { value: "blue", label: "blue" }
      ]
    },
    masked: {
      label: "masked",
      placeholder: "masked",
      required: true,
      customComponent: InputMask,
      mask: "9999-99-99",
      maskChar: null
    },
    description: {
      label: "description",
      placeholder: "description",
      required: false,
      type: "textarea"
    }
  }
};
```
