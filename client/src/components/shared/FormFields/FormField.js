import React from 'react';
import { Field } from 'formik';

const FormField = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Field {...otherProps}>
      {({ field, form, meta }) => {
        console.log('field', field);
        console.log('form', form);
        console.log('meta', meta);
        return React.cloneElement(children, {
          onChange: (newValue) => {
            console.log('->', newValue);
            field.onChange(newValue);
          },
          value: field.value,
        });
      }}
    </Field>
  );
};

FormField.propTypes = Field.propTypes;

export default FormField;
