import React from "react";
import { alpha, styled } from "@mui/material/styles";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (propName: string) =>
    !["dirty", "readOnly"].includes(propName),
})<TextFieldProps>(({ dirty, readOnly, size, theme }) => ({
  "& svg": {
    color: alpha(theme.palette.action.active, 0.7),
  },
  "& .MuiOutlinedInput-root": {
    // variant: outlined
    "& input": {
      fontWeight: dirty ? theme.typography.fontWeightBold : "inherit",
      transition: `${theme.transitions.create("padding", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.standard,
      })}`,
    },
  },
  ...(readOnly && {
    "& label": {
      transform: `translate(0px, -9px) scale(0.75)`,
    },
    "& label.Mui-focused": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      // variant: outlined
      "& input": {
        padding: size === "small" ? "8.5px 0" : "16.5px 0",
        transition: `${theme.transitions.create("padding", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.standard,
        })}`,
      },
      "& fieldset": {
        borderWidth: 0,
      },
      "&.Mui-focused fieldset": {
        borderWidth: 0,
      },
    },
  }),
}));

/**
 * Wrapper over the Material UI `TextField` component.
 *
 * Sets opinionated defaults for several props and, additionally:
 *
 * - Adds new `readOnly` prop and adjust styles and behaviour when it's _true_
 * so that the component is not rendered as an interactive input field.
 * - Adds new `dirty` prop and adjust styles when it's _true_.
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      fullWidth = true,
      readOnly,
      required,
      slotProps,
      ...otherProps
    } = props;

    return (
      <StyledTextField
        ref={ref}
        fullWidth={fullWidth}
        readOnly={readOnly}
        required={required && !readOnly}
        slotProps={{
          ...slotProps,
          input: {
            readOnly: readOnly,
            ...(slotProps?.input ?? {}),
          },
        }}
        {...otherProps}
      />
    );
  }
);

export type TextFieldProps = MuiTextFieldProps & {
  dirty?: boolean;
  readOnly?: boolean;
};

export default TextField;
