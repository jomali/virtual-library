import React from 'react';
import { Field, getIn } from 'formik';

const FormField = (props) => {
  const { children, ...otherProps } = props;

  return React.Children.toArray(children).length ? (
    <Field {...otherProps}>
      {({ field, form, meta }) => {
        const fieldError = getIn(form.errors, field.name);
        const showError = getIn(form.touched, field.name) && !!fieldError;

        return React.cloneElement(children, {
          // disabled: children.disabled || form.isSubmitting,
          error: showError,
          // helperText: showError ? fieldError : children.helperText,
          onChange: (event, newValue) =>
            form.setFieldValue(field.name, newValue),
          value: field.value,
        });
      }}
    </Field>
  ) : null;
};

FormField.propTypes = Field.propTypes;

export default FormField;
