import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CustomTextField from "components/CustomTextField";

export default function DialogNewItem(props) {
  const { onAccept, onClose, open, title, ...otherProps } = props;

  const [fieldNewElement, setFieldNewElement] = React.useState("");

  const handleAccept = () => {
    onAccept(fieldNewElement);
    onClose();
  };

  React.useEffect(() => setFieldNewElement(""), [open]);

  return (
    <Dialog
      fullWidth
      keepMounted="false"
      maxWidth="xs"
      open={open}
      {...otherProps}
    >
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <CustomTextField
          fullWidth
          label="Nombre"
          onChange={(event) => setFieldNewElement(event.target.value)}
          value={fieldNewElement}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="primary" onClick={handleAccept}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogNewItem.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
