import React from "react";
import { Field, getIn } from "formik";
import PropTypes from "prop-types";

const FormField = (props) => {
  const {
    children,
    max,
    min,
    name,
    required,
    type = "string",
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
   * __Validation prop__. Mark the field as required, which will not allow
   * undefined, null or empty strings as a value.
   */
  required: PropTypes.bool,

  type: PropTypes.oneOf(["email", "number", "string"]),
};

export default FormField;
