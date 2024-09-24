import { Field } from "formik";
import React from "react";

/*
 * Wrapper of Formik __Field__ component.
 *
 * - Initializes props with `FIELD_DEFAULTS` values.
 */
const FormField = React.forwardRef<React.Ref<unknown>, FormFieldProps>(
  (props, ref) => {
    const {
      color = FIELD_DEFAULTS.color,
      fullWidth = FIELD_DEFAULTS.fullWidth,
      variant = FIELD_DEFAULTS.variant,
      ...otherProps
    } = props;

    return (
      <Field
        ref={ref}
        color={color}
        fullWidth={fullWidth}
        variant={variant}
        {...otherProps}
      />
    );
  }
);

export const FIELD_DEFAULTS = {
  color: "secondary",
  fullWidth: true,
  variant: "outlined",
};

// TODO - use formik types
// TODO - use Material UI field types
export type FormFieldProps = any;

export default FormField;
