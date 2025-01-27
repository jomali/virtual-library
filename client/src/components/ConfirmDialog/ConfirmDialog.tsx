import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useIntl } from "react-intl";

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  const { messages, onAccept, onCancel, open } = props;

  const intl = useIntl();

  return (
    <Dialog onClose={onCancel} open={open}>
      <DialogTitle>{messages.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messages.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color="inherit" onClick={onCancel} variant="text">
          {intl.formatMessage({ id: "cancel" })}
        </Button>
        <Button color="inherit" onClick={onAccept} variant="text">
          {intl.formatMessage({ id: "accept" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export type ConfirmDialogProps = {
  messages: {
    description: string;
    title: string;
  };
  onAccept: VoidFunction;
  onCancel: VoidFunction;
  open: boolean;
};

export default ConfirmDialog;
