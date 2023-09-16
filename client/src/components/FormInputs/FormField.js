import React from "react";
import { Field, getIn } from "formik";
import PropTypes from "prop-types";

const FormField = (props) => {
  const {
    max,
    min,
    name,
    renderInput,
    required,
    type,
    validate,
    ...otherProps
  } = props;

  const handleValidate = (value) => {
    let errorMessage;
    if (max) {
      if (type === "number" && Number(value) > max) {
        errorMessage = `The value cannot be greater than ${max}.`;
      } else if (value?.length > max) {
        errorMessage = `The length cannot be greater than ${max}.`;
      }
    }
    if (min) {
      if (type === "number" && Number(value) < min) {
        errorMessage = `The value cannot be lower than ${min}.`;
      } else if (value?.length < min) {
        errorMessage = `The length cannot be lower than ${min}.`;
      }
    }
    if (required) {
      if (!value || (typeof value === "string" && !value.trim)) {
        return `Required field.`;
      }
    }
    if (validate) {
      errorMessage = validate();
    }
    return errorMessage;
  };

  /* Alternative implementation using the prop `children` and element cloning:
  ```
  return React.Children.toArray(children).length ? (
    <Field name={name} type={type} validate={handleValidate} {...otherProps}>
      {({ field, form, meta }) => {
        const fieldError = getIn(form.errors, field.name);
        const showError = getIn(form.touched, field.name) && !!fieldError;

        return React.cloneElement(children, {
          disabled: children.props.disabled || form.isSubmitting,
          error: showError,
          helperText: showError ? fieldError : children.props.helperText,
          onChange: (newValue, event) =>
            form.setFieldValue(field.name, newValue),
          value: field.value,
        });
      }}
    </Field>
  ) : null;
  ``` */

  return renderInput ? (
    <Field name={name} validate={handleValidate} {...otherProps}>
      {({ field, form, meta }) => {
        const fieldError = getIn(form.errors, field.name);
        const showError = getIn(form.touched, field.name) && !!fieldError;

        return renderInput({
          // disabled: form.isSubmitting, // TODO
          error: showError,
          field: field,
          form: form,
          helperText: showError ? fieldError : undefined,
          onChange: (newValue, event) =>
            form.setFieldValue(field.name, newValue),
          value: field.value,
        });
      }}
    </Field>
  ) : null;
};

FormField.propTypes = {
  /**
   * __Validation prop__. Set a maximum length limit for a string value, or a
   * maximum number value allowed.
   */
  max: PropTypes.number,

  /**
   * __Validation prop__. Set a minimum length limit for a string value, or a
   * minimum number value allowed.
   */
  min: PropTypes.number,

  /**
   * A field's name in Formik state. To access nested objects or arrays, name
   * can also accept lodash-like dot path like `social.facebook` or
   * `friends[0].firstName`.
   */
  name: PropTypes.string.isRequired,

  /**
   * Render the field input.
   */
  renderInput: PropTypes.func.isRequired,

  /**
   * __Validation prop__. Mark the field as required, which will not allow
   * undefined, null or empty strings as a value.
   */
  required: PropTypes.bool,

  /**
   * __Validation prop__. Used in conjunction with the other validation props.
   */
  type: PropTypes.oneOf(["email", "number", "string"]),

  /**
   * You can run independent field-level validations by passing a function to
   * the `validate` prop. The function will respect the `validateOnBlur` and
   * `validateOnChanget` config/props specified in the `<Field>'s` parent
   * `<Formik>` / `withFormik`. This function can either be synchronous or
   * asynchronous:
   *
   * - Sync: if invalid, return a _string_ containing the error message or
   * return _undefined_.
   * - Async: return a Promise that resolves a _string_ containing the error
   * message. This works like Formik's _validate_, but instead of returning an
   * _errors_ object, it's just a _string_.
   */
  validate: PropTypes.func,
};

export default FormField;
