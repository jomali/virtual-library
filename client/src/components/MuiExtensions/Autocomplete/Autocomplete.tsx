import React from "react";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
  AutocompleteRenderInputParams as MuiAutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import TextField from "../TextField";

const StyledAutocomplete = styled(MuiAutocomplete)<any>(
  ({ readOnly, theme }) => ({
    "& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot": {
      // variant: outlined
      transition: `${theme.transitions.create("padding", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      })}`,
    },

    ...(readOnly && {
      "& .MuiInputBase-input": {
        paddingLeft: "0px !important",
        paddingRight: "0px !important",
      },
      "& .MuiAutocomplete-endAdornment": {
        display: "none",
      },
      "& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot": {
        // variant: outlined
        paddingLeft: 0,
        paddingRight: 0,
        transition: `${theme.transitions.create("padding", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.standard,
        })}`,
        "& input": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    }),
  })
);

/**
 * Wrapper over the Material UI `Autocomplete` component.
 *
 * - Implements a default `renderInput` prop as a custom `TextField`, passing
 * it all the appropriate properties including the `slotProps` (instead the
 * deprecated `InputLabelProps`, `InputProps` and `inputProps`) and the new
 * `readOnly`. It can be overriden.
 * - Adjust styles and behaviour when `readOnly` is _true_ so that the
 * component is not rendered as an interactive input field.

 */
const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  (props, ref) => {
    const {
      clearOnBlur,
      freeSolo,
      handleHomeEndKeys,
      label,
      onChange,
      onInputChange,
      readOnly,
      required,
      selectOnFocus,
      ...otherProps
    } = props;

    return (
      <StyledAutocomplete
        ref={ref}
        clearOnBlur={clearOnBlur !== undefined ? clearOnBlur : freeSolo}
        freeSolo={freeSolo}
        handleHomeEndKeys={
          handleHomeEndKeys !== undefined ? handleHomeEndKeys : freeSolo
        }
        onChange={onChange}
        onInputChange={(event: React.SyntheticEvent, newInputValue: string) =>
          freeSolo
            ? onChange?.(event, newInputValue, "createOption")
            : onInputChange
        }
        readOnly={readOnly}
        renderInput={({
          InputLabelProps,
          InputProps,
          inputProps,
          ...otherParams
        }: any) => (
          <TextField
            {...otherParams}
            label={label}
            readOnly={readOnly}
            required={required}
            slotProps={{
              htmlInput: inputProps,
              input: InputProps,
              inputLabel: InputLabelProps,
            }}
          />
        )}
        selectOnFocus={selectOnFocus !== undefined ? selectOnFocus : freeSolo}
        {...otherProps}
      />
    );
  }
);

export type AutocompleteProps = Omit<
  MuiAutocompleteProps<any, any, any, any>,
  "renderInput"
> & {
  label?: string;
  renderInput?: (
    params: Omit<
      MuiAutocompleteRenderInputParams,
      "InputLabelProps" | "InputProps" | "inputProps"
    > & { slotProps: object }
  ) => React.ReactNode;
  required?: boolean;
};

export default Autocomplete;
