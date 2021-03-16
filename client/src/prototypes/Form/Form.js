import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import Box from "components/_Box";
import CustomTextField from "components/CustomTextField";

const useStyles = makeStyles((theme) => ({
  growContent: {
    display: "flex",
    flexGrow: 1,
  },
}));

export default function Form(props) {
  const {
    className,
    fields = [],
    grows = false,
    id,
    margin = 2,
    onSubmit,
    readOnly = false,
    spacing = 2,
    ...otherProps
  } = props;

  const methods = useForm();
  const classes = useStyles();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   methods.handleSubmit((params) => onSubmit(params))(event);
  // };

  React.useEffect(() => {
    fields.forEach((field) => {
      let fieldValue = "";
      if (field.renderValue && field.defaultValue) {
        fieldValue = field.renderValue(field.defaultValue);
      } else if (field.defaultValue) {
        fieldValue = field.defaultValue;
      }
      methods.setValue(field.attribute, fieldValue);
    });
  }, [fields, methods]);

  return (
    <form
      className={clsx({
        [classes.growContent]: grows,
      })}
      id={id}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <Box
        className={clsx({
          [className]: !!className,
          [classes.growContent]: grows,
        })}
        margin={margin}
        spacing={spacing}
        {...otherProps}
      >
        {fields.map((item, index) => {
          let FieldComponent;
          switch (item.type) {
            case "text":
            default:
              FieldComponent = (
                <Controller
                  as={
                    <CustomTextField
                      InputProps={{ className: item.className }}
                    />
                  }
                  control={methods.control}
                  defaultValue=""
                  key={`field-${index}`}
                  label={item.label}
                  name={item.attribute}
                  readOnly={readOnly}
                />
              );
              break;
          }

          return FieldComponent;
        })}
      </Box>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      attribute: PropTypes.string.isRequired,
      defaultValue: PropTypes.any.isRequired,
      label: PropTypes.string,
      type: PropTypes.oneOf(["text"]),
    })
  ),
  grows: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};
