import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { DatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import Box from "components/_Box";
import DialogNewItem from "components/DialogNewItem";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginLeft: "auto",
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
  },
  fieldIcon: {
    alignSelf: "center",
    marginLeft: theme.spacing(1),
  },
  fieldItem: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
  },
}));

export default function DialogRelease(props) {
  const { onAccept, onClose, title, value = [], ...otherProps } = props;

  const classes = useStyles();

  const [createNewItem, setCreateNewItem] = React.useState(false);
  const [releases, setReleases] = React.useState(value);

  const handleAccept = () => {
    onAccept(releases);
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" onBackdropClick={onClose} {...otherProps}>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box spacing={2}>
          {releases.map((release, index) => {
            return (
              <div className={classes.fieldContainer}>
                <DatePicker
                  cancelLabel={"Cancelar"}
                  className={classes.fieldItem}
                  id={`release-field-${index}`}
                  inputVariant="filled"
                  label={release.label}
                  okLabel={"Aceptar"}
                />
                <IconButton
                  className={classes.fieldIcon}
                  onClick={() => {
                    let newValue = [...releases];
                    newValue.splice(index, 1);
                    setReleases(newValue);
                  }}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </div>
            );
          })}
          <IconButton
            className={classes.addIcon}
            onClick={() => setCreateNewItem(true)}
          >
            <AddRoundedIcon />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="primary" onClick={handleAccept}>
          Aceptar
        </Button>
      </DialogActions>

      <DialogNewItem
        onAccept={(param) => {
          let newValue = [...releases];
          newValue.push({ label: param, value: new Date()});
          setReleases(newValue);
        }}
        onClose={() => setCreateNewItem(false)}
        open={createNewItem}
        title="Añadir elemento"
      />
    </Dialog>
  );
}

DialogRelease.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      value: PropTypes.any,
    })
  ),
};
