import React from "react";
import {
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  UseFormStateReturn,
} from "react-hook-form";

const FormField: React.FC<FormFieldProps> = (props) => {
  const { renderInput, ...otherProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      render={({ field, fieldState, formState }) =>
        renderInput({
          field: {
            ...field,
            dirty: fieldState.isDirty,
            error: Boolean(fieldState.error),
            helperText: fieldState.error?.message,
          },
          fieldState,
          formState,
        })
      }
      {...otherProps}
    />
  );
};

export type FormFieldProps = Omit<ControllerProps, "render"> & {
  renderInput: (params: {
    field: ControllerRenderProps<FieldValues, string> & {
      dirty: boolean;
      error: boolean;
      helperText?: string;
    };
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<FieldValues>;
  }) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export default FormField;
