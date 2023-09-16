import React from "react";
import { alpha, styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import PropTypes from "prop-types";

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "readOnly",
})(({ readOnly, theme }) => ({
  "& svg": {
    color: alpha(theme.palette.action.active, 0.7),
  },
  "& .MuiOutlinedInput-root": {
    // variant: outlined
    "& input": {
      transition: `${theme.transitions.create("padding", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
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
        padding: "16.5px 0",
        transition: `${theme.transitions.create("padding", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.leavingScreen,
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
 * Customization of Material UI __TextField__ component.
 *
 * - Changes default prop values.
 * - Changes the styles when the `readOnly` prop is _true_ to prevent the
 * component from being displayed as an input field.
 */
const TextField = React.forwardRef((props, ref) => {
  const {
    color = "primary",
    fullWidth = true,
    label,
    readOnly = true,
    variant = "outlined",
    ...otherProps
  } = props;

  return (
    <StyledTextField
      ref={ref}
      color={color}
      fullWidth={fullWidth}
      id={label.toLocaleLowerCase()}
      InputProps={{
        readOnly: readOnly,
      }}
      label={label}
      readOnly={readOnly}
      variant={readOnly ? "outlined" : variant}
      {...otherProps}
    />
  );
});

TextField.propTypes = {
  ...MuiTextField.propTypes,
  readOnly: PropTypes.bool,
};

export default TextField;
