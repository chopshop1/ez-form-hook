import React, { useEffect, useState } from "react";
import { cloneDeep } from './cloneDeep';
import { convertToArray } from './convertToArray';
import { omitArray } from './omitArray';
import { removeKeys } from './removeKeys';
import { FunctionalComponentArguments, UniformHookProps, UniformInput } from "./types";
import { UniformField } from './UniformField';

export const UniformHook = ({
  schema,
  onSubmit,
  onChange,
  onBlur,
  errorClass = "null",
  featureFlags,
  nestedErrorsManager,
  className,
  initialValues = [],
  validateInitialValues = true,
  validateOnChange = true,
  disabled = false,
  multiForm = false,
  viewModeToggled = false,
  viewModeFallbackText = "N/A",
  submitButton = <button type="submit" disabled={disabled}>submit</button>
}: UniformHookProps) => {
  const [uniformInitialValues, setUniformInitialValues] = useState<any>(cloneDeep(initialValues))
  const [formReady, setFormReady] = useState<boolean>(false);
  const [formLength, setFormLength] = useState<number>(0);
  const [errors, setErrors] = useState<any[]>([{}]);
  const [hasNestedErrors, setHasNestedErrors] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any[]>([{}]);
  const [inputs, setInputs] = useState<any>([{}]);
  const [viewMode, setViewMode] = useState(viewModeToggled)

  useEffect(() => {
    const initFormLength = initialValues.length || 1
    // the || 1 is used for initial values that are not for multiForms
    initForm(initFormLength)
    setFormLength(initFormLength)
  }, [])

  useEffect(() => {
    generateInputs()
  }, [formValues, formLength, viewMode])

  const initForm = async (initFormLength?: number) => {
    let initialFormValues: any = [] // TODO: type correctly
    let initialErrors: any = [] // TODO: type correctly
    let tempFormLength = 0

    for (const formIndex in [...new Array(initFormLength || formLength)]) {
      tempFormLength = tempFormLength + 1
      initialFormValues.push({})
      initialErrors.push({})
      initialFormValues[formIndex] = generateFormValues(formIndex)
    }

    setFormLength(tempFormLength)
    setFormValues(initialFormValues)

    if (validateInitialValues && initialValues.length !== 0) {
      validateForm(initialErrors, initialFormValues)
    } else {
      setErrors(initialErrors)
    }
  }

  const generateInputs = () => {
    let inputs: any/* TODO: type correctly */ = []

    for (let formIndex = 0; formIndex < formLength; formIndex++) {
      inputs.push({})
      for (const inputKey of Object.keys(schema.inputs)) {
        inputs[formIndex][inputKey] = inputGenerator(inputKey, formIndex)
      }
    }

    setInputs(inputs)
    setFormReady(true)
  }

  const generateFormValues = (formIndex: any /*TODO: type correctly*/) => {
    let values: any = {}
    let tempInitialValues = convertToArray(uniformInitialValues)

    for (const inputKey of Object.keys(schema.inputs)) {
      if (schema.inputs[inputKey].untracked) {
        //skips untracked inputs
        continue
      }
      const uniformInitialValueProp = tempInitialValues && tempInitialValues[formIndex] && tempInitialValues[formIndex][inputKey]

      values[inputKey] =
        uniformInitialValueProp
        || schema.inputs[inputKey].initialValue
        || ''
    }

    return values
  }

  const hasErrors = () => {
    let hasErrors = false;
    for (const error of errors) {
      if (Object.entries(error)[0]) {
        hasErrors = true
        break;
      }
    }
    return hasErrors
  }

  const inputGenerator = (inputKey: string, formIndex: number) => {
    const input: UniformInput = schema.inputs[inputKey];
    const reactInputKey: string = `${inputKey}-${formIndex}`
    const visible: boolean | undefined = input.visibleIf && !input.visibleIf({ value: formValues[formIndex][inputKey], rowValues: formValues[formIndex], values: formValues, formIndex })
    const featureFlag = featureFlags && input.featureFlag && !featureFlags[input.featureFlag]
    const InputComponent = input.customComponent || UniformField

    const returnObject: any = {
      key: reactInputKey,
      viewMode: null,
      label: null,
      element: null,
      error: null
    }

    if (visible || featureFlag) {
      let values = [...formValues];
      delete values[formIndex][inputKey]

      return returnObject
    }

    const updateFormValues = (inputValue: any) => {
      if (schema.inputs[inputKey].untracked) {
        return null
      }
      let values = [...formValues];

      values[formIndex] = { ...values[formIndex], [inputKey]: inputValue }

      if (validateOnChange) {
        let tempErrors = [...errors];
        const validationValue = validateInput(input, values, formIndex, inputKey)

        if (validationValue) {
          tempErrors[formIndex][inputKey] = validationValue
          nestedErrorsManager && nestedErrorsManager(true)
        }

        if (tempErrors[formIndex][inputKey] && !validationValue) {
          delete tempErrors[formIndex][inputKey]
          if (nestedErrorsManager && !hasErrors()) {
            nestedErrorsManager(false)
          }
        }

        setErrors(tempErrors)
      }

      onChange && onChange({ value: inputValue, rowValues: values[formIndex], values, formIndex })

      setFormValues(values);
    }

    const onInputChange = ({ target, values }: any) => {
      const customChangeFunctionValue = input.onChange && input.onChange(target.value, formValues[formIndex], formValues)
      let inputValue;

      if (target && input.type === "checkbox") {
        inputValue = customChangeFunctionValue || target.checked
      } else if (target) {
        inputValue = customChangeFunctionValue || target.value
      } else {
        inputValue = values
      }

      updateFormValues(inputValue)
    };

    const onInputBlur = ({ target }: any) => {
      onBlur && onBlur({ value: target.value, rowValues: formValues[formIndex], values: formValues, formIndex })
      updateFormValues(target.value)
    }

    if (input.functionalComponent) {
      const params: FunctionalComponentArguments = {
        updateFormValues: (value: any) => {
          const vals = value.rowValues || value
          updateFormValues(vals)
        },
        onBlur: onInputBlur,
        inputKey,
        initialValues,
        formIndex,
        value: formValues[formIndex][inputKey],
        nestedErrorsManager: (errorState: boolean) => {
          setHasNestedErrors(errorState)
        }
      }
      returnObject.element = input.functionalComponent(params)
    } else {
      returnObject.element = (
        <>
          {input.prependHtml}
          <InputComponent
            key={reactInputKey}
            name={inputKey}
            type={input.type}
            onChange={onInputChange}
            onBlur={onInputBlur}
            value={formValues[formIndex][inputKey]}
            {...removeKeys(input, omitArray)}
          />
          {input.appendHtml}
        </>
      );
    }

    returnObject.error = errors[formIndex][inputKey] && input.errorComponent ? (
      input.errorComponent({ error: errors[formIndex], errors: errors[formIndex], formIndex })
    ) : (
        <div
          className={`${inputKey in errors[formIndex] && "uniform-error"} ${errorClass}`}
        >
          {errors[formIndex][inputKey]}
        </div>
      );

    returnObject.label = typeof input.label === "string" ? (
      <label htmlFor={inputKey}>
        {input.label}
        {input.required && " *"}
      </label>
    ) : (
        input.label
      );

    returnObject.viewMode = input.viewModeComponent ? (
      <div className={input.groupClassName}>
        {returnObject.label}
        {input.viewModeComponent(formValues[formIndex][inputKey], formValues[formIndex])}
      </div>
    ) : (
        <>
          <div className={input.groupClassName}>
            {returnObject.label}
            <div className={input.viewModeClass}>{_getValueAsString(inputKey, formIndex)}</div>
          </div>
        </>
      )

    returnObject.html =
      <>
        {viewMode && returnObject.viewMode}
        {!viewMode && returnObject.label}
        {!viewMode && returnObject.element}
        {!viewMode && returnObject.error}
      </>

    return returnObject;
  }

  const form = (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        const formHasErrors: boolean = validateForm()

        if (!formHasErrors && !hasNestedErrors) {
          let values = cloneDeep(formValues);

          for (const index in values) {
            for (let key of Object.keys(schema.inputs)) {
              if (schema.inputs[key].onSubmit) {
                values[index][key] =
                  // @ts-ignore its checking if onSubmit function exists  above, but its still failing
                  schema.inputs[key].onSubmit(
                    values[index][key],
                    values[index]
                  );
              }
            }
          }
          values = multiForm ? formValues : formValues[0]
          onSubmit && onSubmit(values)
          schema.onSubmit && schema.onSubmit(values)
        }
      }}
    >
      {
        inputs.map((input: any) => (
          Object.keys(input).map((inputKey: any, index: number) => {
            return (
              <div key={input[inputKey].key + index}> {/* TODO: make unique keys */}
                {viewMode && input[inputKey].viewMode}
                {!viewMode && input[inputKey].html}
              </div>
            );
          })
        ))
      }
      {!viewMode && submitButton}
    </form>
  );

  const validateInput = (input: any, values: any, formIndex: any, inputKey: string)/* TODO: Type correctly */ => input.validate && input.validate({ value: values[formIndex][inputKey], values: values, rowValues: values[formIndex], formIndex })

  const validateForm = (initialErrors = errors, initialFormValues = formValues) => {
    let tempErrors = [...initialErrors]
    let hasErrors = false

    for (const formIndex in initialFormValues) {
      for (const inputKey in initialFormValues[formIndex]) {
        const input: UniformInput = schema.inputs[inputKey];

        const validationValue = validateInput(input, initialFormValues, formIndex, inputKey)

        if (validationValue) {
          hasErrors = true
          tempErrors[formIndex][inputKey] = validationValue
        }

        if (!validationValue && tempErrors[formIndex][inputKey]) {
          delete tempErrors[formIndex][inputKey]
        }
      }
    }

    setErrors(tempErrors)

    return hasErrors
  }

  const toggleViewMode = () => {
    if (!viewMode) {
      resetForm()
    }
    setViewMode(!viewMode)
  }

  const addForm = () => {
    const tempFormLength = formLength + 1
    setFormLength(tempFormLength)
    setFormValues([...formValues, generateFormValues(tempFormLength)])
    setErrors([...errors, {}])
  }

  const removeForm = (removeIndex = formLength - 1) => {
    const tempFormLength = formLength - 1
    const tempFormVals = formValues.filter((_, i) => i !== removeIndex)
    const tempErrors = errors.filter((_, i) => i !== removeIndex)

    setFormLength(tempFormLength)
    setFormValues(tempFormVals)
    setErrors(tempErrors)
  }

  const resetForm = () => {
    setFormLength(uniformInitialValues.length)
    initForm(uniformInitialValues.length)
  }

  const clearForm = () => {
    setUniformInitialValues([{}])
    let tempFormValues: any = [{}]
    for (const inputKey of Object.keys(schema.inputs)) {
      tempFormValues[0][inputKey] = ''
    }

    setFormLength(1)
    setFormValues(tempFormValues)
  }

  const _getValueAsString = (keyName: string, index: number) => {
    if (formValues[index][keyName] || formValues[index][keyName] === false) {
      return String(formValues[index][keyName]);
    }
    return String(viewModeFallbackText);
  };

  return {
    inputs,
    form,
    formValues,
    errors,
    formLength,
    addForm,
    removeForm,
    resetForm,
    clearForm,
    toggleViewMode,
    formReady
  };
};
