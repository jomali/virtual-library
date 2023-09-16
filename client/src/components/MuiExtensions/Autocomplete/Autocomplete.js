import React from "react";
import MuiAutocomplete, {
  createFilterOptions,
} from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import TextField from "../TextField";

const filter = createFilterOptions();

const StyledAutocomplete = styled(MuiAutocomplete, {
  shouldForwardProp: (prop) => prop !== "readOnly" || prop !== "withTags",
})(({ readOnly, theme, withTags }) => ({
  "& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot": {
    // variant: outlined
    transition: `${theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    })}`,
  },

  ...(readOnly && {
    //       "& .MuiInputBase-root": {
    //         paddingLeft: "0px !important",
    //         paddingRight: "0px !important",
    //       },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",
    },
    "& .MuiOutlinedInput-root.MuiAutocomplete-inputRoot": {
      // variant: outlined
      paddingLeft: 0,
      paddingRight: 0,
      transition: `${theme.transitions.create("padding", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
      })}`,
      "& input": {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  }),
  //     ...(!withTags && {
  //       "& .MuiFilledInput-root": {
  //         paddingLeft: theme.spacing(1.5),
  //       },
  //       "& .MuiOutlinedInput-root": {
  //         paddingLeft: theme.spacing(1.5),
  //       },
  //   }),
}));

/**
 * Customization of Material UI __Autocomplete__ component.
 *
 * - Automatically implements the `renderInput` prop as a custom __TextField__,
 * passing it all the appropriate properties including the `readOnly`. It can
 * be overriden with a custom implementation.
 * - Changes the styles when the `readOnly` prop is _true_ to prevent the
 * component from being displayed as an input field.
 * - Automatically handles the creation of new options when used with the
 * `freeSolo` prop as _true_.
 */
const Autocomplete = React.forwardRef((props, ref) => {
  const {
    disabled,
    freeSolo,
    getOptionLabel,
    helperText,
    label,
    onChange,
    options,
    readOnly,
    required,
    withTags,
    ...otherProps
  } = props;

  const [createdOptions, setCreatedOptions] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setCreatedOptions([]);
  }, [readOnly]);

  return (
    <StyledAutocomplete
      //   onClose={() => setOpen(false)}
      //   onOpen={() => setOpen(true)}
      //   open={open}
      //   renderTags={(value, getTagProps) =>
      //     value.map((option, index) =>
      //       withTags ? (
      //         <Chip
      //           label={option}
      //           variant="outlined"
      //           {...getTagProps({ index })}
      //         />
      //       ) : (
      //         <span
      //           onClick={() => {
      //             console.log("XXXX");
      //             setOpen(true);
      //           }}
      //         >
      //           {index > 0 ? ", " : ""}
      //           {option}
      //         </span>
      //       )
      //     )
      //   }
      ref={ref}
      disabled={disabled}
      filterOptions={
        freeSolo
          ? (options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some(
                (option) => inputValue === option.title
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }
          : undefined
      }
      freeSolo={freeSolo}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return `Add "${option.inputValue}"`;
        }
        // Regular option
        return getOptionLabel(option);
      }}
      onChange={(event, newValue) => {
        let updatedOptions = createdOptions;
        let updatedValue = newValue;

        if (typeof newValue === "string") {
          updatedOptions = [newValue];
        } else if (newValue?.inputValue) {
          updatedOptions = [newValue.inputValue];
          updatedValue = newValue.inputValue;
        }

        setCreatedOptions(updatedOptions);
        onChange(event, updatedValue);
      }}
      options={options.concat(createdOptions)}
      readOnly={readOnly}
      renderInput={(params) => (
        <TextField
          {...params}
          disabled={disabled}
          helperText={helperText}
          label={label}
          readOnly={readOnly}
          required={required}
        />
      )}
      {...otherProps}
    />
  );
});

Autocomplete.propTypes = {
  ...MuiAutocomplete.propTypes,
  disabled: PropTypes.bool,
  renderInput: PropTypes.func, // no longer a required prop
  withTags: PropTypes.bool,
};

export default Autocomplete;
